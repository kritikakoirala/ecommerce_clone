import Link from "next/link";
import { Title } from "../ui/text";
import { getBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Brand } from "@/sanity.types";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";


const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 27/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];

export default async function ShopByBrands() {

  const brands = await getBrands()

  return (
    <div className="mb-10 lg:mb-20 bg-shop_light_bg p-5 lg:p-7 rounded-md">
      <div className="flex items-center justify-between gap-5">
        <Title>Shop By Brands</Title>
        <Link href={'/shop'} className="font-semibold  text-sm tracking-wide hover:text-shop_dark_green hoverEffect">View all</Link>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3 py-5">
        {
          brands?.map((brand: Brand) => {
            return (
              <Link

                href={{ pathname: 'shop', query: { brand: brand?.slug?.current } }}
                key={brand?._id} className="bg-shop_light_bg flex items-center gap-2 group overflow-hidden bg-white rounded-md w-34 h-24 flex items-center justify-center hover:shadow-lg hover:shadow-shop_dark_green/20 hoverEffect">
                {
                  brand?.image &&

                  <Image src={urlFor(brand?.image).url()} alt="Category image" width={250} height={250} className="w-full h-full object-contain group-hover:scale-110 hoverEffect" />
                }
              </Link>
            )
          })
        }
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm hover:shadow-shop_light_green/20 py-5">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group text-lightColor hover:text-shop_light_green"
          >
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-darkColor/80 font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-lightColor">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
