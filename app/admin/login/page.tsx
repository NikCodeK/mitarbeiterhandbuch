"use client"

import { FormEvent, Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      })
      if (response.ok) {
        const next = searchParams.get("next") || "/"
        router.push(next)
        router.refresh()
      } else {
        const json = await response.json().catch(() => null)
        setError(json?.error || "Fehler beim Login")
      }
    } catch (err) {
      console.error(err)
      setError("Verbindungsproblem, bitte erneut versuchen.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="username">
          Benutzername
        </label>
        <Input
          id="username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="password">
          Passwort
        </label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Wird eingeloggt ..." : "Einloggen"}
      </Button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-dvh bg-background px-4 py-12">
      <div className="mx-auto grid w-full max-w-sm place-items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Admin Login</CardTitle>
            <CardDescription>Melde dich mit deinen Zugangsdaten an.</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="text-sm text-muted-foreground">
                  Lade Loginformular ...
                </div>
              }
            >
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
