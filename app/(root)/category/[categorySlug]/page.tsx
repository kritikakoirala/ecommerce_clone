import Container from "@/components/Container"
import { Title } from "@/components/ui/text"
import { FETCH_CATEGORYResult } from "@/sanity.types"
import { getCategories } from "@/sanity/queries"
import dynamic from 'next/dynamic'
const CategoryProduct = dynamic(() => import("../../../../components/categories/CategoryProducts"))



export default async function CategoryDetail({ params }: { params: Promise<{ categorySlug: string }> }) {


  const { categorySlug } = await params
  const categories: FETCH_CATEGORYResult = await getCategories()

  return (
    <div className="py-10">
      <Container>
        <Title>Products By Category: <span className="text-shop_light_green">{categorySlug}</span></Title>
        <CategoryProduct categories={categories} slug={categorySlug} />
      </Container>
    </div>
  )
}
