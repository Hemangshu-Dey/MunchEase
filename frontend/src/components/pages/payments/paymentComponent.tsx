import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getNewAccessToken } from "@/utils/getNewAccessToken";
import {
  currentUser,
  totalOrderPrice,
  productList,
  cartCount,
} from "@/utils/atom";
import { useRecoilState } from "recoil";

interface Address {
  name: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  state: string;
  zip: string;
}

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export default function PaymentsComponent() {
  const [products] = useRecoilState(productList);
  const [selectedAddress, setSelectedAddress] = useState("address1");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [address, setAddress] = useState<Address | null>(null);
  const [, setUser] = useRecoilState(currentUser);
  const [totalPrice] = useRecoilState(totalOrderPrice);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [, setTotalCartItems] = useRecoilState(cartCount);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile/getAddresses`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          setAddresses(response.data.data.address);
        }
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
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
    };

    fetchAddresses();
  }, []);

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentAndOrder = async () => {
    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.expiryDate ||
      !paymentDetails.cvv ||
      !paymentDetails.nameOnCard ||
      !address
    ) {
      return toast({
        title: "Please complete all payment and address fields",
      });
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/makePayment`,
        { ...paymentDetails },
        { withCredentials: true }
      );

      const transactionId = response.data.data.transactionId;

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/createOrder`,
        {
          products,
          transactionId,
          address,
          totalAmount: totalPrice,
        },
        { withCredentials: true }
      );

      if (res.status == 200) {
        setTotalCartItems(0);
        navigate("/orders");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast({
          title: error?.response?.data.message,
        });
        navigate("/home");
      }
    }
  };

  const handleAddressSelection = (selectedIndex: string) => {
    const selectedAddressIndex = parseInt(selectedIndex);
    const selected = addresses[selectedAddressIndex];
    setAddress(selected);
    setSelectedAddress(selectedIndex);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Total: ₹{totalPrice}</p>
            </CardContent>
          </Card>
          <Card className="overflow-y-scroll h-[15rem]">
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              {addresses.length > 0 ? (
                <RadioGroup
                  value={selectedAddress}
                  onValueChange={handleAddressSelection}
                >
                  {addresses.map((address, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={index.toString()}
                      />
                      <Label htmlFor={index.toString()}>
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold">{address.name}</span>
                          <span>
                            {address.city}, {address.state} {address.zip}
                          </span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="flex flex-col gap-4 items-center">
                  <p>No addresses found</p>
                  <Button
                    onClick={() => navigate("/profile")}
                    className="w-full"
                  >
                    Go to profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber}
                  onChange={handlePaymentChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={paymentDetails.expiryDate}
                    onChange={handlePaymentChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input
                  id="nameOnCard"
                  name="nameOnCard"
                  placeholder="Hemangshu Dey"
                  value={paymentDetails.nameOnCard}
                  onChange={handlePaymentChange}
                />
              </div>
              <Button
                onClick={handlePaymentAndOrder}
                className="w-full"
                size="lg"
                disabled={addresses.length > 0 ? false : true}
              >
                Pay ₹{totalPrice}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
