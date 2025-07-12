import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { getLatestBlogs } from "@/sanity/queries";

export default async function Blog() {

  // const blogs = await getLatestBlogs();

  return (
    <>
      <Container>
        <Title >Blog page</Title>
      </Container>

    </>
  )
}
