import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { sortByFilter, categoryFilterList, currentUser } from "@/utils/atom";
import { useRecoilState } from "recoil";

const categories = [
  "Fruits",
  "Vegetables",
  "Nuts",
  "Beverages",
  "Snacks",
  "Bakery",
  "Organic",
  "Seafood",
  "Frozen",
  "Pantry",
  "Condiments",
];

export default function Sidebar() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [, setSortRecoil] = useRecoilState(sortByFilter);
  const [, setCategoryRecoil] = useRecoilState(categoryFilterList);
  const [user] = useRecoilState(currentUser);
  const [checkedCategories, setCheckedCategories] = useState<
    Record<string, boolean>
  >(categories.reduce((acc, category) => ({ ...acc, [category]: false }), {}));

  useEffect(() => {
    handleRemoveFilters();
  }, [user]);

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    setCheckedCategories((prev) => ({
      ...prev,
      [category]: isChecked,
    }));
    if (isChecked) {
      setCategoryList((prev) => [...prev, category]);
    } else {
      setCategoryList((prev) => prev.filter((item) => item !== category));
    }
  };

  const handleApplyFilters = () => {
    setSortRecoil(sortOrder);
    setCategoryRecoil(categoryList);
  };

  const handleRemoveFilters = () => {
    setSortRecoil("asc");
    setCategoryRecoil([]);
    setSortOrder("asc");
    setCategoryList([]);
    setCheckedCategories(
      categories.reduce((acc, category) => ({ ...acc, [category]: false }), {})
    );
  };

  return (
    <div className="fixed left-0 top-16 bottom-0 w-[14rem] bg-white shadow-md overflow-y-auto">
      <div className="flex flex-col h-full p-4 space-y-6">
        <h2 className="text-lg font-semibold flex items-center">
          <Icons.filter className="mr-2 h-5 w-5" />
          Filters
        </h2>

        <div className="flex-grow overflow-y-auto space-y-6">
          <div>
            <h3 className="text-md font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={category}
                    checked={checkedCategories[category]}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, Boolean(checked))
                    }
                  />
                  <Label
                    htmlFor={category}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium mb-2">Sort by price</h3>
            <RadioGroup value={sortOrder} onValueChange={setSortOrder}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asc" id="asc" />
                <Label htmlFor="asc">Low to high</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="desc" id="desc" />
                <Label htmlFor="desc">High to low</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Button
            className="w-full"
            variant="outline"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
          <Button
            className="w-full text-white bg-slate-900 hover:bg-slate-700 hover:text-white"
            variant="outline"
            onClick={handleRemoveFilters}
          >
            Remove Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
