"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import {
  forwardRef,
  useRef,
  ElementRef,
  KeyboardEventHandler,
  useState,
} from "react";
import { useOnClickOutside, useEventListener } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { FormInput } from "../FormInput";
import axios from "axios";
import { useRouter } from "next/navigation";

interface NoteFormProps {
  categoryId: string;
}

export const NoteForm = forwardRef<HTMLInputElement, NoteFormProps>(
  ({ categoryId },ref) => {
    const router = useRouter();

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    const onSubmit = async (formData: FormData) => {
      const title = formData.get("noteTitle") as string;
      const description = formData.get("noteDescription") as string;

      try {
        if (title.length < 3) {
          return toast.error("Title should be longer");
        }
        if (title.length > 30) {
          return toast.error("Title should be shorter");
        }

        if (description.length > 400) {
          return toast.error("Description should be shorter");
        }

        await axios.post("https://back-lucanotion.onrender.com/addNoteCategory", {
          title,
          description,
          categoryId,
        });
        toast.success("Note add");
        disableEditing()
        router.refresh();
        return;
      } catch (error: any) {
        return toast.error(error);
      }
    };

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    };

    const disableEditing = () => {
      setIsEditing(false);
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 py-0.5 px-1 space-y-4"
        >
          <FormInput ref={inputRef} id="noteTitle" label="Title" />
          <FormInput ref={inputRef} id="noteDescription" label="Description" />
          <div className="flex items-center gap-x-1">
            <Button>Add note</Button>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a Note
        </Button>
      </div>
    );
  }
);

NoteForm.displayName = "NoteForm";
