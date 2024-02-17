"use client";
import { CategoryNameType, NoteType } from "@/types";
import React, { ElementRef, useRef, useState } from "react";
import { format } from "date-fns";
import { Clipboard, Paperclip, Pencil, Trash2 } from "lucide-react";
import { Hint } from "../Hint";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { FormInput } from "../FormInput";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useUnArchive } from "@/hooks/use-unArchive";
import { useAddCategoryNote } from "@/hooks/use-addCategoryNote";

interface NoteProps {
  note: NoteType;
  isArchive?: boolean;
  allCategoriesNames: CategoryNameType[];
}

const Note = ({ note, isArchive, allCategoriesNames }: NoteProps) => {
  const router = useRouter();

  const { onOpen: openUnarchive } = useUnArchive();
  const { onOpen: openAddCategory } = useAddCategoryNote();

  const formattedDate = format(new Date(note.createdAt), "dd/MM/yyyy");
  const formattedDateUpdated = format(new Date(note.createdAt), "dd/MM/yyyy");
  const formattedHour = format(new Date(note.createdAt), "HH:mm:ss");
  const formattedHourUpdated = format(new Date(note.updatedAt), "HH:mm:ss");

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [noteDescription, setNoteDescription] = useState(note.description);
  const [noteTitle, setNoteTitle] = useState(note.title);
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
    const description = formData.get("description") as string;
    if (title.length <= 0) {
      return toast.error("Title must be enter");
    }
    if (title.length > 20) {
      return toast.error("Title should be shorter");
    }
    try {
      await axios.put("https://back-lucanotion.onrender.com/editNote", {
        title,
        description,
        id: note.id,
      });

      setNoteTitle(title);
      setNoteDescription(description);
      router.refresh();
      toast.success("Note updated");
      disableEditing();
      return;
    } catch (error) {
      return toast.error("Error:" + error);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`https://back-lucanotion.onrender.com/deleteNote?id=${note.id}`);
      toast.success("Note deleted");
      router.refresh();
      return;
    } catch (error) {
      return toast.error("Error deleting Note:" + error);
    }
  };

  const onArchive = async () => {
    try {
      await axios.post("https://back-lucanotion.onrender.com/archiveNotePost", {
        noteId: note.id,
      });
      router.refresh();
      toast.success("Note archive");
      return;
    } catch (error) {
      return toast.error("Error:" + error);
    }
  };
  const openAddCategoryy = () => {
    return openAddCategory(allCategoriesNames, note.id);
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  return (
    <div className="bg-white p-3 col-span-1 relative rounded-xl border shadow-sm hover:shadow-lg transition-transform transform hover:scale-105">
      {isEditing ? (
        <form
          ref={formRef}
          action={handleSubmit}
          className="flex-1 px-[2px] space-y-2"
        >
          <FormInput
            ref={inputRef}
            id="title"
            placeholder="Enter note title.."
            defaultValue={noteTitle}
            className=" placeholder:text-base placeholder:font-bold w-[70%] px-[7px] py-1 h-9 text-2xl font-bold border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <FormInput
            ref={inputRef}
            id="description"
            placeholder="Enter note description.."
            defaultValue={noteDescription}
            className=" w-[70%] px-[7px] py-1 h-7 font-light  border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div>
          <h1 className=" max-w-[75%] break-words text-xl xl:text-2xl font-bold">{noteTitle}</h1>
          <p className="w-full break-words font-light">{noteDescription}</p>
        </div>
      )}

      <div className="absolute top-0 right-0 px-2 py-1 ">
        <p className=" text-black/30 text-sm">
          {formattedDate === formattedDateUpdated
            ? formattedDate
            : formattedDateUpdated}
        </p>
        <p className=" text-black/30 text-sm text-end">
          {formattedHour === formattedHourUpdated
            ? formattedHour
            : formattedHourUpdated}
        </p>
      </div>

      <div className="flex space-x-2 items-end  justify-end">
        <Hint side="top" description="Edit" sideOffset={5}>
          <Pencil
            onClick={enableEditing}
            className="w-6 h-6 text-black/30 hover:text-black transition"
          />
        </Hint>
        <Hint side="top" description="Delete" sideOffset={5}>
          <Trash2
            onClick={onDelete}
            className="w-6 h-6 text-rose-500/30 hover:text-rose-500 transition"
          />
        </Hint>
        <Hint side="top" description="Add to Category" sideOffset={5}>
          <Clipboard
            onClick={openAddCategoryy}
            className="w-6 h-6 text-black/30 hover:text-black transition"
          />
        </Hint>
        {isArchive ? (
          <Hint side="top" description="Unarchive" sideOffset={5}>
            <Paperclip
              onClick={() => openUnarchive(allCategoriesNames, note.id)}
              className="w-6 h-6 text-black/30 hover:text-black transition"
            />
          </Hint>
        ) : (
          <Hint side="top" description="Archive" sideOffset={5}>
            <Paperclip
              onClick={onArchive}
              className="w-6 h-6 text-black/30 hover:text-black transition"
            />
          </Hint>
        )}
      </div>
    </div>
  );
};

export default Note;
