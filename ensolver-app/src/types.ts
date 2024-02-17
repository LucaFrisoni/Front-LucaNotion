export type NoteType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  archive: boolean;
  category: string[] | null;
};

export type CategoryType = {
  id: string;
  title: string;
  notesArray: any[] | null;
  createdAt: Date;
  updatedAt: Date;
  selectedColor:string
};
export type CategoryNameType = {
  categoryId: string;
  title: string;
};
