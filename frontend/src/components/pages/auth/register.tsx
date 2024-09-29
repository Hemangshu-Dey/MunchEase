import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { registerSchema } from "@/zodValidationSchemas/auth.zodSchema";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface formDataType {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [formData, setFormData] = useState<formDataType>({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const result = registerSchema.safeParse({
      username: formData.username,
      email: formData.email,
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
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      if (response.status === 200) {
        toast({
          title: "You have been registered successfully",
        });
        navigate("/login");
      } else
        toast({
          title: "There was an issue registering you",
        });
    } catch (error) {
      console.log(error);
      toast({
        title: "There was an issue registering you",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-pink-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-8">
        <Link to="/home" className="text-center">
          <div className="flex justify-center mb-4">
            <Icons.pizza className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="font-extrabold text-gray-900 mb-2">
            <span className="text-4xl">M</span>
            <span className="text-2xl">UNCH</span>
            <span className="text-4xl">E</span>
            <span className="text-2xl">ASE</span>
          </h1>
          <p className="text-sm text-gray-600">
            Sign up to explore a world of delicious possibilities.
          </p>
        </Link>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1"
                placeholder="Choose a username"
                onChange={handleChange}
                value={formData.username}
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1"
                placeholder="you@example.com"
                onChange={handleChange}
                value={formData.email}
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
                placeholder="Create a strong password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
          </div>

          <Button
            disabled={isLoading}
            type="button"
            onClick={handleRegister}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Sign Up"}
          </Button>
        </form>
        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <Link
            to="/login"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Log in
          </Link>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icons.shieldCheck className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-xs text-gray-600">Secure Sign Up</span>
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
