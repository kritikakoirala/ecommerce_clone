'use client'
import { Product } from "@/sanity.types";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import { toast } from "sonner"
import PriceFormatter from "./PriceFormatter";
import QuantityButton from "./QuantityButton";


export default function AddToCartButton({ product, className }: { product: Product, className?: string }) {

  const { addItem, getItemCount } = useStore()

  const itemCount = getItemCount(product?._id)

  const isOutOfStock = product?.stock === 0 as number

  const handleClick = () => {

    if (!isOutOfStock) {
      addItem(product)
      toast("Item added to cart.")

    } else {
      toast("Cannot add more than available stock.")

    }
  }
  return (
    <div className="w-full h-12 flex items-center">
      {
        itemCount > 0 ?
          <div className="text-sm w-full ">
            <div className="flex items-center justify-between pt-2 pb-2">
              <span className="text-xs font-semibold text-darkColor/60">Quanitity</span>
              <QuantityButton product={product} />
            </div>

            <div className="flex items-center justify-between border-t py-2">
              <span className="text-xs font-semibold">Subtotal</span>
              <PriceFormatter amount={product?.price ? product?.price * itemCount : 0} />
            </div>
          </div>

          :
          <Button

            className={cn(
              "w-100 bg-shop_dark_green/80 text-lightBg shadow-none border border-shop_dark_green/80 font-semibold tracking-wide text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect",
              className
            )}

            disabled={isOutOfStock}

            onClick={handleClick}

          >
            <ShoppingBag />

            {
              isOutOfStock ? 'Out Of Stock' : 'Add to Cart'
            }
          </Button>
      }

    </div>
  )
}
