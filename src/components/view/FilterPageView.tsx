import React from "react";
import CategorySection from "../category/CategorySection";
import NoteSection from "../notes/NoteSection";
import { CategoryNameType, CategoryType, NoteType } from "@/types";

interface FilterPageViewProps {
  allCategories: CategoryType[];
  allCategoriesNames: CategoryNameType[];
  filterCategory?: CategoryType | null;
  archiveNote?: NoteType[] | null;
  isArchive: boolean;
}

const FilterPageView = ({
  allCategories,
  allCategoriesNames,
  filterCategory,
  archiveNote,
  isArchive,
}: FilterPageViewProps) => {
  
  return (
    <main className="flex">
      <CategorySection
        allCategories={allCategories}
        filterCategory={filterCategory}
        isArchive={isArchive}
      />
      <NoteSection
        allCategoriesNames={allCategoriesNames}
        allCategories={allCategories}
        filterCategory={filterCategory}
        archiveNote={archiveNote}
        isArchive={isArchive}
      />
    </main>
  );
};

export default FilterPageView;
