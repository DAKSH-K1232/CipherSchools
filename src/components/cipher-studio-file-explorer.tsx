"use client"

import { useSandpack } from "@codesandbox/sandpack-react"
import { File, FilePlus, Trash2 } from "lucide-react"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function CipherStudioFileExplorer() {
  const { sandpack } = useSandpack()
  const [newFileName, setNewFileName] = useState("")
  const [isAddingFile, setIsAddingFile] = useState(false)

  const { files, activeFile, setActiveFile, addFile, deleteFile } = sandpack

  const handleAddFile = () => {
    if (newFileName && !files[`/${newFileName}`]) {
      addFile(`/${newFileName}`, "")
      setNewFileName("")
      setIsAddingFile(false)
    }
  }

  const filePaths = Object.keys(files).filter(path => path !== '/package.json');

  return (
    <div className="flex h-full flex-col bg-card p-2">
      <div className="flex items-center justify-between p-2">
        <h2 className="text-sm font-semibold text-foreground">Files</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => setIsAddingFile(!isAddingFile)}
        >
          <FilePlus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 space-y-1 overflow-auto pr-1">
        {isAddingFile && (
          <div className="flex items-center gap-2 p-1">
            <Input
              type="text"
              placeholder="filename.js"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddFile()}
              className="h-8"
              autoFocus
            />
            <Button
              size="sm"
              onClick={handleAddFile}
              className="h-8"
            >
              Add
            </Button>
          </div>
        )}
        {filePaths.map((path) => (
          <div
            key={path}
            className={cn(
              "group flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm",
              path === activeFile
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            onClick={() => setActiveFile(path)}
          >
            <div className="flex items-center gap-2">
              <File className="h-4 w-4" />
              <span className="truncate">{path.substring(1)}</span>
            </div>
            {path === activeFile && (
               <AlertDialog>
                <AlertDialogTrigger asChild>
                   <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-6 w-6 opacity-0 group-hover:opacity-100",
                        path === activeFile && "text-primary-foreground hover:bg-primary/80"
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete {path.substring(1)}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the file.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteFile(path)
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
