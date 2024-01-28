import { CategoryType } from "@/types";
import Link from "next/link";
import React from "react";
import MobileCategorySection from "../MobileCategorySection";

interface CategorySectionProps {
  allCategories: CategoryType[];
  filterCategory?: CategoryType | null;
  isArchive?: boolean;
}

const CategorySection = ({
  allCategories,
  filterCategory,
  isArchive,
}: CategorySectionProps) => {
  const getColorHoverClass = (selectedColor: any) => {
    switch (selectedColor) {
      case "bg-red-500":
        return "hover:bg-red-200 border-red-500 text-red-500";
      case "bg-orange-500":
        return "hover:bg-orange-200 border-orange-500 text-orange-500";
      case "bg-green-500":
        return "hover:bg-green-200 border-green-500 text-green-500";
      case "bg-cyan-500":
        return "hover:bg-cyan-200 border-cyan-500 text-cyan-500";
      case "bg-blue-500":
        return "hover:bg-blue-200 border-blue-500 text-blue-500";
      case "bg-yellow-500":
        return "hover:bg-yellow-200 border-yellow-500 text-yellow-500";
      case "bg-purple-500":
        return "hover:bg-purple-200 border-purple-500 text-purple-500";
      case "bg-pink-500":
        return "hover:bg-pink-200 border-pink-500 text-pink-500";
      default:
        return "";
    }
  };
  const getColorHoverClass2 = (selectedColor: any) => {
    switch (selectedColor) {
      case "bg-red-500":
        return "bg-red-300 ";
      case "bg-orange-500":
        return "bg-orange-300 ";
      case "bg-green-500":
        return "bg-green-300 ";
      case "bg-cyan-500":
        return "bg-cyan-300 ";
      case "bg-blue-500":
        return "bg-blue-300 ";
      case "bg-yellow-500":
        return "bg-yellow-300 ";
      case "bg-purple-500":
        return "bg-purple-300 ";
      case "bg-pink-500":
        return "bg-pink-300 ";
      default:
        return "";
    }
  };
  return (
    <>
      <div className="relative top-10 left-8">
       
        <MobileCategorySection
          allCategories={allCategories}
          filterCategory={filterCategory}
          isArchive={isArchive}
        />
      </div>

      <section className="hidden sm:flex ml-[10%] w-[20%] md:w-[15%] md:py-10  justify-end ">
        <div className="w-full ">
          <div className="mt-8  flex flex-col justify-end  gap-4 border-b border-r border-gray-200 sm:pt-[60px] md:pt-0 md:pb-4 lg:pb-4  xl:pb-5 pr-5 sm:flex-row sm:items-center sm:gap-0">
            <h1 className="  mb-3 ml-auto text-2xl  relative sm:bottom-[30px] md:bottom-0 md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-600 ">
              Categories
            </h1>
          </div>

          <div className=" scrollbar-w-2  max-h-[72vh] overflow-y-auto">
            <div className="px-1 mt-2 inline-block">
              <Link href="/dashboard">
                <p
                  className={`border-2 border-black p-1 px-3 rounded-2xl hover:cursor-pointer hover:bg-black/20  transition ${
                    !isArchive && !filterCategory ? "bg-black/20" : ""
                  }`}
                >
                  All
                </p>
              </Link>
            </div>
            <div className="px-1 mt-2 inline-block">
              <Link href="/dashboard/archive">
                <p
                  className={`border-2 border-black p-1 px-3 rounded-2xl hover:cursor-pointer hover:bg-black/20 transition ${
                    isArchive ? "bg-black/20" : ""
                  }`}
                >
                  Archive
                </p>
              </Link>
            </div>

            {allCategories?.map((category) => (
              <div className="p-1 inline-block " key={category.id}>
                <Link href={`/dashboard/${category.id}`}>
                  <p
                    className={`border-2 w-full   text-sm font-bold p-1 rounded-2xl cursor-pointer transition ${getColorHoverClass(
                      category.selectedColor
                    )} ${
                      filterCategory?.id === category.id
                        ? getColorHoverClass2(filterCategory.selectedColor)
                        : ""
                    }  `}
                  >
                    {category.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategorySection;
