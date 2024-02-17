"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

import { FormInput } from "../FormInput";
import { ElementRef, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCreateCategoryModal } from "@/hooks/use-createCategory-modal ";

export const CreateCategoryModal = () => {
  const createCategoryModal = useCreateCategoryModal();

  const router = useRouter();

  const divRef = useRef<ElementRef<"div">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const onSubmit = async (formData: FormData) => {
    const noteCategory = formData.get("noteCategory") as string;

    if (noteCategory.length < 3) {
      return toast.error("Title should be longer");
    }
    if (noteCategory.length > 30) {
      return toast.error("Title should be shorter");
    }
    if (!selectedColor) {
      return toast.error("You must select a color");
    }

    try {
      axios.post("https://back-lucanotion.onrender.com/createCategory", {
        title: noteCategory,
        selectedColor,
      });
      toast.success("Category created");
      router.refresh();
      return createCategoryModal.onClose();
    } catch (error: any) {
      toast.error(error);
    }
  };

  const disableModal = () => {
    setSelectedColor("");
    createCategoryModal.onClose();
  };

  useOnClickOutside(divRef, disableModal);

  const [availableColors, setAvailableColors] = useState([
    "bg-red-500",
    "bg-orange-500",
    "bg-green-500",
    "bg-cyan-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ]);

  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (color: any) => {
    setSelectedColor(color);
  };

  return (
    <Dialog
      open={createCategoryModal.isOpen}
      onOpenChange={createCategoryModal.onClose}
    >
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div ref={divRef} className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl bg">Create a Category</h2>

          <form action={onSubmit} className="space-y-6">
            <FormInput ref={inputRef} id="noteCategory" label="Title" />
            <div className="flex space-x-2">
              {availableColors.map((color) => (
                <div
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer ${color} ${
                    selectedColor === color ? "ring-2 ring-black" : ""
                  }`}
                />
              ))}
            </div>
            <Button className="w-full" variant="primary">
              Create
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
