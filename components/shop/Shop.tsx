'use client'

import { Brand, Category, FETCH_BRANDS_QUERYResult, Product } from "@/sanity.types"
import Container from "../Container"
import { Title } from "../ui/text"
import CategoryList from "./CategoryList"
import BrandList from "./BrandList"
import { useEffect, useState } from "react"
import PriceList from "./PriceList"
import { client } from "@/sanity/lib/client"
import ProductCard from "../products/ProductCard"
import { Loader2 } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import NoProductAvailable from "../products/NoProductAvailable"
import { useParams, useSearchParams } from "next/navigation"


export default function Shop({ categories, brands }: { categories: Category[], brands: FETCH_BRANDS_QUERYResult }) {

  const searchParams = useSearchParams()
  const brandParams = searchParams?.get("brand");


  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParams || null)
  const [loading, setLoading] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)


  const fetchProducts = async () => {

    setLoading(true)

    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }


      const query = `
      *[_type == 'product'
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
        && price >= $minPrice && price <= $maxPrice
      ]
      | order(name asc) {
        ...,"categories": categories[]->title
      }
    `;
      const data = await client.fetch(
        query,
        { selectedCategory, selectedBrand, minPrice, maxPrice },
        { next: { revalidate: 0 } }
      );

      setProducts(data);
      setLoading(false)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPrice]);


  return (
    <>
      <div className="border-t ">
        <Container className="mt-5">
          <div className="sticky top-0 z-10 mb-5">
            <div className="flex justify-between items-center">
              <Title className="text-lg uppercase teacking-wide">Get the products as your needs
              </Title>

              {
                (selectedCategory !== null ||
                  selectedBrand !== null ||
                  selectedPrice !== null) &&

                <button onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }} className="text-shop_dark_green mt-2 text-md underline font-medium hover:text-shop_light_green hoverEffect">Reset Filters</button>
              }
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50">
            <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-60px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop_btn_dark_green/50 scrollbar-hide">

              <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              <BrandList
                brands={brands}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand} />

              <PriceList
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
              />
            </div>
            <div className="flex-1 pt-5">
              <div className=" overflow-y-auto pr-2 scrollbar-hide">
                {loading ?
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
                                <ProductCard key={product?._id} product={product} />
                              </motion.div>
                            </AnimatePresence>

                          )
                        })
                      }
                    </div>

                    :
                    <NoProductAvailable className="bg-white mt-0" />
                }
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
