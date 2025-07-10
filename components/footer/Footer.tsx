import { categoriesData, quickLinksData } from "@/constants/data"
import Container from "../Container"
import Logo from "../Logo"
import SocialMedia from "../SocialMedia"
import { SubText, SubTitle } from "../ui/text"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import FooterTop from "./FooterTop"


export default function Footer() {

  return (

    <footer className="bg-white border-t ">
      <Container className='px-6'>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText className="">  Discover curated furniture collections at Shopcartyt, blending
              style and comfort to elevate your living spaces.</SubText>

            <SocialMedia className="text-darkColor/60"
              iconClassName="border-darkColor text-black"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>
          <div>
            <SubTitle>Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {
                quickLinksData?.map((data, index) => {
                  return (

                    <li key={index}>

                      <Link href={data?.href} className="hover:text-shop_light_green hoverEffect font-medium">{data?.title}</Link>
                    </li>)
                })
              }
            </ul>
          </div>
          <div>
            <SubTitle>Categories</SubTitle>
            <ul className="space-y-3 mt-4">
              {
                categoriesData?.map((data, index) => {
                  return (

                    <li key={index}>

                      <Link href={`/${data?.href}`} className="hover:text-shop_light_green hoverEffect font-medium">{data?.title}</Link>
                    </li>)
                })
              }
            </ul>
          </div>
          <div className="space-y-4">
            <SubTitle>NewsLetter</SubTitle>
            <SubText>Subscribe to our newsletter to recieve updates and exclusive offers</SubText>

            <form className="space-y-3">
              <Input placeholder="Enter your Email" type="email" required />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="py-6 border-t text-center text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()} <Logo className="text-sm" />. All
            rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  )
}
