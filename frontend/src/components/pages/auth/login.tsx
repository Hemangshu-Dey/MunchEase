import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "@/zodValidationSchemas/auth.zodSchema";
import { currentUser } from "@/utils/atom";
import { useRecoilState } from "recoil";

interface FormDataType {
  identifier: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormDataType>({
    identifier: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(currentUser);

  useEffect(() => {
    if (user.username) {
      navigate("/home");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setIsLoading(true);

    const result = loginSchema.safeParse({
      identifier: formData.identifier,
      password: formData.password,
    });

    if (!result.success) {
      setIsLoading(false);
      return toast({
        title: result.error.errors[0].message,
      });
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          identifier: formData.identifier,
          password: formData.password,
        },
        { withCredentials: true }
      );

      setFormData({
        identifier: "",
        password: "",
      });

      if (response.status === 200) {
        const userObj = {
          username: response.data.data.username,
          email: response.data.data.email,
          userid: response.data.data.id,
        };
        setUser(userObj);

        toast({
          title: "You have been logged in successfully",
        });

        navigate("/home");
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Login failed",
        description: "An error occurred during login",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-pink-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Icons.pizza className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600">
            Log in to explore a world of delicious possibilities.
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700"
              >
                Username or Email
              </Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                required
                className="mt-1"
                placeholder="Enter your username or email"
                onChange={handleChange}
                value={formData.identifier}
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1"
                placeholder="Enter your password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
          </div>

          <Button
            disabled={isLoading}
            type="button"
            onClick={handleLogin}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Log In"}
          </Button>
        </form>
        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account?</span>{" "}
          <Link
            to="/register"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Sign up
          </Link>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icons.shieldCheck className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-xs text-gray-600">Secure Login</span>
            </div>
            <div className="flex items-center">
              <Icons.lock className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-xs text-gray-600">SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
