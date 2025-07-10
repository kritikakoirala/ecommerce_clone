import Container from "@/components/Container"
import ProductCard from "@/components/ProductCard"
import { Title } from "@/components/ui/text"
import { Product } from "@/sanity.types"
import { getHotDeals } from "@/sanity/queries"

export default async function HotDeals() {

  const deals = await getHotDeals()
  return (
    <div className="py-10 bg-deal-bg">
      <Container className="">
        <Title className="mb-5 underline underline-offset-4 decoration-1 text-base uppercase tracking-wide">Hot Deals of the week</Title>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {
            deals?.map((deal: Product, index: number) => {
              return (
                <ProductCard key={index} product={deal} />
              )
            })
          }
        </div>
      </Container>
    </div>
  )
}
