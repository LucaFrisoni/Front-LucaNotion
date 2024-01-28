"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useCreateNoteModal } from "@/hooks/use-createNote-modal";

import { FormInput } from "../FormInput";
import { ElementRef, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import axios from "axios";
import { useRouter } from "next/navigation";

export const CreateNoteModal = () => {
  const createNoteModal = useCreateNoteModal();

  const router = useRouter();

  const divRef = useRef<ElementRef<"div">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const onSubmit = async (formData: FormData) => {
    const noteTitle = formData.get("noteTitle") as string;
    const noteDescription = formData.get("noteDescription") as string;

    if (noteTitle.length < 3) {
      return toast.error("Title should be longer");
    }
    if (noteTitle.length > 30) {
      return toast.error("Title should be shorter");
    }

    if (noteDescription.length > 400) {
      return toast.error("Description should be shorter");
    }

    // solicitud axios
    try {
      await axios.post("https://back-lucanotion.onrender.com/createNote", {
        title: noteTitle,
        description: noteDescription,
      });
      toast.success("Note created");
      router.refresh();
      return createNoteModal.onClose();
    } catch (error: any) {
      toast.error(error);
    }
  };

  const disableModal = () => {
    createNoteModal.onClose();
  };

  useOnClickOutside(divRef, disableModal);

  return (
    <Dialog
      open={createNoteModal.isOpen}
      onOpenChange={createNoteModal.onClose}
    >
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div ref={divRef} className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">Create a Note</h2>

          <form action={onSubmit} className="space-y-6">
            <FormInput ref={inputRef} id="noteTitle" label="Title" />
            <FormInput
              ref={inputRef}
              id="noteDescription"
              label="Description"
            />
            <Button className="w-full" variant="primary">
              Create
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
