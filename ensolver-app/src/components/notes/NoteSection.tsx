import React from "react";
import NoteButton from "./NoteButton";
import CategoryButton from "../category/CategoryButton";
import NotesList from "./NotesList";
import { CategoryNameType, CategoryType, NoteType } from "@/types";
import CateogryList from "../category/CateogryList";

interface NoteSectionProps {
  allNotes?: NoteType[];
  allCategories: CategoryType[];
  allCategoriesNames: CategoryNameType[];
  filterCategory?: CategoryType | null;
  archiveNote?: NoteType[] | null;
  isArchive?: boolean;
}

const NoteSection = ({
  allCategories,
  allNotes,
  allCategoriesNames,
  filterCategory,
  archiveNote,
  isArchive,
}: NoteSectionProps) => {
  return (
    <section className="w-full  max-w-7xl md:py-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200   md:pb-3 lg:pb-4  xl:pb-5  pl-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3  font-bold text-5xl  sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900">
          My Notes
        </h1>
        <div className="flex mb-2 gap-2 flex-col md:flex-row">
          <NoteButton />
          <CategoryButton />
        </div>
      </div>

      <div className="max-h-[70vh] overflow-y-auto scrollbar-w-2">
        <NotesList
          allNotes={allNotes}
          archiveNote={archiveNote}
          isArchive={isArchive}
          allCategoriesNames={allCategoriesNames}
        />
        <CateogryList
          isArchive={isArchive}
          allCategoriesNames={allCategoriesNames}
          allCategories={allCategories}
          filterCategory={filterCategory}
        />
      </div>
    </section>
  );
};

export default NoteSection;
