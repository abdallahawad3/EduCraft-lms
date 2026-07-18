"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteChapter } from "../actions/delete-course";

interface DeleteChapterProps {
  chapterId: string;
  onDelete: () => void;
}

const DeleteChapter = ({ chapterId, onDelete }: DeleteChapterProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    onDelete();
    if (!chapterId) {
      toast.error("Chapter ID is required to delete the chapter.");
      return;
    }

    const { message, status } = await deleteChapter(chapterId);

    if (status === "success") {
      toast.success(message);
      setOpen(false);
    } else {
      toast.error(message);
    }

};

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className={"py-4"} variant="outline">
            <Trash2Icon size={14} className="text-destructive" />
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Lesson</DialogTitle>
          <DialogDescription className={"text-sm text-destructive"}>
            Are you sure you want to delete this lesson? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
      <div className="w-full flex  justify-between gap-2" >
        <Button className={"flex-1"} variant="outline" onClick={handleCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button className={"flex-1"} variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? (<>
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Deleting...
            </>) : "Delete"}
        </Button>
      </div>
        </DialogContent>
    </Dialog>
  );}

export default DeleteChapter
