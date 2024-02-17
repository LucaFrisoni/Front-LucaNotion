"use client";
import { CategoryNameType, CategoryType, NoteType } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "../FormInput";
import { NoteForm } from "../notes/NoteForm";
import CategoryActions from "./CategoryActions";
import NoteCategory from "../NoteCategory";

interface CategoryProps {
  category: CategoryType;
  allCategoriesNames: CategoryNameType[];
}

const Category = ({ category, allCategoriesNames }: CategoryProps) => {
  const { notesArray } = category;

  const router = useRouter();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [categoryTitle, setCategoryTitle] = useState(category.title);
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

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;

    if (title === category.title) {
      return disableEditing();
    }
    if (title.length <= 0) {
      return toast.error("Title must be enter");
    }
    if (title.length > 15) {
      return toast.error("Title should be shorter");
    }
    try {
      await axios.put("https://back-lucanotion.onrender.com/editCategory", {
        title,
        id: category.id,
      });

      setCategoryTitle(title);

      router.refresh();
      toast.success("Category updated");
      disableEditing();
      return;
    } catch (error) {
      return toast.error("Error:" + error);
    }
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const getColorHoverClass = (selectedColor: any) => {
    switch (selectedColor) {
      case "bg-red-500":
        return "bg-red-400";
      case "bg-orange-500":
        return "bg-orange-400";
      case "bg-green-500":
        return "bg-green-400";
      case "bg-cyan-500":
        return "bg-cyan-400";
      case "bg-blue-500":
        return "bg-blue-400";
      case "bg-yellow-500":
        return "bg-yellow-400";
      case "bg-purple-500":
        return "bg-purple-400";
      case "bg-pink-500":
        return "bg-pink-400";
      default:
        return "";
    }
  };
  const getColorHoverClass2 = (selectedColor: any) => {
    switch (selectedColor) {
      case "bg-red-500":
        return "bg-red-500";
      case "bg-orange-500":
        return "bg-orange-500";
      case "bg-green-500":
        return "bg-green-500";
      case "bg-cyan-500":
        return "bg-cyan-500";
      case "bg-blue-500":
        return "bg-blue-500";
      case "bg-yellow-500":
        return "bg-yellow-500";
      case "bg-purple-500":
        return "bg-purple-500";
      case "bg-pink-500":
        return "bg-pink-500";
      default:
        return "";
    }
  };

  return (
    <div
      className={` relative  rounded-xl  shadow-sm hover:shadow-lg ${getColorHoverClass(
        category.selectedColor
      )}`}
    >
      {isEditing ? (
        <form
          ref={formRef}
          action={handleSubmit}
          className="flex-1 px-[2px] space-y-2 mt-2 ml-2"
        >
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter category title.."
            defaultValue={categoryTitle}
            className=" placeholder:text-base placeholder:font-bold w-[70%] px-[7px] py-1 h-9 text-2xl font-bold border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />

          <button type="submit" hidden />
          <div className="space-y-2 mt-2 p-2 max-h-[58vh] overflow-y-auto scrollbar-w-2">
            {notesArray?.map((note: NoteType, index: number) => (
              <NoteCategory
                selectedColor={category.selectedColor}
                key={note.id}
                index={index}
                note={note}
                categoryId={category.id}
                allCategoriesNames={allCategoriesNames}
              />
            ))}
          </div>
        </form>
      ) : (
        <>
          <div
            className={`py-1 rounded-xl  ${getColorHoverClass(
              category.selectedColor
            )} flex justify-between`}
          >
            <h1
              onClick={enableEditing}
              className={`  ml-1 inline-block text-xl xl:text-2xl font-bold p-1 rounded-xl ${getColorHoverClass2(
                category.selectedColor
              )}`}
            >
              {categoryTitle}
            </h1>
            <CategoryActions categoryId={category.id} />
          </div>
          <div className="  max-h-[58vh] overflow-y-auto scrollbar-w-2">
            {notesArray?.map((note: NoteType, index: number) => (
              <NoteCategory
                selectedColor={category.selectedColor}
                key={note.id}
                index={index}
                note={note}
                categoryId={category.id}
                allCategoriesNames={allCategoriesNames}
              />
            ))}
          </div>

          <NoteForm categoryId={category.id} />
        </>
      )}
    </div>
  );
};

export default Category;
