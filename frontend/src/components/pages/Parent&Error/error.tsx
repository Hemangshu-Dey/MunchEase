import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-pink-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            404 - Page Not Found
          </h1>
          <p className="text-sm text-gray-600">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>

        <div className="mt-8">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 px-4 py-2 rounded-md text-sm font-medium"
          >
            Go Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
