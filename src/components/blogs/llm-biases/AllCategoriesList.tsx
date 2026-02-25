import React, { useState } from "react";
import type { ProjectData } from "./types";

interface AllCategoriesListProps {
  data: ProjectData;
}

const AllCategoriesList: React.FC<AllCategoriesListProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!data || !data.all_project_ideas) {
    return (
      <div className="my-react-component">
        <h2>Project Ideas</h2>
        <p>No project ideas available</p>
      </div>
    );
  }

  const categories = Object.keys(data.all_project_ideas);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="p-4 rounded-md relative">
      <div className="max-h-[510px] overflow-x-auto overflow-y-hidden flex flex-col flex-wrap gap-4 border border-gray-300 rounded-md p-4">
        {categories.map((category) => (
          <div key={category} className="flex-shrink-0">
            <button
              className="bg-blue-500 text-white border border-gray-400 rounded-md px-2 py hover:bg-blue-600 whitespace-nowrap text-sm"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCategory && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-md">
          <div className="bg-background rounded-lg max-w-full max-h-[90%] w-full mx-4 overflow-hidden shadow-lg">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">
                {selectedCategory}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-foreground/70 hover:text-foreground text-xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[400px] bg-background">
              <div className="space-y-3">
                {data.all_project_ideas[selectedCategory].map(
                  (project, index) => (
                    <div
                      key={index}
                      className="bg-background-secondary border border-border rounded-lg p-3"
                    >
                      <h4 className="text-lg font-semibold mb-2 text-foreground">
                        {project.title}
                      </h4>
                      <p className="text-foreground/80 mb-2 text-sm">
                        {project.description}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          project.difficulty
                            .toLowerCase()
                            .includes("difficult") ||
                          project.difficulty.toLowerCase().includes("hard")
                            ? "bg-red-500 text-white"
                            : project.difficulty
                                  .toLowerCase()
                                  .includes("medium")
                              ? "bg-orange-500 text-white"
                              : project.difficulty
                                    .toLowerCase()
                                    .includes("easy")
                                ? "bg-green-500 text-white"
                                : "bg-gray-500 text-white"
                        }`}
                      >
                        Difficulty: {project.difficulty}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategoriesList;
