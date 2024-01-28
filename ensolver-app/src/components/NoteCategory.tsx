"use client";
import { CategoryNameType, NoteType } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import NoteCategoryAction from "./NoteCategoryAction";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "./FormInput";

interface NoteCategoryProps {
  index: number;
  note: NoteType;
  selectedColor: string;
  categoryId: string;
  allCategoriesNames: CategoryNameType[];
}

const NoteCategory = ({
  index,
  note,
  selectedColor,
  categoryId,
  allCategoriesNames,
}: NoteCategoryProps) => {
  const getColorHoverClass2 = (selectedColor: any) => {
    switch (selectedColor) {
      case "bg-red-500":
        return "bg-red-300 hover:bg-red-200 transition";
      case "bg-orange-500":
        return "bg-orange-300 hover:bg-orange-200 transition";
      case "bg-green-500":
        return "bg-green-300 hover:bg-green-200 transition";
      case "bg-cyan-500":
        return "bg-cyan-300 hover:bg-cyan-200 transition";
      case "bg-blue-500":
        return "bg-blue-300 hover:bg-blue-200 transition";
      case "bg-yellow-500":
        return "bg-yellow-300 hover:bg-yellow-200 transition";
      case "bg-purple-500":
        return "bg-purple-300 hover:bg-purple-200 transition";
      case "bg-pink-500":
        return "bg-pink-300 hover:bg-pink-200 transition";
      default:
        return "";
    }
  };

  const router = useRouter();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteDescription, setNoteDescription] = useState(note.description);

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

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
      await axios.put("https://back-lucanotion.onrender.com/editNoteCategory", {
        title,
        description,
        noteId: note.id,
        categoryId,
      });
      setNoteTitle(title);
      setNoteDescription(description);
      router.refresh();
      toast.success("Note updated");
      disableEditing();
      return;
    } catch (error) {
      console.log(error)
      return toast.error("Error:" + error);
    }
  };

 

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  return (
    <div className=" mt-2 px-2">
      <div
        className={` relative rounded-sm flex p-2 space-x-1 w-full ${getColorHoverClass2(
          selectedColor
        )}`}
      >
        {isEditing ? (
          <>
            <div className="flex items-center justify-center w-14 border-r-2 border-gray-500 ">
              <p className="p-6">{index + 1}</p>
            </div>
            <form
              ref={formRef}
              action={handleSubmit}
              className="flex-1  w-full space-y-2  ml-2  "
            >
              <FormInput
                ref={inputRef}
                id="title"
                placeholder="Enter note title.."
                defaultValue={noteTitle}
                className=" top-2 left-15 absolute w-[50%] placeholder:text-base placeholder:font-bold  text-lg font-bold  border-transparent hover:border-black focus:border-input transition truncate bg-transparent focus:bg-white"
              />
              <FormInput
                ref={inputRef}
                id="description"
                placeholder="Enter note description.."
                defaultValue={noteDescription}
                className=" absolute left-20 top-10  w-[50%] font-light  border-transparent hover:border-black focus:border-input transition truncate bg-transparent focus:bg-white"
              />

              <button type="submit" hidden />
            </form>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center w-14 border-r-2 border-gray-500 ">
              <p className="p-6">{index + 1}</p>
            </div>
            <div className=" max-w-[72.5%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[75%] xl:max-w-[80%] break-words ">
              <div onClick={enableEditing}>
                <p className=" font-bold text-base xl:text-lg">{noteTitle}</p>
                <p className=" pl-2 text-sm   text-black/60">
                  {noteDescription}
                </p>
              </div>

              <div className=" absolute top-1 right-0">
                <NoteCategoryAction
                  allCategoriesNames={allCategoriesNames}
                  categoryId={categoryId}
                  noteId={note.id}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteCategory;
