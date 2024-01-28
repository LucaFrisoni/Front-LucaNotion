"use client";
import React, { ElementRef, useRef } from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Button } from "../ui/button";
import { MoreHorizontal, Trash2, X } from "lucide-react";
import { Separator } from "../ui/separator";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

interface CategoryActionsProps {
  categoryId: string;
}

const CategoryActions = ({ categoryId }: CategoryActionsProps) => {
  const router = useRouter();

  const closeRef = useRef<ElementRef<"button">>(null);

  const { pending } = useFormStatus();

  const onDelete = async () => {
    try {
      await axios.delete(
        `https://back-lucanotion.onrender.com/deleteCategory?id=${categoryId}`
      );
      toast.success("Category deleted");
      router.refresh();
      return;
    } catch (error) {
      return toast.error("Error deleting Note:" + error);
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
          Category actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Separator />
        <form action={onDelete}>
          <Button
            disabled={pending}
            size="sm"
            variant="ghost"
            className=" hover:bg-red-200 rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this category
            <Trash2 className=" ml-1 text-red-500 h-5 w-5" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryActions;
