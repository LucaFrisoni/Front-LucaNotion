import FilterPageView from "@/components/view/FilterPageView";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

interface FilterPageIdPageProps {
  params: {
    categoryId: string;
  };
}

const FilterPage = async ({ params }: FilterPageIdPageProps) => {
  const { categoryId } = params;

  const {
    data: { allCategories },
  } = await axios.get("https://back-lucanotion.onrender.com/findAllCategories");
  const {
    data: { allCategoriesNames },
  } = await axios.get("https://back-lucanotion.onrender.com/findAllCategoriesNames");

  let filterCategory = "";
  let archiveCategory = "";
  let isArchive = false;
  if (categoryId === "archive") {
    const { data: filterCategoryArchive } = await axios.get(
      `https://back-lucanotion.onrender.com/archiveNotes`
    );
    archiveCategory = filterCategoryArchive.archivedNotes;
    isArchive = true;
  } else {
    const { data: filterCategoryy } = await axios.get(
      `https://back-lucanotion.onrender.com/findCategoriesByID?id=${categoryId}`
    );
    filterCategory = filterCategoryy;
  }

  if (typeof filterCategory === "string" && categoryId !== "archive") {
    return (
      <div className="min-h-[90vh] flex flex-col justify-center items-center">
        <div className="p-4  text-5xl font-bold">No Categories found</div>
        <Link href={"/dashboard"}>
          <Button variant="primary">
            Go Back <ArrowLeft className="ml-2" />
          </Button>
        </Link>
      </div>
    );
  }
  if (typeof archiveCategory === "string" && categoryId === "archive") {
    return (
      <div className="min-h-[90vh] flex flex-col justify-center items-center">
        <div className="p-4  text-5xl font-bold">No archived notes found</div>
        <Link href={"/dashboard"}>
          <Button variant="primary">
            Go Back <ArrowLeft className="ml-2" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <FilterPageView
        allCategories={allCategories}
        allCategoriesNames={allCategoriesNames}
        filterCategory={
          typeof filterCategory !== "string" ? filterCategory : null
        }
        archiveNote={
          typeof archiveCategory !== "string" ? archiveCategory : null
        }
        isArchive={isArchive}
      />
    </div>
  );
};

export default FilterPage;
