import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Parent from "./components/pages/Parent&Error/parent";
import Error from "./components/pages/Parent&Error/error";
import Register from "./components/pages/auth/register";
import Login from "./components/pages/auth/login";
import Home from "./components/pages/home/home";
import Profile from "./components/pages/profile/profile";
import Cart from "./components/pages/cart/cart";
import { Toaster } from "@/components/ui/toaster";
import { RecoilRoot } from "recoil";
import Payment from "./components/pages/payments/payment";
import Orders from "./components/pages/orders/orders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Parent />,
      errorElement: <Error />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/profile",
      element: <Profile />,
      errorElement: <Error />,
    },
    {
      path: "/cart",
      element: <Cart />,
      errorElement: <Error />,
    },
    {
      path: "/payments",
      element: <Payment />,
      errorElement: <Error />,
    },
    {
      path: "/orders",
      element: <Orders />,
      errorElement: <Error />,
    },
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </RecoilRoot>
  );
}

export default App;
