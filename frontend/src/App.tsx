import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Parent from "./components/pages/Parent&Error/parent";
import Error from "./components/pages/Parent&Error/error";
import Register from "./components/pages/auth/register";
import Login from "./components/pages/auth/login";
import Home from "./components/pages/home/home";
import { Toaster } from "@/components/ui/toaster";
import { RecoilRoot } from "recoil";

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
  ]);

  return (
    <RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </RecoilRoot>
  );
}

export default App;
