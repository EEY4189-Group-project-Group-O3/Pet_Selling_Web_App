import { useState } from "react";
import { useGetPostCatrgoties } from "../../pages/PetViewSection/hooks/PostCategoryHook";
import { PostCategoryInterface } from "../../types";
import clsx from "clsx";

interface CategoryDropdownProps {
  onSelect: (category: { id: string; name: string }) => void; // Updated to pass object
  inpostform: boolean;
}

export const CategoryDropdown = ({
  onSelect,
  inpostform,
}: CategoryDropdownProps) => {
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  }>({
    id: "",
    name: "",
  });

  const { data: categories = [] } = useGetPostCatrgoties({});

  // Organize categories into parent-child structure
  const categoryTree: Record<
    number,
    PostCategoryInterface & { subcategories: PostCategoryInterface[] }
  > = {};

  categories.forEach((category) => {
    if (category.parent === null) {
      categoryTree[category.id] = { ...category, subcategories: [] };
    } else {
      if (!categoryTree[category.parent]) {
        categoryTree[category.parent] = {
          id: category.parent,
          name: "",
          parent: null,
          subcategories: [],
        };
      }
      categoryTree[category.parent].subcategories.push(category);
    }
  });

  return (
    <div
      className={clsx("relative w-full", {
        "sm:w-72": !inpostform,
        "sm:w-40": inpostform,
      })}
    >
      <select
        className={clsx(
          "w-full border border-gray-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-orange-500",
          {
            "px-4 py-2": !inpostform,
            "px-2 py-1 text-sm": inpostform,
          }
        )}
        value={selectedCategory.id}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selectedName =
            categories.find((cat) => cat.id.toString() === selectedId)?.name ||
            "";

          const selectedCategoryObj = { id: selectedId, name: selectedName };

          setSelectedCategory(selectedCategoryObj);
          onSelect(selectedCategoryObj); // Pass both ID and Name
        }}
      >
        <option value="">Select a category</option>
        {Object.values(categoryTree).map((parentCategory) => (
          <optgroup key={parentCategory.id} label={parentCategory.name}>
            <option value={parentCategory.id}>{parentCategory.name}</option>
            {parentCategory.subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                ─ {sub.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};
