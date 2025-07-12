import Container from "@/components/Container"
import ProductCard from "@/components/products/ProductCard"
import { Title } from "@/components/ui/text"
import { FETCH_HOT_DEALS_QUERYResult } from "@/sanity.types"
import { getHotDeals } from "@/sanity/queries"

export default async function HotDeals() {

  const products: FETCH_HOT_DEALS_QUERYResult = await getHotDeals()
  return (
    <div className="py-10 bg-deal-bg">
      <Container className="">
        <Title className="mb-5 underline underline-offset-4 decoration-1 text-base uppercase tracking-wide">Hot Deals of the week</Title>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {
            products?.map((product) => {
              return (
                <ProductCard key={product?._id} product={product} />
              )
            })
          }
        </div>
      </Container>
    </div>
  )
}
