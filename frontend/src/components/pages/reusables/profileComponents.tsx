import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { currentUser } from "@/utils/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import { getNewAccessToken } from "@/utils/getNewAccessToken";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Address {
  id: number;
  name: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  state: string;
  zip: string;
}

export default function ProfileComponent() {
  const [user, setUser] = useRecoilState(currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>();
  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    name: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    state: "",
    zip: "",
  });
  const [reRender, setReRender] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile/getAddresses`,
          {
            withCredentials: true,
          }
        );

        if (res.status == 200) {
          setAddresses(res.data.data.address);
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
              setReRender(!reRender);
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

    getAddresses();
  }, [reRender]);

  const handleAddAddress = async () => {
    setIsLoading(true);
    try {
      console.log(false);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/addAddresses`,
        newAddress,
        {
          withCredentials: true,
        }
      );

      if (response.status == 200) {
        setReRender(!reRender);
        setShowAddressForm(false);
        toast({
          title: "Address saved successfully",
        });
      }
    } catch (error) {
      console.log(error);
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
            setReRender(!reRender);
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
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={user.username}
              className="bg-gray-100"
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={user.email}
              className="bg-gray-100"
              readOnly
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Addresses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {addresses &&
            addresses.map((address, index) => (
              <Card key={address.id}>
                <CardHeader>
                  <CardTitle>Address {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Name: </strong>
                    {address.name}
                  </p>
                  <p>
                    <strong>Line 1: </strong>
                    {address.addressLineOne}
                  </p>
                  {address?.addressLineTwo && (
                    <p>
                      <strong>Line 2: </strong> {address.addressLineTwo}
                    </p>
                  )}
                  <p>
                    <strong>City: </strong> {address.city}
                  </p>
                  <p>
                    <strong>State: </strong> {address.state}
                  </p>
                  <p>
                    <strong>Zip: </strong> {address.zip}
                  </p>
                </CardContent>
              </Card>
            ))}
        </CardContent>
        <CardFooter>
          {!showAddressForm ? (
            <Button onClick={() => setShowAddressForm(true)} className="w-full">
              <Icons.plus className="mr-2 h-4 w-4" /> Add Address
            </Button>
          ) : (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>New Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newAddress.name}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="line1">Address Line 1</Label>
                  <Input
                    id="line1"
                    value={newAddress.addressLineOne}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        addressLineOne: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="line2">Address Line 2</Label>
                  <Input
                    id="line2"
                    value={newAddress.addressLineTwo}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        addressLineTwo: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="zip">Zip</Label>
                  <Input
                    id="zip"
                    value={newAddress.zip}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, zip: e.target.value })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleAddAddress}
                  className="w-full"
                  disabled={isLoading}
                >
                  Add
                </Button>
              </CardFooter>
            </Card>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
