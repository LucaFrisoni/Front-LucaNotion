"use client";
import React from "react";
import { Button } from "../ui/button";
import { useCreateNoteModal } from "@/hooks/use-createNote-modal";

const NoteButton = () => {
  const { onOpen } = useCreateNoteModal();

  const handleClick = () => {
    onOpen();
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      variant="primary"
      className="text-base mr-2"
    >
      Create Note
    </Button>
  );
};

export default NoteButton;
