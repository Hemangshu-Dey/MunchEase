import { useEffect, useState } from "react";
import axios from "axios";
import { format, differenceInHours } from "date-fns"; // Import differenceInHours
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Product {
  productId: string;
  quantity: number;
  name?: string;
}

interface Address {
  name: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  state: string;
  zip: string;
}

interface Order {
  _id: string;
  userid: string;
  products: Product[];
  totalAmount: number;
  transactionId: string;
  orderId: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
}

export default function OrderComponent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product name by product ID
  const fetchProductName = async (productId: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/getProductById?productId=${productId}`
      );
      return response.data.data.name;
    } catch (err) {
      console.log(err);
      return "Unknown Product";
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/getOrders`,
          {
            withCredentials: true,
          }
        );

        const fetchedOrders: Order[] = response.data.data.orders;

        const ordersWithProductNames = await Promise.all(
          fetchedOrders.map(async (order) => {
            const productsWithNames = await Promise.all(
              order.products.map(async (product) => {
                const productName = await fetchProductName(product.productId);
                return { ...product, name: productName };
              })
            );
            return { ...order, products: productsWithNames };
          })
        );

        setOrders(ordersWithProductNames);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch orders. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">
              You haven't placed any orders yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const orderDate = new Date(order.createdAt);
            const isDelivered = differenceInHours(new Date(), orderDate) > 48;

            return (
              <Card key={order._id}>
                <CardHeader>
                  <CardTitle>Order #{order.orderId}</CardTitle>
                  <CardDescription>
                    Placed on {format(orderDate, "MMMM d, yyyy")} | Total: ₹
                    {order.totalAmount.toFixed(2)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.products.map((product) => (
                        <TableRow key={product.productId}>
                          <TableCell>{product.name || "Unknown"}</TableCell>
                          <TableCell>{product.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                    <p>{order.address.name}</p>
                    <p>{order.address.addressLineOne}</p>
                    {order.address.addressLineTwo && (
                      <p>{order.address.addressLineTwo}</p>
                    )}
                    <p>
                      {order.address.city}, {order.address.state}{" "}
                      {order.address.zip}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Badge variant="outline">
                      Transaction ID: {order.transactionId}
                    </Badge>
                    <Badge variant="outline">Order ID: {order.orderId}</Badge>
                  </div>
                  {isDelivered && (
                    <div className="mt-4">
                      <Badge
                        variant="default"
                        className="bg-green-500 text-white"
                      >
                        Delivered
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
