import { CategoryNameType, CategoryType, NoteType } from "@/types";
import React from "react";
import NoteSection from "../notes/NoteSection";
import CategorySection from "../category/CategorySection";

interface DashboardViewProps {
  allNotes: NoteType[];
  allCategories: CategoryType[];
  allCategoriesNames: CategoryNameType[]
}

const DashboardView = ({ allNotes, allCategories,allCategoriesNames }: DashboardViewProps) => {
  return (
    <main className="flex">
      <CategorySection allCategories={allCategories} />
      <NoteSection allCategoriesNames={allCategoriesNames} allNotes={allNotes} allCategories={allCategories} />
    </main>
  );
};

export default DashboardView;
