"use client";

import { AddCategoryNoteModal } from "@/components/modals/AddCategoryNoteModal";
import { AddNoteCategoryModal } from "@/components/modals/AddNoteCategoryModal";
import { CreateCategoryModal } from "@/components/modals/CreateCategoryModal ";
import { CreateNoteModal } from "@/components/modals/CreateNoteModal";
import { UnarchiveModal } from "@/components/modals/UnarchiveModal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateNoteModal />
      <CreateCategoryModal />
      <AddNoteCategoryModal />
      <UnarchiveModal />
      <AddCategoryNoteModal />
    </>
  );
};
