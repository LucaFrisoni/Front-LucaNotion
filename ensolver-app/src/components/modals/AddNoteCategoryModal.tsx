"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAddNoteCategoryModal } from "@/hooks/use-addNoteCategory-modal";
import { CategoryNameType } from "@/types";

export const AddNoteCategoryModal = () => {
  const { allCategoriesNames, isOpen, onClose, noteId, categoryId } =
    useAddNoteCategoryModal();

  const router = useRouter();

  const divRef = useRef<ElementRef<"div">>(null);

  const [selectedCategory, setSelectedCategory] = useState<CategoryNameType>();

  const handelCategoryChange = (category: CategoryNameType) => {
    setSelectedCategory(category);
  };

  const onSubmit = async () => {
    try {
      if (!selectedCategory) {
        return toast.error("You must select a category");
      }
      console.log("Selected category =>", selectedCategory);
      await axios.post("https://back-lucanotion.onrender.com/addNoteToAnotherCategory", {
        noteId,
        categoryId: selectedCategory.categoryId,
      });
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
    onClose();
  };

  useOnClickOutside(divRef, disableModal);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setSelectedCategory(undefined);
    }
  };

  useEventListener("keydown", onKeyDown);


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div
          ref={divRef}
          className="text-neutral-700 mx-auto space-y-6 p-6 w-full "
        >
          <h2 className="font-semibold text-xl text-center">
            Select the Category
          </h2>
          <div>
            {allCategoriesNames
              .filter((category) => category.categoryId !== categoryId)
              .map((category) => (
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
          <Button
            onClick={() => {
              onSubmit();
            }}
            className="w-full"
            variant="primary"
          >
            Add note
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
