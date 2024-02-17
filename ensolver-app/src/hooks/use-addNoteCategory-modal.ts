import { CategoryNameType } from "@/types";
import { create } from "zustand";

type useAddNoteCategoryModalStore = {
  isOpen: boolean;
  onOpen: (
    allCategoriesNames: CategoryNameType[],
    noteId: string,
    categoryId: string
  ) => void;
  onClose: () => void;
  allCategoriesNames: CategoryNameType[];
  noteId: string;
  categoryId: string;
};

export const useAddNoteCategoryModal = create<useAddNoteCategoryModalStore>(
  (set) => ({
    categoryId: "",
    noteId: "",
    allCategoriesNames: [],
    isOpen: false,
    onOpen: (allCategoriesNames = [], noteId = "", categoryId) =>
      set({ isOpen: true, allCategoriesNames, noteId, categoryId }),
    onClose: () => set({ isOpen: false }),
  })
);
