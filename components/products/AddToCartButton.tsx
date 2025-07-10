import { Product } from "@/sanity.types";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AddToCartButton({ product, className }: { product: Product, className?: string }) {


  const isOutOfStock = product?.stock === 0
  return (
    <>
      <Button className={cn(
        "w-full bg-shop_dark_green/80 text-lightBg shadow-none border border-shop_dark_green/80 font-semibold tracking-wide text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect",
        className
      )}>
        <ShoppingBag />

        {
          isOutOfStock ? 'Out Of Stock' : 'Add to Cart'
        }
      </Button>
    </>
  )
}
