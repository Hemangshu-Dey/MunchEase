import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

const categories = [
  "Fruits",
  "Vegetables",
  "Nuts",
  "Snacks",
  "Beverages",
  "Dairy",
  "Bakery",
  "Organic",
  "Beverages",
  "Dairy",
  "Bakery",
  "Organic",
];

export default function Sidebar() {
  const [sortOrder, setSortOrder] = useState("asc");

  return (
    <div className="fixed left-0 top-16 bottom-0 w-64 bg-white shadow-md overflow-y-auto z-[-1]">
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
                  <Checkbox id={category} />
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
            <RadioGroup defaultValue="asc" onValueChange={setSortOrder}>
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

        <Button className="w-full" variant="outline">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
