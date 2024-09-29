import { useEffect, useState } from "react";
import axios from "axios";
import {
  cartCount,
  totalOrderPrice,
  currentUser,
  productList,
} from "@/utils/atom";
import { Minus, Plus, AlertTriangle, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { getNewAccessToken } from "@/utils/getNewAccessToken";
import { useRecoilState } from "recoil";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface CartResponse {
  productId: string;
  quantity: number;
  _id?: string;
}

interface ProductResponse {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string[];
  stock: number;
}

export default function ImprovedCartComponent() {
  const [cartMapping, setCartMapping] = useState<CartResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorItems, setErrorItems] = useState<ProductResponse[]>([]);
  const [, setTotalCartItems] = useRecoilState(cartCount);
  const [user, setUser] = useRecoilState(currentUser);
  const [, setOrderPrice] = useRecoilState(totalOrderPrice);
  const [reRender, setReRender] = useState<boolean>(false);
  const [, setAllProducts] = useRecoilState(productList);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setReRender(!reRender);
  }, [user]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/getCart`,
          { withCredentials: true }
        );

        const cartData: CartResponse[] = response.data.data;

        if (Array.isArray(cartData)) {
          cartData.forEach((item: CartResponse) => {
            delete item._id;
          });
          setCartMapping(cartData);
          setTotalCartItems(cartData.length);
        } else {
          setCartMapping([]);
          setTotalCartItems(0);
          return;
        }

        const productPromises = cartData.map((item: CartResponse) =>
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/getProductById?productId=${item.productId}`
          )
        );
        const productResponses = await Promise.all(productPromises);
        const fetchedProducts = productResponses.map(
          (response) => response.data.data
        );

        setProducts(fetchedProducts);

        const total = fetchedProducts.reduce((acc, product, index) => {
          const quantity = cartData[index].quantity;
          return acc + product.price * quantity;
        }, 0);
        setTotalPrice(total);

        const errorItems = fetchedProducts.filter(
          (product, index) => product.stock < cartData[index].quantity
        );
        setErrorItems(errorItems);
      } catch (error) {
        console.error("Error fetching cart items", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [cartMapping]);

  const handleQuantityChange = async (productId: string, change: number) => {
    if (change === 1) {
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

    setCartMapping((prevMapping) => {
      const updatedMapping = prevMapping.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: Math.max(1, item.quantity + change) };
        }
        return item;
      });
      return updatedMapping;
    });
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/removeAllFromCart`,
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

    setCartMapping((prevMapping) =>
      prevMapping.filter((item) => item.productId !== productId)
    );
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
    setTotalCartItems((prevCount) => prevCount - 1);
  };

  const handlePurchase = () => {
    setOrderPrice(totalPrice);
    setAllProducts(cartMapping);
    navigate("/payments");
  };

  useEffect(() => {
    const newTotal = products.reduce((acc, product, index) => {
      const quantity = cartMapping[index]?.quantity || 0;
      return acc + product.price * quantity;
    }, 0);
    setTotalPrice(newTotal);
  }, [cartMapping, products]);

  if (!cartMapping.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-96">
          <ShoppingCart size={64} className="text-muted text-black" />
          <h2 className="text-xl font-semibold mt-4 text-muted text-black">
            Your cart is empty
          </h2>
          <p className="text-muted text-black">
            Add items to your cart to see them here.
          </p>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="mt-6 text-green-600 hover:text-green-700 hover:bg-green-50 px-4 py-2 rounded-md text-sm font-medium"
          >
            Go Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">Your Cart</h1>
        <div className="grid gap-6 lg:grid-cols-3">
          <ScrollArea className="lg:col-span-2 rounded-lg h-full">
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <div className="flex flex-col justify-between">
                      <Skeleton className="h-4 w-40 mb-2" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-4 w-16 mt-2" />
                      <div className="flex items-center justify-between mt-4">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <div className="lg:sticky lg:top-4 h-fit">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-10" />
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-12" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Your Cart</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <ScrollArea className="lg:col-span-2 rounded-lg h-full">
          <div className="space-y-6">
            {products.map((product, index) => {
              const quantity = cartMapping[index]?.quantity || 0;
              const subtotal = product.price * quantity;
              const isOutOfStock = product.stock < quantity;

              return (
                <Card
                  key={product._id}
                  className={`relative overflow-hidden transition-all duration-300 ${isOutOfStock ? "border-destructive" : ""}`}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">
                      {product.name}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleRemoveItem(product._id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                      <img
                        src={product.imageUrl[0]}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                      {isOutOfStock && (
                        <Badge
                          variant="destructive"
                          className="absolute top-2 right-2"
                        >
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {product.description}
                        </p>
                        <p className="font-semibold">
                          ₹{product.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Stock: {product.stock}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              handleQuantityChange(product._id, -1)
                            }
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold w-8 text-center">
                            {quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleQuantityChange(product._id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="font-semibold">₹{subtotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                  {isOutOfStock && (
                    <CardFooter>
                      <Alert variant="destructive" className="w-full">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Stock Issue</AlertTitle>
                        <AlertDescription>
                          This item exceeds available stock (only{" "}
                          {product.stock} available).
                        </AlertDescription>
                      </Alert>
                    </CardFooter>
                  )}
                </Card>
              );
            })}
          </div>
        </ScrollArea>

        <div className="lg:sticky lg:top-4 h-fit">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {products.map((product, index) => {
                const quantity = cartMapping[index]?.quantity || 0;
                const subtotal = product.price * quantity;
                return (
                  <div
                    key={product._id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {product.name} (x{quantity})
                    </span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                );
              })}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                size="lg"
                onClick={handlePurchase}
                disabled={errorItems.length > 0 ? true : false}
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
