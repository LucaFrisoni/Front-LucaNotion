import { CategoryNameType } from "@/types";
import { create } from "zustand";

type useUnArchiveModalStore = {
  isOpen: boolean;
  onOpen: (allCategoriesNames: CategoryNameType[], noteId: string) => void;
  onClose: () => void;
  allCategoriesNames: CategoryNameType[] ;
  noteId: string;
};

export const useUnArchive = create<useUnArchiveModalStore>((set) => ({
  noteId: "",
  allCategoriesNames: [],
  isOpen: false,
  onOpen: (allCategoriesNames = [], noteId = "") =>
    set({ isOpen: true, allCategoriesNames, noteId }),
  onClose: () => set({ isOpen: false }),
}));
