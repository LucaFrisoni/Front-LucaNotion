"use client";
import React, { ElementRef, useRef } from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Copy, MoreHorizontal, Paperclip, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import axios from "axios";
import { toast } from "sonner";
import { CategoryNameType } from "@/types";
import { useAddNoteCategoryModal } from "@/hooks/use-addNoteCategory-modal";

interface NoteCategoryActionProps {
  noteId: string;
  categoryId: string;
  allCategoriesNames: CategoryNameType[];
}

const NoteCategoryAction = ({
  noteId,
  categoryId,
  allCategoriesNames,
}: NoteCategoryActionProps) => {
  const addNoteCategoryModal = useAddNoteCategoryModal();

  const router = useRouter();

  const closeRef = useRef<ElementRef<"button">>(null);

  const { pending } = useFormStatus();

  const onDelete = async () => {
    try {
      await axios.delete(
        `https://back-lucanotion.onrender.com/deleteNoteCategory?noteId=${noteId}&categoryId=${categoryId}`
      );
      toast.success("Note deleted");
      router.refresh();
      return;
    } catch (error) {
      return toast.error("Error deleting Note:" + error);
    }
  };
  const onDeletePermantely = async () => {
    try {
      await axios.delete(
        `https://back-lucanotion.onrender.com/deletePermantelyNoteCategory?noteId=${noteId}&categoryId=${categoryId}`
      );
      toast.success("Note deleted permantely");
      router.refresh();
      return;
    } catch (error) {
      return toast.error("Error deleting Note permantely:" + error);
    }
  };

  const onArchive = async () => {
    try {
      await axios.put(
        `https://back-lucanotion.onrender.com/archiveNoteCategory?noteId=${noteId}&categoryId=${categoryId}`
      );

      toast.success("Archived note");
      router.refresh();
      return;
    } catch (error: any) {
      return toast.error("Error filing Note:" + error.message);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Note-Category actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <Button
          onClick={() =>
            addNoteCategoryModal.onOpen(allCategoriesNames, noteId, categoryId)
          }
          className="hover:bg-accent rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Copy note to another category
          <Copy className=" ml-1  h-5 w-5" />
        </Button>
        <Separator />
        <Button
          onClick={onArchive}
          className="hover:bg-accent rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Archive note <Paperclip className=" ml-1  h-5 w-5" />
        </Button>
        <Separator />
        <form action={onDelete}>
          <Button
            disabled={pending}
            size="sm"
            variant="ghost"
            className=" hover:bg-red-200 rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete from category
            <Trash2 className=" ml-1 text-red-500 h-5 w-5" />
          </Button>
        </form>
        <form action={onDeletePermantely}>
          <Button
            disabled={pending}
            size="sm"
            variant="ghost"
            className=" hover:bg-red-200 rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Pemantely delete
            <Trash2 className=" ml-1 text-red-500 h-5 w-5" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default NoteCategoryAction;
