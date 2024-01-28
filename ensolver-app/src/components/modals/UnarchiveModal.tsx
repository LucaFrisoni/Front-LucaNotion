"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CategoryNameType } from "@/types";
import { useUnArchive } from "@/hooks/use-unArchive";

export const UnarchiveModal = () => {
  const { allCategoriesNames, isOpen, onClose, noteId } = useUnArchive();

  const router = useRouter();

  const divRef = useRef<ElementRef<"div">>(null);

  const [selectedCategory, setSelectedCategory] = useState<CategoryNameType>();
  const [selectNote, setSelectNote] = useState(false);

  const handelCategoryChange = (category: CategoryNameType) => {
    setSelectedCategory(category);
    setSelectNote(false);
  };

  const onSubmit = async () => {
    try {
      if (!selectedCategory && !selectNote) {
        return toast.error("You must select a category or a create a note");
      }
      if (!selectNote && selectedCategory) {
        await axios.post("https://back-lucanotion.onrender.com/unArchiveNote", {
          selectNote,
          noteId,
          categoryId: selectedCategory.categoryId,
        });
      } else {
        await axios.post("https://back-lucanotion.onrender.com/unArchiveNote", {
          selectNote,
          noteId,
        });
      }
      setSelectNote(false);
      toast.success("Note added");
      router.refresh();
      return onClose();
    } catch (error: any) {
      let errorMessage = "An error occurred";

      if (error.response) {
        // Si hay una respuesta del servidor, usar el mensaje de error proporcionado por el servidor
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        // Si no hay una respuesta del servidor, usar el mensaje de error general
        errorMessage = error.message;
      }

      return toast.error(errorMessage);
    }
  };

  const disableModal = () => {
    setSelectedCategory(undefined);
    setSelectNote(false);
    onClose();
  };

  const handleMakeNote = () => {
    setSelectNote(true);
    setSelectedCategory(undefined);
  };

  useOnClickOutside(divRef, disableModal);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setSelectedCategory(undefined);
      setSelectNote(false);
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div
          ref={divRef}
          className="text-neutral-700 mx-auto space-y-4 p-6 w-full "
        >
          <h2 className="font-semibold text-xl text-center">
            Select the Category Or Make a Note
          </h2>
          <div>
            <h1 className=" text-lg font-bold text-blue-700">Categories</h1>
            {allCategoriesNames.map((category) => (
              <p
                onClick={() => handelCategoryChange(category)}
                key={category.categoryId}
                className={`hover:bg-gray-200 p-2 rounded-sm cursor-pointer ${
                  selectedCategory?.title === category.title
                    ? "bg-gray-200"
                    : ""
                } `}
              >
                {category.title}
              </p>
            ))}
          </div>
          <div>
            <p
              onClick={handleMakeNote}
              className={`hover:bg-gray-200 p-2 rounded-sm cursor-pointer ${
                selectNote ? "bg-gray-200" : ""
              } `}
            >
              Make a note
            </p>
          </div>

          <Button
            onClick={() => {
              onSubmit();
            }}
            className="w-full"
          >
            Add note
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
