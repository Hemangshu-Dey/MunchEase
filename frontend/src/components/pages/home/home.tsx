import NavbarHome from "../reusables/navbarHome";
import Sidebar from "@/components/pages/reusables/sidebar";
import ProductGrid from "@/components/pages/home/productGrid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-pink-50">
      <NavbarHome />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 mt-16 p-4">
          <ProductGrid />
        </main>
      </div>
    </div>
  );
}
