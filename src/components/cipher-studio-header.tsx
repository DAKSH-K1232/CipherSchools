"use client"

import { FilePlus, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
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

interface CipherStudioHeaderProps {
  onSave: () => void
  onNewProject: () => void
}

export function CipherStudioHeader({
  onSave,
  onNewProject,
}: CipherStudioHeaderProps) {
  const { toast } = useToast()

  const handleSave = () => {
    onSave()
    toast({
      title: "Project Saved",
      description: "Your files have been saved to local storage.",
    })
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4">
      <h1 className="text-xl font-bold tracking-tight text-primary font-headline">
        CipherStudio
      </h1>
      <div className="flex items-center gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              <FilePlus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will clear your current project and start a new one. All unsaved changes will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onNewProject}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button onClick={handleSave} size="sm" className="bg-accent hover:bg-accent/90">
          <Save className="mr-2 h-4 w-4" />
          Save Project
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}
