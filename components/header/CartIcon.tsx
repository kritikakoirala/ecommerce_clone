'use client'
import useStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {

  const { items } = useStore()

  return (
    <>
      <Link href={'/cart'} className="group relative">
        <ShoppingBag className="h-5 w-5 hover:text-shop_light_green hoverEffect" />
        <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs flex items-center justify-center ">

          {items?.length ? items?.length : 0}
        </span>
      </Link>
    </>

  )
}
