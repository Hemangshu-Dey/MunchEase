import NavbarOrders from "../reusables/navbarOrders";
import OrderComponent from "./orderComponent";

export default function Orders() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-pink-50">
      <NavbarOrders />
      <div className="flex flex-1">
        <main className="flex-1 mt-16 p-4">
          <OrderComponent />
        </main>
      </div>
    </div>
  );
}
