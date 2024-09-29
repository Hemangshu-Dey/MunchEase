import { useState, useEffect, useRef } from "react";
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
import {
  sortByFilter,
  categoryFilterList,
  searchFilterString,
} from "@/utils/atom";
import { useRecoilState } from "recoil";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string[];
  stock: number;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortRecoil] = useRecoilState(sortByFilter);
  const [categoryRecoil] = useRecoilState(categoryFilterList);
  const [searchRecoil] = useRecoilState(searchFilterString);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounceTimeoutRef.current as NodeJS.Timeout);
  }, [currentPage, sortRecoil, categoryRecoil, searchRecoil]);

  const fetchProducts = async () => {
    try {
      let url = `${import.meta.env.VITE_BACKEND_URL}/api/products/getProducts?page=${currentPage}`;

      if (sortRecoil) {
        url += `&desc=${sortRecoil === "desc"}`;
      }

      if (categoryRecoil.length > 0) {
        const categories = categoryRecoil.join(",");
        url += `&categories=${encodeURIComponent(categories)}`;
      }

      if (searchRecoil.length > 0) {
        const name = searchRecoil;
        url += `&name=${encodeURIComponent(name)}`;
      }

      const response = await axios.get(url);

      setProducts(response.data.data.products);
      setTotalPages(Math.ceil(response.data.data.totalProducts / 6));
      if (currentPage > Math.ceil(response.data.data.totalProducts / 6))
        setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {products.map((product) => (
          <div key={product._id} className="relative">
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-red-500 bg-opacity-50 rounded-lg flex items-center justify-center text-white text-lg font-bold z-10">
                OUT OF STOCK
              </div>
            )}
            <Card
              className={`flex flex-col justify-between w-full h-full ${
                product.stock === 0 ? "blur-sm" : ""
              }`}
            >
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={product.imageUrl[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-2"
                />
                <p className="text-sm text-gray-600 mb-2 overflow-y-auto max-h-24">
                  {product.description}
                </p>
                <p className="font-bold">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={product.stock === 0}>
                  <Icons.shoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2">
        <Button
          className="w-[4.5rem]"
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
        {totalPages === 0 ? (
          <span>0 of 0</span>
        ) : (
          <span>
            {currentPage} of {totalPages}
          </span>
        )}
        <Button
          className="w-[4.5rem]"
          onClick={() =>
            setCurrentPage((prev) => {
              if (prev == totalPages) return totalPages;
              else return prev + 1;
            })
          }
          disabled={totalPages === 0 ? true : currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
