import { CategoryNameType, CategoryType } from "@/types";
import React from "react";
import Category from "./Category";

interface CategorySectionProps {
  allCategories: CategoryType[];
  allCategoriesNames: CategoryNameType[];
  filterCategory?: CategoryType | null;
  isArchive?: boolean;
}

const CateogryList = ({
  allCategories,
  allCategoriesNames,
  filterCategory,
  isArchive,
}: CategorySectionProps) => {
  return (
    <div className="mt-2 mb-2 w-full px-6 gap-x-4 gap-y-2 grid grid-cols-1 md:grid-cols-2 scrollbar-w-2 lg:grid-cols-3  max-h-[70vh] overflow-y-auto ">
      {filterCategory ? (
        <Category
          allCategoriesNames={allCategoriesNames}
          category={filterCategory}
          key={filterCategory.id}
        />
      ) : isArchive ? null : (
        allCategories.map((category) => (
          <Category
            allCategoriesNames={allCategoriesNames}
            category={category}
            key={category.id}
          />
        ))
      )}
    </div>
  );
};

export default CateogryList;
