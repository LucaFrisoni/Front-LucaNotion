"use client";
import React from "react";
import { Button } from "../ui/button";
import { useCreateCategoryModal } from "@/hooks/use-createCategory-modal ";

const CategoryButton = () => {
  const { onOpen } = useCreateCategoryModal();

  const handleClick = () => {
    onOpen();
  };

  return (
    <Button onClick={handleClick} size="lg" className="text-base mr-2">
      Create Category
    </Button>
  );
};

export default CategoryButton;
