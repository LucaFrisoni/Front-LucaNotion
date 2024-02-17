import { CategoryNameType, NoteType } from "@/types";
import React from "react";

import Note from "./Note";

interface NotesListProps {
  allNotes?: NoteType[];
  archiveNote?: NoteType[] | null;
  isArchive?: boolean;
  allCategoriesNames: CategoryNameType[];
}

const NotesList = ({ allNotes, archiveNote, isArchive,allCategoriesNames }: NotesListProps) => {
  return (
    <div className="mt-2 mb-2 w-full px-6 gap-x-4 gap-y-2 grid grid-cols-1 md:grid-cols-2 scrollbar-w-2 lg:grid-cols-3  ">
      {archiveNote
        ? archiveNote?.map((note) => (
            <Note note={note} key={note.id} isArchive={isArchive} allCategoriesNames={allCategoriesNames} />
          ))
        : allNotes?.map((note) => <Note note={note} key={note.id} allCategoriesNames={allCategoriesNames} />)}
    </div>
  );
};

export default NotesList;
