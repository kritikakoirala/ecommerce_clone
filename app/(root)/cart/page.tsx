'use client'

import EmptyCart from "@/components/cart/EmptyCart";
import NoAccess from "@/components/cart/NoAccess";
import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FavoriteContainer from "@/components/products/FavoriteContainer";
import { toast } from "sonner";
import PriceFormatter from "@/components/products/PriceFormatter";
import QuantityButton from "@/components/products/QuantityButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { client } from "@/sanity/lib/client";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";


export default function Cart() {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
    getGroupedItems,

  } = useStore();

  const [loading, setLoading] = useState(false);
  const groupedItems = getGroupedItems()
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const fetchAddresses = async () => {
    setLoading(true)

    try {
      const query = `*[_type=="address"] | order(publishedAt desc)`
      const data = await client.fetch(query);
      setAddresses(data);

      const defaultAddress = data.find((addr: Address) => addr.default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]); // Optional: select first address if no default
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchAddresses()
  }, [])

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  }


  const handleCheckout = async () => {
    setLoading(true)
    try {

      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id,
        address: selectedAddress
      }
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata)

      if (checkoutUrl) {
        window.location.href = checkoutUrl
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <div className="bg-gray-50 pb-52 md:pb-10">
        {
          isSignedIn ?
            <Container>
              {
                groupedItems?.length > 0 ?
                  <>
                    <div className="flex items-center gap-2 py-5">
                      <ShoppingBag className="text-darkColor" />
                      <Title>Shopping Cart</Title>
                    </div>
                    <div className="grid lg:grid-cols-3 md:gap-8 px-4">
                      <div className="lg:col-span-2 rounded-lg">
                        <div className="border bg-white rounded-md">
                          {
                            groupedItems?.length > 0 &&

                            groupedItems?.map(({ product }) => {
                              const itemCount = getItemCount(product?._id)
                              return (

                                <div key={product?._id} className="border-b p-2.5 last:border-b-0 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-5"
                                >
                                  <div className="flex flex-col sm:flex-row flex-1 items-center sm:items-start gap-2 h-36 md:h-44">
                                    {
                                      product?.images && <Link href={`/product/${product?.slug?.current}`}>

                                        <Image src={urlFor(product?.images[0]).url()}
                                          alt="Product Image"
                                          width={500}
                                          height={500}
                                          loading="lazy"
                                          className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect"
                                        />
                                      </Link>
                                    }
                                    <div className="h-full flex flex-1 flex-col items-center sm:items-start justify-between py-1">
                                      <div className="flex flex-col items-center sm:items-start gap-0.5 md:gap-1.5 py-3 sm:py-0">
                                        <h2 className="text-base font-semibold text-center line-clamp-3 sm:line-clamp-1 pb-2 sm:pb-0 ">
                                          {product?.name}
                                        </h2>
                                        <p className="text-sm capitalize">
                                          Variant:{" "}
                                          <span className="font-semibold">
                                            {product?.variant}
                                          </span>
                                        </p>
                                        <p className="text-sm capitalize">
                                          Status:{" "}
                                          <span className="font-semibold">
                                            {product?.status}
                                          </span>
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <FavoriteContainer
                                                product={product}
                                                className="relative top-0 right-0"
                                              />
                                            </TooltipTrigger>
                                            <TooltipContent className="font-bold">
                                              Add to Favorite
                                            </TooltipContent>
                                          </Tooltip>
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <Trash
                                                onClick={() => {
                                                  deleteCartProduct(product?._id);
                                                  toast(
                                                    "Product deleted successfully!"
                                                  );
                                                }}
                                                className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                              />
                                            </TooltipTrigger>
                                            <TooltipContent className="font-bold bg-red-600">
                                              Delete product
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center sm:items-start justify-between sm:h-36 md:h-44 p-0.5 md:p-1">
                                    <PriceFormatter
                                      amount={(product?.price as number) * itemCount}
                                      className="font-bold text-lg pb-2 sm:pb-0"
                                    />
                                    <QuantityButton product={product} />

                                  </div>
                                </div>
                              )
                            })
                          }

                          <div className="flex justify-end">
                            <Button
                              onClick={handleResetCart}
                              variant={'destructive'}
                              className="m-5 font-semibold"
                            >
                              Reset Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="lg:col-span-1">
                          <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                            <h2 className="text-xl font-semibold mb-4">
                              Order Summary
                            </h2>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span>SubTotal</span>
                                <PriceFormatter amount={getSubTotalPrice()} />
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Discount</span>
                                <PriceFormatter
                                  amount={getSubTotalPrice() - getTotalPrice()}
                                />
                              </div>
                              <Separator />
                              <div className="flex items-center justify-between font-semibold text-lg">
                                <span>Total</span>
                                <PriceFormatter
                                  amount={getTotalPrice()}
                                  className="text-lg font-bold text-black"
                                />
                              </div>
                              <Button
                                className="w-full rounded-full font-semibold tracking-wide hoverEffect"
                                size="lg"
                                disabled={loading}
                                onClick={handleCheckout}
                              >
                                {loading ? "Please wait..." : "Proceed to Checkout"}
                              </Button>
                            </div>
                          </div>
                          {addresses && (
                            <div className="bg-white rounded-md mt-5">
                              <Card>
                                <CardHeader>
                                  <CardTitle>Delivery Address</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <RadioGroup
                                    defaultValue={addresses
                                      ?.find((addr) => addr.default)
                                      ?._id.toString()}
                                  >
                                    {addresses?.map((address) => (
                                      <div
                                        key={address?._id}
                                        onClick={() => setSelectedAddress(address)}
                                        className={`flex items-center space-x-2 mb-4 cursor-pointer ${selectedAddress?._id === address?._id && "text-shop_dark_green"}`}
                                      >
                                        <RadioGroupItem
                                          value={address?._id.toString()}
                                        />
                                        <Label
                                          htmlFor={`address-${address?._id}`}
                                          className="grid gap-1.5 flex-1"
                                        >
                                          <span className="font-semibold">
                                            {address?.name}
                                          </span>
                                          <span className="text-sm text-black/">
                                            {address.address}, {address.city},{" "}
                                            {address.state} {address.zip}
                                          </span>
                                        </Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                  <Button variant="outline" className="w-full mt-4">
                                    Add New Address
                                  </Button>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="md:hidden fixed bottom-0 left-0 w-full bg-shop_light_green/20 shadow-2xl  pt-2 z-10">
                        <div className="bg-white  p-4 rounded-lg border mx-4">
                          <h2 className="py-3 font-bold">Order Summary</h2>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span>SubTotal</span>
                              <PriceFormatter amount={getSubTotalPrice()} />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Discount</span>
                              <PriceFormatter
                                amount={getSubTotalPrice() - getTotalPrice()}
                              />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between font-semibold text-lg">
                              <span>Total</span>
                              <PriceFormatter
                                amount={getTotalPrice()}
                                className="text-lg font-bold text-black"
                              />
                            </div>
                            <Separator />
                            <Button
                              className="w-50 sm:w-full rounded-full font-semibold tracking-wide hoverEffect"
                              size="lg"
                              disabled={loading}
                              onClick={handleCheckout}
                            >
                              {loading ? "Please wait..." : "Proceed to Checkout"}
                            </Button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </>

                  : <EmptyCart />
              }
            </Container> :
            <NoAccess />
        }
      </div >
    </>
  )
}
