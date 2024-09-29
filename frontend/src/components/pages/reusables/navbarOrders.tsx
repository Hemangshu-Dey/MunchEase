import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { currentUser, cartCount } from "@/utils/atom";
import { useRecoilState } from "recoil";
import { useToast } from "@/hooks/use-toast";
import { getNewAccessToken } from "@/utils/getNewAccessToken";

export default function NavbarOrders() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalCartItems] = useRecoilState(cartCount);
  const [user, setUser] = useRecoilState(currentUser);
  const [reRender, setReRender] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    setReRender(!reRender);
  }, [user]);

  useEffect(() => {
    const validation = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/validation`,
          { withCredentials: true }
        );

        if (response.status == 200) {
          const userObj = {
            username: response.data.data.username,
            email: response.data.data.email,
            userid: response.data.data.id,
          };
          setUser(userObj);
        }
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status == 401) {
            const res = await getNewAccessToken();
            if (res === "401") {
              setUser({
                userid: "",
                username: "",
                email: "",
              });
              navigate("/home");
            } else {
              setUser({
                userid: res.data.data.id,
                username: res.data.data.username,
                email: res.data.data.email,
              });
            }
          } else {
            setUser({
              userid: "",
              username: "",
              email: "",
            });
            navigate("/home");
          }
        } else {
          setUser({
            userid: "",
            username: "",
            email: "",
          });
          navigate("/home");
        }
      }
    };

    if (!user.username) validation();
  }, []);

  const handleLogout = async () => {
    try {
      console.log(user.userid);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {
          userid: user.userid,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status == 200) {
        setUser({
          userid: "",
          username: "",
          email: "",
        });

        toast({
          title: "Logged out successfully",
        });
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error logging out",
      });
    }
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <Button
            variant="ghost"
            className="w-10 h-10 rounded-full bg-green-500 text-white font-bold text-lg"
          >
            {user.username.charAt(0).toUpperCase()}
          </Button>
          {totalCartItems > 0 && (
            <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => navigate("/home")}
        >
          Home
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => navigate("/profile")}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={() => navigate("/cart")}
        >
          Cart
          {totalCartItems > 0 && (
            <span className="ml-2 text-sm font-bold text-green-500">
              ({totalCartItems})
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onSelect={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="bg-white shadow-md w-full fixed z-[1000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Icons.pizza className="h-8 w-8 text-green-500 mr-2" />
              <span className="text-xl font-bold text-gray-900">MunchEase</span>
            </Link>
          </div>
          <div className="hidden sm:flex items-center">
            {user.userid ? (
              <UserMenu />
            ) : (
              <>
                <Button
                  onClick={() => navigate("/register")}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  className="ml-4 text-green-600 hover:text-green-700 hover:bg-green-50 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Button>
              </>
            )}
          </div>
          <div className="sm:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <Icons.x className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Icons.menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user.userid ? (
              <>
                <Button
                  onClick={() => navigate("/home")}
                  variant="ghost"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Button>
                <Button
                  onClick={() => navigate("/profile")}
                  variant="ghost"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Profile
                </Button>
                <Button
                  onClick={() => navigate("/cart")}
                  variant="ghost"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Cart
                  {totalCartItems > 0 && (
                    <span className="ml-2 text-sm font-bold text-green-500">
                      ({totalCartItems})
                    </span>
                  )}
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/register")}
                  variant="ghost"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Register
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  variant="ghost"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
