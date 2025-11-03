"use client"

import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState, Suspense } from "react"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Switch } from "../../components/ui/switch"
import type { Entry, Parent } from "../../lib/types"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

type ParentFormState = {
  id?: string
  slug: string
  title: string
  sort: string
  published: boolean
}

const emptyParentForm: ParentFormState = {
  id: undefined,
  slug: "",
  title: "",
  sort: "",
  published: true,
}

type EntryFormState = {
  id?: string
  parentId?: string
  slug: string
  title: string
  content_md: string
  sort: string
  status: Entry["status"] | ""
}

const emptyEntryForm: EntryFormState = {
  id: undefined,
  parentId: undefined,
  slug: "",
  title: "",
  content_md: "",
  sort: "",
  status: "",
}

const statusOptions: Entry["status"][] = ["Draft", "Published"]

function AdminDashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const missingConfigMessage =
    "Airtable ist nicht konfiguriert. Bitte setze die benötigten Umgebungsvariablen oder verwende lokale Inhalte."

  function extractWarning(payload: unknown) {
    if (!payload || typeof payload !== "object") {
      return ""
    }
    const data = payload as Record<string, unknown>
    if (typeof data.warning === "string" && data.warning.trim()) {
      return data.warning
    }
    if (typeof data.error === "string" && data.error.trim()) {
      return data.error
    }
    if (data.requiresConfig) {
      return missingConfigMessage
    }
    return ""
  }

  const [message, setMessage] = useState<string>("")
  const [configWarning, setConfigWarning] = useState<string>("")
  const [requestedParentId, setRequestedParentId] = useState<string | null>(null)
  const [requestedEntryId, setRequestedEntryId] = useState<string | null>(null)
  const [shouldCreateEntry, setShouldCreateEntry] = useState(false)

  const [parents, setParents] = useState<Parent[]>([])
  const [selectedParentId, setSelectedParentId] = useState<string>("")
  const [parentForm, setParentForm] = useState<ParentFormState>(emptyParentForm)
  const [isSavingParent, setIsSavingParent] = useState(false)

  const [entries, setEntries] = useState<Entry[]>([])
  const [selectedEntryId, setSelectedEntryId] = useState<string>("")
  const [entryForm, setEntryForm] = useState<EntryFormState>(emptyEntryForm)
  const [isSavingEntry, setIsSavingEntry] = useState(false)
  const [isLoadingEntry, setIsLoadingEntry] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const selectedEntryIdRef = useRef<string>("")

  const selectedParent = useMemo(
    () => parents.find((parent) => parent.id === selectedParentId) ?? null,
    [parents, selectedParentId],
  )
  const selectedParentSlug = selectedParent?.slug ?? ""

  const parentOptions = useMemo(
    () =>
      parents.map((parent) => ({
        label: parent.title,
        value: parent.id,
      })),
    [parents],
  )

  const entryOptions = useMemo(
    () =>
      entries.map((entry) => ({
        label: `${entry.title || entry.slug} (${entry.status ?? "unbekannt"})`,
        value: entry.id,
      })),
    [entries],
  )

  useEffect(() => {
    selectedEntryIdRef.current = selectedEntryId
  }, [selectedEntryId])

  useEffect(() => {
    if (!entries.length) {
      if (shouldCreateEntry) {
        setEntryForm({
          ...emptyEntryForm,
          parentId: selectedParentId,
          status: "Draft",
        })
      } else {
        setEntryForm({
          ...emptyEntryForm,
          parentId: selectedParentId,
          status: "Draft",
        })
        setSelectedEntryId("")
      }
      return
    }

    if (requestedEntryId && entries.some((entry) => entry.id === requestedEntryId)) {
      setSelectedEntryId(requestedEntryId)
      setRequestedEntryId(null)
      return
    }

    if (!selectedEntryId || !entries.some((entry) => entry.id === selectedEntryId)) {
      setSelectedEntryId(entries[0].id)
    }

    if (shouldCreateEntry) {
      setEntryForm({
        ...emptyEntryForm,
        parentId: selectedParentId,
        status: "Draft",
      })
      setSelectedEntryId("")
      setShouldCreateEntry(false)
    }
  }, [entries, requestedEntryId, shouldCreateEntry, selectedParentId, selectedEntryId])

  // update selection when parents change or URL requested IDs resolve
  useEffect(() => {
    if (parents.length === 0) {
      setSelectedParentId("")
      setParentForm({ ...emptyParentForm })
      setEntries([])
      setSelectedEntryId("")
      setEntryForm({ ...emptyEntryForm })
      return
    }

    const fallbackParent = parents[0]
    const targetParentId = requestedParentId && parents.some((p) => p.id === requestedParentId)
      ? requestedParentId
      : selectedParentId || fallbackParent.id

    if (targetParentId !== selectedParentId) {
      setSelectedParentId(targetParentId)
    }

    const targetParent = parents.find((parent) => parent.id === targetParentId) ?? fallbackParent
    setParentForm({
      id: targetParent.id,
      slug: targetParent.slug,
      title: targetParent.title,
      sort: targetParent.sort !== undefined && targetParent.sort !== null ? String(targetParent.sort) : "",
      published: targetParent.published ?? true,
    })

    setEntryForm((prev) => ({
      ...prev,
      parentId: targetParent.id,
    }))
  }, [parents, requestedParentId, selectedParentId])

  // Handle URL parameters
  useEffect(() => {
    const editParent = searchParams.get('editParent')
    const editEntry = searchParams.get('editEntry')
    const addEntry = searchParams.get('addEntry')
    const parentId = searchParams.get('parentId')

    setRequestedParentId(editParent || parentId || null)
    setRequestedEntryId(editEntry || null)
    setShouldCreateEntry(Boolean(addEntry && parentId))
  }, [searchParams])

  const refreshParents = useCallback(
    async (preferId?: string) => {
      try {
        const response = await fetch("/api/handbook/parents", {
          cache: "no-store",
          credentials: "include",
        })
        if (!response.ok) {
          throw new Error(`parents request failed: ${response.status}`)
        }
        const json = await response.json()
        setConfigWarning(extractWarning(json))
        const fetchedParents: Parent[] = json.parents ?? []
        setParents(fetchedParents)

        if (fetchedParents.length === 0) {
          setSelectedParentId("")
          setParentForm({ ...emptyParentForm })
          setEntries([])
          setSelectedEntryId("")
          setEntryForm({ ...emptyEntryForm })
          return
        }

    const target =
      fetchedParents.find((parent) => parent.id === (preferId || requestedParentId || selectedParentId)) ??
      fetchedParents[0]

    setRequestedParentId(null)
    setSelectedParentId(target.id)
    setParentForm({
      id: target.id,
      slug: target.slug,
      title: target.title,
      sort: target.sort !== undefined && target.sort !== null ? String(target.sort) : "",
      published: target.published ?? true,
    })

    setEntryForm((prev) => ({
      ...prev,
      parentId: target.id,
    }))
      } catch (error) {
        console.error("Failed to load parents", error)
        setMessage("Elternabschnitte konnten nicht geladen werden.")
      }
    },
    [requestedParentId, selectedParentId],
  )

  useEffect(() => {
    void refreshParents()
  }, [refreshParents])

  useEffect(() => {
    const parentId = selectedParent?.id
    if (!selectedParentSlug) {
      setEntries([])
      setSelectedEntryId("")
      setEntryForm({
        ...emptyEntryForm,
        parentId,
        status: "Draft",
      })
      return
    }

    const controller = new AbortController()
    const slug = selectedParentSlug

    void (async () => {
      try {
        const response = await fetch(`/api/handbook/entries?parent=${encodeURIComponent(slug)}`, {
          cache: "no-store",
          credentials: "include",
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`entries request failed: ${response.status}`)
        }
        const json = await response.json()
        if (controller.signal.aborted) {
          return
        }
        setConfigWarning(extractWarning(json))
        const fetchedEntries: Entry[] = json.entries ?? []
        setEntries(fetchedEntries)

        const hasSelected = fetchedEntries.some((entry) => entry.id === selectedEntryIdRef.current)
        if (!hasSelected) {
          setSelectedEntryId("")
          setEntryForm({
            ...emptyEntryForm,
            parentId,
            status: "Draft",
          })
        }
      } catch (error) {
        if ((error as Error | undefined)?.name === "AbortError") {
          return
        }
        console.error("Failed to load entries", error)
        setMessage("Einträge konnten nicht geladen werden.")
      }
    })()

    return () => controller.abort()
  }, [selectedParentSlug, selectedParent?.id])

  useEffect(() => {
    if (!selectedEntryId) {
      setEntryForm({
        ...emptyEntryForm,
        parentId: selectedParent?.id,
        status: "Draft",
      })
      return
    }

    const controller = new AbortController()
    const entryId = selectedEntryId
    const parentId = selectedParent?.id

    void (async () => {
      setIsLoadingEntry(true)
      try {
        const response = await fetch(`/api/handbook/entry/${entryId}`, {
          cache: "no-store",
          credentials: "include",
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`entry request failed: ${response.status}`)
        }
        const json = await response.json()
        if (controller.signal.aborted || entryId !== selectedEntryIdRef.current) {
          return
        }
        setConfigWarning(extractWarning(json))
        const entry: Entry | undefined = json.entry
        setEntryForm({
          id: entry?.id,
          parentId: entry?.parentId ?? parentId,
          slug: entry?.slug ?? "",
          title: entry?.title ?? "",
          content_md: entry?.content_md ?? "",
          sort: entry?.sort !== undefined && entry?.sort !== null ? String(entry.sort) : "",
          status: entry?.status ?? "",
        })
      } catch (error) {
        if ((error as Error | undefined)?.name === "AbortError") {
          return
        }
        console.error("Failed to load entry", error)
        setMessage("Eintrag konnte nicht geladen werden.")
        setEntryForm({
          ...emptyEntryForm,
          parentId,
          status: "Draft",
        })
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingEntry(false)
        }
      }
    })()

    return () => {
      controller.abort()
      setIsLoadingEntry(false)
    }
  }, [selectedEntryId, selectedParent?.id])

  function resetParentForm() {
    setParentForm({ ...emptyParentForm })
    setSelectedParentId("")
    setEntries([])
    setSelectedEntryId("")
    setEntryForm({ ...emptyEntryForm })
  }

  function updateParentField<K extends keyof ParentFormState>(key: K, value: ParentFormState[K]) {
    setParentForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  async function handleParentSave() {
    if (!parentForm.slug || !parentForm.title) {
      setMessage("Slug und Titel sind Pflichtfelder für Bereiche.")
      return
    }
    setIsSavingParent(true)
    setMessage("")

    const payload = {
      id: parentForm.id,
      slug: parentForm.slug,
      title: parentForm.title,
      sort: parentForm.sort ? Number(parentForm.sort) : undefined,
      published: parentForm.published,
    }

    try {
      const response = await fetch("/api/handbook/parents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      })

      if (!response.ok) {
        const json = await response.json().catch(() => null)
        throw new Error(json?.error || `save failed with ${response.status}`)
      }

      const result = await response.json().catch(() => ({}))
      const savedId = result?.id ?? parentForm.id ?? ""

      setMessage("Bereich gespeichert.")
      await refreshParents(savedId || undefined)
      if (savedId) {
        setSelectedParentId(savedId)
      }
      router.refresh()
    } catch (error) {
      console.error("Failed to save parent", error)
      setMessage("Bereich konnte nicht gespeichert werden.")
    } finally {
      setIsSavingParent(false)
    }
  }

  async function moveParent(direction: -1 | 1) {
    const currentIndex = parents.findIndex((parent) => parent.id === selectedParentId)
    if (currentIndex === -1) return
    const targetIndex = currentIndex + direction
    if (targetIndex < 0 || targetIndex >= parents.length) return

    const currentParent = parents[currentIndex]
    const targetParent = parents[targetIndex]
    if (!currentParent || !targetParent) return

    const currentSort = currentParent.sort ?? (currentIndex + 1) * 10
    const targetSort = targetParent.sort ?? (targetIndex + 1) * 10

    try {
      const response = await fetch("/api/handbook/sort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: "parent",
          fromId: currentParent.id,
          fromSort: currentSort,
          toId: targetParent.id,
          toSort: targetSort,
        }),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("sort failed")
      }

      await refreshParents(targetParent.id)
      setSelectedParentId(currentParent.id)
    } catch (error) {
      console.error("Failed to move parent", error)
      setMessage("Sortierung konnte nicht aktualisiert werden.")
    }
  }

  function updateEntryField<K extends keyof EntryFormState>(key: K, value: EntryFormState[K]) {
    setEntryForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function resetEntryFormForCreation() {
    setSelectedEntryId("")
    setEntryForm({
      ...emptyEntryForm,
      parentId: selectedParent?.id,
      status: "Draft",
    })
  }

  async function handleEntrySave() {
    if (!entryForm.parentId) {
      setMessage("Bitte zuerst einen Abschnitt auswählen.")
      return
    }
    if (!entryForm.title) {
      setMessage("Der Titel ist ein Pflichtfeld.")
      return
    }

    setIsSavingEntry(true)
    setMessage("")

    const payload = {
      id: entryForm.id,
      parentId: entryForm.parentId,
      slug: entryForm.slug,
      title: entryForm.title,
      content_md: entryForm.content_md,
      sort: entryForm.sort ? Number(entryForm.sort) : undefined,
      status: entryForm.status || undefined,
    }

    try {
      const endpoint = entryForm.id ? `/api/handbook/entry/${entryForm.id}` : "/api/handbook/entries"
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      })

      if (!response.ok) {
        const json = await response.json().catch(() => null)
        throw new Error(json?.error || `save failed with ${response.status}`)
      }

      const result = await response.json().catch(() => ({}))
      const savedId = result?.id ?? entryForm.id ?? ""

      setMessage("Eintrag gespeichert.")
      if (selectedParentSlug) {
        const reload = await fetch(`/api/handbook/entries?parent=${encodeURIComponent(selectedParentSlug)}`, {
          cache: "no-store",
          credentials: "include",
        })
        const json = await reload.json().catch(() => ({}))
        setConfigWarning(extractWarning(json))
        const fetchedEntries: Entry[] = json.entries ?? []
        setEntries(fetchedEntries)
        setSelectedEntryId(savedId)
      }
      router.refresh()
    } catch (error) {
      console.error("Failed to save entry", error)
      setMessage("Speichern des Eintrags fehlgeschlagen.")
    } finally {
      setIsSavingEntry(false)
    }
  }

  async function moveEntry(direction: -1 | 1) {
    const currentIndex = entries.findIndex((entry) => entry.id === selectedEntryId)
    if (currentIndex === -1) return
    const targetIndex = currentIndex + direction
    if (targetIndex < 0 || targetIndex >= entries.length) return

    const currentEntry = entries[currentIndex]
    const targetEntry = entries[targetIndex]
    if (!currentEntry || !targetEntry) return

    const currentSort = currentEntry.sort ?? (currentIndex + 1) * 10
    const targetSort = targetEntry.sort ?? (targetIndex + 1) * 10

    try {
      const response = await fetch("/api/handbook/sort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: "entry",
          fromId: currentEntry.id,
          fromSort: currentSort,
          toId: targetEntry.id,
          toSort: targetSort,
        }),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("sort failed")
      }

      const responseEntries = await fetch(`/api/handbook/entries?parent=${encodeURIComponent(selectedParentSlug)}`, {
        cache: "no-store",
        credentials: "include",
      })
      const json = await responseEntries.json().catch(() => ({}))
      setConfigWarning(extractWarning(json))
      const fetchedEntries: Entry[] = json.entries ?? []
      setEntries(fetchedEntries)
      setSelectedEntryId(currentEntry.id)
    } catch (error) {
      console.error("Failed to move entry", error)
      setMessage("Eintrags-Reihenfolge konnte nicht aktualisiert werden.")
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      router.push("/admin/login")
      router.refresh()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Handbuch-Editor</h1>
          <p className="text-sm text-muted-foreground">
            Verwalte Inhaltsbereiche und Beiträge direkt aus Airtable.
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

      {message && (
        <div className="rounded-lg border border-border/60 bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          {message}
        </div>
      )}
      {configWarning && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {configWarning}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Inhaltsverzeichnis verwalten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="parent-record-select">
                Bereich auswählen
              </label>
              <select
                id="parent-record-select"
                value={selectedParentId}
                onChange={(event) => {
                  const nextId = event.target.value
                  setSelectedParentId(nextId)
                  setSelectedEntryId("")
                  if (!nextId) {
                    setParentForm({ ...emptyParentForm })
                    setEntries([])
                    setEntryForm({ ...emptyEntryForm })
                    return
                  }
                  const found = parents.find((parent) => parent.id === nextId)
                  if (found) {
                    setParentForm({
                      id: found.id,
                      slug: found.slug,
                      title: found.title,
                      sort: found.sort !== undefined && found.sort !== null ? String(found.sort) : "",
                      published: found.published ?? true,
                    })
                    setEntryForm((prev) => ({
                      ...prev,
                      parentId: found.id,
                    }))
                  }
                }}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Neuer Bereich …</option>
                {parentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <Button type="button" variant="outline" onClick={resetParentForm}>
                Neu beginnen
              </Button>
              <Button type="button" onClick={handleParentSave} disabled={isSavingParent}>
                {isSavingParent ? "Speichere ..." : "Bereich speichern"}
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="parent-slug">
                Slug
              </label>
              <input
                id="parent-slug"
                value={parentForm.slug}
                onChange={(event) => updateParentField("slug", event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="z. B. onboarding"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="parent-title">
                Titel
              </label>
              <input
                id="parent-title"
                value={parentForm.title}
                onChange={(event) => updateParentField("title", event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Name des Bereichs"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-md border border-input bg-background px-3 py-2">
              <div>
                <p className="text-sm font-medium text-foreground">Veröffentlicht</p>
                <p className="text-xs text-muted-foreground">Nur veröffentlichte Bereiche erscheinen öffentlich.</p>
              </div>
              <Switch checked={parentForm.published} onCheckedChange={(value) => updateParentField("published", value)} />
            </div>
            {parents.length > 0 && (
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!selectedParent || parents[0]?.id === selectedParent.id}
                  onClick={() => moveParent(-1)}
                >
                  Nach oben
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!selectedParent || parents[parents.length - 1]?.id === selectedParent.id}
                  onClick={() => moveParent(1)}
                >
                  Nach unten
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Beiträge verwalten</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="entry-parent-select">
              Abschnitt (Parent)
            </label>
            <select
              id="entry-parent-select"
              value={selectedParentId}
              onChange={(event) => {
                const nextId = event.target.value
                setSelectedParentId(nextId)
                setSelectedEntryId("")
              }}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              disabled={parents.length === 0}
            >
              {parentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="entry-select">
              Eintrag
            </label>
            <select
              id="entry-select"
              value={selectedEntryId}
              onChange={(event) => setSelectedEntryId(event.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              disabled={!selectedParentId}
            >
              <option value="">Neuer Eintrag …</option>
              {entryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{selectedEntryId ? "Eintrag bearbeiten" : "Neuen Eintrag erstellen"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="entry-title">
                Titel
              </label>
              <input
                id="entry-title"
                value={entryForm.title}
                onChange={(event) => updateEntryField("title", event.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Titel des Eintrags"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="entry-status">
                Status
              </label>
              <select
                id="entry-status"
                value={entryForm.status}
                onChange={(event) => updateEntryField("status", event.target.value as Entry["status"] | "")}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Kein Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="entry-sort">
                Sortierung
              </label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!selectedEntryId || entries[0]?.id === selectedEntryId}
                  onClick={() => moveEntry(-1)}
                >
                  Nach oben
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!selectedEntryId || entries[entries.length - 1]?.id === selectedEntryId}
                  onClick={() => moveEntry(1)}
                >
                  Nach unten
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="entry-content">
              Inhalt (Markdown/Rich Text)
            </label>
            <div data-color-mode="light" className="rounded-md border border-input bg-background">
              <MDEditor
                id="entry-content"
                value={entryForm.content_md}
                onChange={(value) => updateEntryField("content_md", value ?? "")}
                height={360}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" onClick={handleEntrySave} disabled={isSavingEntry || isLoadingEntry || !selectedParentId}>
              {isSavingEntry ? "Speichern ..." : "Speichern"}
            </Button>
            <Button type="button" variant="outline" onClick={resetEntryFormForCreation} disabled={isSavingEntry || isLoadingEntry}>
              Neu beginnen
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Einträge im Abschnitt</CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground">Keine Einträge vorhanden.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className={`flex items-center justify-between rounded-md border border-border/60 bg-muted/40 px-3 py-2 ${
                    entry.id === selectedEntryId ? "border-primary" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium">{entry.title || entry.slug}</p>
                    <p className="text-xs text-muted-foreground">
                      Status: {entry.status || "unbekannt"} · Sort: {entry.sort ?? "–"}
                    </p>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedEntryId(entry.id)}>
                    Bearbeiten
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboardContent />
    </Suspense>
  )
}
