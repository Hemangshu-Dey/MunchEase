import NavbarCart from "../reusables/navbarCart";
import CartComponent from "./cartComponent";

export default function Cart() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-pink-50">
      <NavbarCart />
      <div className="flex flex-1">
        <main className="flex-1 mt-16 p-4">
          <CartComponent />
        </main>
      </div>
    </div>
  );
}
