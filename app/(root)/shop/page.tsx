import Shop from "@/components/shop/Shop"
import { getBrands, getCategories } from "@/sanity/queries"


export default async function ShopPage() {

  const categories = await getCategories()
  const brands = await getBrands()


  return (
    <>
      <Shop categories={categories} brands={brands} />
    </>
  )
}
