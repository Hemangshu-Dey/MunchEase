import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string[];
  stock: number;
}

interface ProductGridProps {
  sortOrder: "asc" | "desc";
  selectedCategories: string[];
}

export default function ProductGrid({
  sortOrder,
  selectedCategories,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortOrder, selectedCategories]);

  const fetchProducts = async () => {
    try {
      const totalProducts = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/getTotalProducts`
      );
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/getProducts?page=${currentPage}`
      );

      setProducts(response.data.data);
      setTotalPages(Math.ceil(totalProducts.data.data / 6));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {products.map((product) => (
          <Card key={product._id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={product.imageUrl[0]}
                alt={product.name}
                className="w-full h-48 object-cover mb-2"
              />
              <p className="text-sm text-gray-600 mb-2">
                {product.description}
              </p>
              <p className="font-bold">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Icons.shoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2">
        <Button
          onClick={() =>
            setCurrentPage((prev) => {
              if (prev == 1) return 1;
              else return prev - 1;
            })
          }
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => {
              if (prev == totalPages) return totalPages;
              else return prev + 1;
            })
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
