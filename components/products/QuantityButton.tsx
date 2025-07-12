// 'use client'
import { Product } from "@/sanity.types"
import useStore from "@/store"
import { Button } from "../ui/button"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export default function QuantityButton({ product, className }: { product: Product, className?: string }) {


  const { addItem, removeItem, getItemCount } = useStore()

  const itemCount = getItemCount(product?._id)

  const isOutOfStock = product?.stock as number === 0



  const handleRemoveProduct = () => {

    removeItem(product?._id)
    if (itemCount < 1) {
      toast(`Product ${product?.name?.substring(0, 12)} removed successfully`)
    }
  }

  const handleAddProduct = () => {
    if ((product?.stock as number) < itemCount) {
      toast("Cannot add more than available stock")
    } else {
      addItem(product)
    }
  }

  return (
    <>
      <div className={cn("flex items-center gap-1  text-base pb-1", className)}>
        <Button
          onClick={handleRemoveProduct}
          variant="outline" size={"icon"} disabled={itemCount === 0 || isOutOfStock} className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect cursor-pointer">
          <Minus />
        </Button>

        <span className="font-semibold text-sm w-6 text-center text-darkColor cursor-pointer">{itemCount}</span>
        <Button
          onClick={handleAddProduct}
          variant="outline" size={"icon"} disabled={itemCount > (product?.stock as number) || isOutOfStock} className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect">
          <Plus />
        </Button>
      </div>
    </>)
}
