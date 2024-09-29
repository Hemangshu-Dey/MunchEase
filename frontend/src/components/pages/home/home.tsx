import Navbar from "@/components/pages/reusables/navbar";
import Sidebar from "@/components/pages/reusables/sidebar";
import ProductGrid from "@/components/pages/home/productGrid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 mt-16 p-4">
          <ProductGrid />
        </main>
      </div>
    </div>
  );
}
