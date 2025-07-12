import Container from "@/components/Container"
import { Title } from "@/components/ui/text"

export default async function BlogDetail({ params }: { params: Promise<{ blogId: string }> }) {

  const blog = await params
  return (
    <>

      <Container>
        <Title> Single Blog Page</Title>
      </Container>
    </>
  )
}
