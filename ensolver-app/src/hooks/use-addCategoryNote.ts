import { CategoryNameType } from "@/types";
import { create } from "zustand";

type useAddCategoryNoteModalStore = {
  isOpen: boolean;
  onOpen: (allCategoriesNames: CategoryNameType[], noteId: string) => void;
  onClose: () => void;
  allCategoriesNames: CategoryNameType[];
  noteId: string;
};

export const useAddCategoryNote = create<useAddCategoryNoteModalStore>(
  (set) => ({
    noteId: "",
    allCategoriesNames: [],
    isOpen: false,
    onOpen: (allCategoriesNames = [], noteId = "") =>
      set({ isOpen: true, allCategoriesNames, noteId }),
    onClose: () => set({ isOpen: false }),
  })
);
