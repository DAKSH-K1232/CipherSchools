"use client"

import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from "@codesandbox/sandpack-react"
import type { SandpackFiles, SandpackTheme } from "@codesandbox/sandpack-react"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"

import { defaultFiles } from "@/lib/default-files"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Skeleton } from "@/components/ui/skeleton"
import { CipherStudioFileExplorer } from "./cipher-studio-file-explorer"
import { CipherStudioHeader } from "./cipher-studio-header"

const PROJECT_STORAGE_KEY = "cipherstudio-project-files"

const CustomSandpackTheme: SandpackTheme = {
  colors: {
    surface1: "hsl(var(--card))",
    surface2: "hsl(var(--secondary))",
    surface3: "hsl(var(--muted))",
    clickable: "hsl(var(--foreground))",
    base: "hsl(var(--foreground))",
    disabled: "hsl(var(--muted-foreground))",
    hover: "hsl(var(--primary))",
    accent: "hsl(var(--primary))",
    error: "hsl(var(--destructive))",
    errorSurface: "hsl(var(--destructive) / 0.2)",
  },
  syntax: {
    plain: "hsl(var(--foreground))",
    comment: { color: "#8da1b9", fontStyle: "italic" },
    keyword: "hsl(var(--accent))",
    tag: "#29abe2",
    punctuation: "hsl(var(--foreground))",
    definition: "hsl(var(--primary))",
    property: "hsl(var(--accent))",
    static: "#ff9933",
    string: "#9a86fd",
  },
  font: {
    body: "var(--font-body)",
    mono: "var(--font-code)",
    size: "14px",
    lineHeight: "24px",
  },
}

function IDEContent({
  saveProject,
}: {
  saveProject: (files: SandpackFiles) => void
}) {
  const { sandpack } = useSandpack()

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <CipherStudioHeader
        onSave={() => saveProject(sandpack.files)}
        onNewProject={sandpack.resetAllFiles}
      />
      <main className="flex-1 overflow-hidden p-4">
        <ResizablePanelGroup direction="horizontal" className="h-full rounded-lg border">
          <ResizablePanel defaultSize={15} minSize={10}>
            <CipherStudioFileExplorer />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={30}>
            <SandpackLayout>
              <SandpackCodeEditor
                showTabs
                showLineNumbers
                showInlineErrors
                wrapContent
                style={{
                  height: "100%",
                  fontFamily: "var(--font-code)",
                }}
              />
            </SandpackLayout>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={35} minSize={20}>
            <SandpackLayout>
              <SandpackPreview
                showRefreshButton
                showOpenInCodeSandbox={false}
                style={{ height: "100%" }}
              />
            </SandpackLayout>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  )
}

export function CipherStudio() {
  const [initialFiles, setInitialFiles] = useState<SandpackFiles | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const saved = localStorage.getItem(PROJECT_STORAGE_KEY)
    if (saved) {
      setInitialFiles(JSON.parse(saved))
    } else {
      setInitialFiles(defaultFiles)
    }
  }, [])

  const saveProject = (files: SandpackFiles) => {
    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(files))
  }

  if (!initialFiles) {
    return (
      <div className="flex h-screen w-screen flex-col p-4 gap-4">
        <Skeleton className="h-14 w-full" />
        <div className="flex-1 grid grid-cols-6 gap-4">
            <Skeleton className="col-span-1 h-full" />
            <Skeleton className="col-span-5 h-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-secondary/50 font-body">
      <SandpackProvider
        template="react"
        files={initialFiles}
        theme={CustomSandpackTheme}
        options={{
            // The active file is implicitly controlled by SandpackCodeEditor's tabs
        }}
      >
        <IDEContent saveProject={saveProject} />
      </SandpackProvider>
    </div>
  )
}
