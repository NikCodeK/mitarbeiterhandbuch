"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
          <p className="text-sm text-muted-foreground">
            Geschützter Bereich für künftige Inhalte.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/">Zur öffentlichen Seite</Link>
          </Button>
          <Button variant="secondary" onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? "Wird abgemeldet ..." : "Logout"}
          </Button>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Editor kommt später</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Hier entsteht das schlanke Admin-Interface für Inhalte. Aktuell ist nur der
            Login-Schutz aktiv, damit Einbettungen weiterhin sicher bleiben.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
