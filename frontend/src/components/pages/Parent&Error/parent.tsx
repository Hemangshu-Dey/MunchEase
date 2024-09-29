import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Parent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);

  return <Outlet />;
}
