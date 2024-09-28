import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import ProductGrid from "@/components/ui/productGrid";

export default function Home() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 mt-16 p-4">
          <ProductGrid
            sortOrder={sortOrder}
            selectedCategories={selectedCategories}
          />
        </main>
      </div>
    </div>
  );
}
