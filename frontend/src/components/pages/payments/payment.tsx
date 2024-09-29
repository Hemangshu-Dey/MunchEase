import PaymentsComponent from "./paymentComponent";
import { Link } from "react-router-dom";
import { Icons } from "@/components/icons";

export default function Payment() {
  return (
    <div className="bg-gradient-to-br from-white to-pink-50 ">
      <Link to="/home" className="text-center">
        <div className="flex justify-center">
          <Icons.pizza className="h-12 w-12 mt-4 text-green-500" />
        </div>
        <h1 className="font-extrabold text-gray-900">
          <span className="text-4xl">M</span>
          <span className="text-2xl">UNCH</span>
          <span className="text-4xl">E</span>
          <span className="text-2xl">ASE</span>
        </h1>
      </Link>
      <div className="mt-10">
        <PaymentsComponent />
      </div>
    </div>
  );
}
