'use client'

import { Category, Product } from "@/sanity.types"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { client } from "@/sanity/lib/client";
import { FETCH_PRODUCTS_BY_CATEGORY } from "@/sanity/queries/query";
import ProductCard from "../products/ProductCard";
import NoProductAvailable from "../products/NoProductAvailable";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";



export default function CategoryProduct(
  { categories, slug }: {
    categories: Category[],
    slug: string | undefined
  }
) {

  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = (slug: string | undefined) => {

    console.log("@slug", slug)
    console.log("@currentSlug", currentSlug)

    console.log(slug)

    if (slug === currentSlug) return;
    setCurrentSlug(slug)

    return router.push(`/category/${currentSlug}`, { scroll: false })
  }

  const getProductsByCategory = async (categorySlug: string | undefined) => {
    setLoading(true)

    try {

      const data = await client.fetch(FETCH_PRODUCTS_BY_CATEGORY, { categorySlug })

      return data ? setProducts(data ?? []) : []


    } catch (error) {
      console.error("Error fetching products", error)
      setProducts([])
      setLoading(false)

      return []
    }
  }

  useEffect(() => {
    getProductsByCategory(currentSlug)
  }, [router])


  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <div className="flex flex-col md:min-w-40 border rounded-md hoverEffect">
        {categories?.length > 0 && categories?.map(item => {
          return <Button
            onClick={() => handleClick(item?.slug?.current)}
            key={item?._id}
            className={` bg-transparent border-0 rounded-none text-darkColor shadow-none hover:bg-shop_orange hover:text-white font-semibold hoverEffect border-b last:border-b-0 transition-colors capitalize ${item?.slug?.current === currentSlug && "bg-shop_orange text-white border-shop_orange   "}`}
          >
            <p className="w-full text-left text-sm">{item?.title}</p>
          </Button>
        })}
      </div>

      <div className="flex-1">
        {
          loading ?
            <div className="flex  flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full">
              <div className="space-x-2 flex items-center text-shop_dark_green">
                <Loader2 className="w-5 h-5 animate-spin" />
                <p className="text-sm font-semibold">Product is Loading..</p>
              </div>
            </div>

            :
            products?.length > 0 ?
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {
                  products?.map((product, index) => {
                    return (

                      <AnimatePresence key={index}>
                        <motion.div>
                          <ProductCard key={index} product={product} />
                        </motion.div>
                      </AnimatePresence>

                    )
                  })
                }
              </div>
              :
              <NoProductAvailable selectedTab={currentSlug} className="mt-0" />

        }
      </div>
    </div>
  )
}
