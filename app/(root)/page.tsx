import ShopByBrands from "@/components/brands/ShopByBrands";
import HomeCategories from "@/components/categories/HomeCategories";
import Container from "@/components/Container";
import HomeBanner from "@/components/homepage/HomeBanner";
import LatestBlog from "@/components/blog/LatestBlog";
import ProductGrid from "@/components/products/ProductGrid";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Container>
        <HomeBanner />
        <ProductGrid />
        <HomeCategories />
        <ShopByBrands />
        <LatestBlog />
      </Container>
    </>
  );
}
