'use client'
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { HeartIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FavoriteContainer({ product, className }: { product: Product, className?: string }) {

  const path = usePathname()
  const isParams = path && path?.split('/')[2]
  // console.log()

  const { favoriteProduct, addToFavorite } = useStore()

  const [existing, setExisting] = useState<Product | null>(null)

  useEffect(() => {

    const availableProduct = favoriteProduct?.find((item) => item?._id === product?._id)

    setExisting(availableProduct || null)

  }, [product, favoriteProduct])

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e?.preventDefault()

    if (product?._id) {
      addToFavorite(product).then(() => {
        return toast(existing ? 'Product removed successfully' : 'Product Added Successfully')
      })
    }
  }

  return (
    <>
      <div className={cn(`absolute ${isParams === product?.slug?.current ? 'right-5' : 'top-2 right-2'}  z-10 hover:cursor-pointer`, className)}>
        <button
          onClick={handleFavorite}
          className={`p-2.5 bg-red rounded-full hover:bg-shop_dark_green
          hover:text-white
          hoverEffect ${existing ? 'bg-shop_dark_green/80 text-white' : 'bg-shop_light_bg'}`}>
          <HeartIcon size={15} />
        </button>
      </div >
    </>
  )
}
