'use client'
import { useEffect, useState } from "react"
import HomeTabBar from "./HomeTabBar"
import { productType } from "@/constants/data"
import { client } from "@/sanity/lib/client"
import { AnimatePresence, motion } from 'motion/react'
import { Loader2 } from "lucide-react"
import NoProductAvailable from "./NoProductAvailable"
import { Product } from "@/sanity.types"
import ProductCard from "./ProductCard"
import { FETCH_PRODUCTS_QUERY } from "@/sanity/queries/query"

export default function ProductGrid() {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedtab, setSelectedTab] = useState(productType[0]?.title || "")

  const params = { variant: selectedtab?.toLowerCase() }

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await client.fetch(FETCH_PRODUCTS_QUERY, params)
        setProducts(response)
        setLoading(false)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }


    fetchData()
  }, [selectedtab])


  return (
    <div className="py-10">
      <HomeTabBar selectedTab={selectedtab} setSelectedTab={setSelectedTab} />
      {
        loading ?
          <div className="flex  flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10">
            <div className="space-x-2 flex items-center text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <p>Loading..</p>
            </div>
          </div>

          : products?.length > 0 ?
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
              {
                products?.map((product, index) => {
                  return (

                    <AnimatePresence key={index}>
                      <motion.div>
                        <ProductCard product={product} />
                      </motion.div>
                    </AnimatePresence>

                  )
                })
              }
            </div>

            :
            <NoProductAvailable selectedTab={selectedtab} />
      }
    </div>
  )
}
