'use client'
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Favorite({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) {

  const { favoriteProduct, addToFavorite } = useStore()

  return (
    <>
      {!showProduct ? <Link href={'wishlist'} className="group relative">
        <Heart className="h-5 w-5 hover:text-shop_light_green hoverEffect" />
        <span className="absolute -top-1 -right-1 bg-shop_dark_green text-white h-3.5 w-3.5 rounded-full text-xs flex items-center justify-center ">

          {favoriteProduct?.length || 0}
        </span>
      </Link> :

        <button className="group relative hover:text-shop_light_green hoverEffect border border-shop_light_green/80 hover:border-shop_light_green p-1.5 rounded-sm"
        >
          <Heart className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-.5 w-5 h-5" />

        </button>
      }
    </>
  )
}
