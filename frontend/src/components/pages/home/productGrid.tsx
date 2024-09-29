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
  currentUser,
  sortByFilter,
  categoryFilterList,
  searchFilterString,
  cartCount,
} from "@/utils/atom";
import { useRecoilState } from "recoil";
import { useToast } from "@/hooks/use-toast";
import { getNewAccessToken } from "@/utils/getNewAccessToken";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string[];
  stock: number;
}

interface cartMappingType {
  productId: string;
  quantity: number;
}

interface cartResponse {
  productId: string;
  quantity: number;
  _id?: string;
}

const SkeletonCard = () => (
  <Card className="animate-pulse w-full h-full">
    <CardHeader>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
    </CardHeader>
    <CardContent>
      <div className="w-full h-48 bg-gray-300 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-1/4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-1/3"></div>
    </CardContent>
    <CardFooter>
      <div className="h-10 bg-gray-300 rounded w-full"></div>
    </CardFooter>
  </Card>
);

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortRecoil] = useRecoilState(sortByFilter);
  const [categoryRecoil] = useRecoilState(categoryFilterList);
  const [searchRecoil] = useRecoilState(searchFilterString);
  const [user, setUser] = useRecoilState(currentUser);
  const [, setTotalCartItems] = useRecoilState(cartCount);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [cartMapping, setCartMapping] = useState<cartMappingType[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setCartMapping([]);
  }, [user]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/getCart`,
          {
            withCredentials: true,
          }
        );

        const cartData: cartResponse[] = response.data.data;

        if (Array.isArray(cartData)) {
          cartData.forEach((item: cartResponse) => {
            delete item._id;
          });
          setCartMapping(cartData);
          setTotalCartItems(cartData.length);
        } else {
          setCartMapping([]);
          setTotalCartItems(0);
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

    getCart();
  }, []);

  useEffect(() => {
    setTotalCartItems(cartMapping.length);
  }, [cartMapping]);

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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string) => {
    if (!user.username)
      return toast({
        title: "Please login to proceed",
      });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/addToCart`,
        { productId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setCartMapping((prevCartMapping) => {
          const existingProduct = prevCartMapping.find(
            (product) => product.productId === productId
          );

          if (existingProduct) {
            return prevCartMapping.map((product) =>
              product.productId === productId
                ? { ...product, quantity: product.quantity + 1 }
                : product
            );
          } else {
            return [...prevCartMapping, { productId: productId, quantity: 1 }];
          }
        });
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

  const handleUpdateCart = async (
    productId: string,
    action: "increase" | "decrease"
  ) => {
    if (!user.username)
      return toast({
        title: "Please login to proceed",
      });
    if (action === "increase") {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/addToCart`,
          { productId },
          { withCredentials: true }
        );
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
        toast({
          title: "Error updating cart",
        });
        return;
      }
    } else {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/removeFromCart`,
          { productId },
          { withCredentials: true }
        );
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
        toast({
          title: "Error updating cart",
        });
        return;
      }
    }

    setCartMapping((prevCartMapping) => {
      return prevCartMapping
        .map((product) => {
          if (product.productId === productId) {
            if (action === "increase") {
              return { ...product, quantity: product.quantity + 1 };
            } else if (action === "decrease") {
              return { ...product, quantity: product.quantity - 1 };
            }
          }
          return product;
        })
        .filter((product) => product.quantity > 0);
    });
  };

  return (
    <div className="container mx-auto px-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.map((product) => (
              <div key={product._id} className="relative">
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-red-200 bg-opacity-50 rounded-lg flex items-center justify-center text-white text-xl font-bold z-10">
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
                    <p className="font-bold">₹{product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </p>
                  </CardContent>
                  <CardFooter>
                    {cartMapping.some(
                      (cartItem) => cartItem.productId === product._id
                    ) ? (
                      <div className="flex items-center justify-between w-full">
                        <Button
                          className="w-[2rem] h-[2rem]"
                          onClick={() =>
                            handleUpdateCart(product._id, "decrease")
                          }
                        >
                          -
                        </Button>
                        <div className="text-center bg-slate-200 w-[12rem] rounded-lg">
                          {
                            cartMapping.find(
                              (cartItem) => cartItem.productId === product._id
                            )?.quantity
                          }
                        </div>
                        <Button
                          className="w-[2rem] h-[2rem]"
                          onClick={() =>
                            handleUpdateCart(product._id, "increase")
                          }
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full"
                        disabled={product.stock === 0}
                        onClick={() => handleAddToCart(product._id)}
                      >
                        <Icons.shoppingCart className="mr-2 h-4 w-4" /> Add to
                        Cart
                      </Button>
                    )}
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
