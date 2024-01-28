import DashboardView from "@/components/view/DashboardView";

import axios from "axios";
import React from "react";

const DashboardPage = async () => {
 

  const {
    data: { filterNotes },
  } = await axios.get("https://back-lucanotion.onrender.com/findAllNotes");
  const {
    data: { allCategories },
  } = await axios.get("https://back-lucanotion.onrender.com/findAllCategories");
  const {
    data: { allCategoriesNames },
  } = await axios.get("https://back-lucanotion.onrender.com/findAllCategoriesNames");

  return (
    <div className="h-full flex flex-col">
      <DashboardView
        allCategoriesNames={allCategoriesNames}
        allCategories={allCategories}
        allNotes={filterNotes}
      />
    </div>
  );
};

export default DashboardPage;
