import { getCategories } from "@/sanity/queries";
import { Title } from "../ui/text";
import { FETCH_CATEGORYResult } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export default async function HomeCategories() {
  const categories: FETCH_CATEGORYResult = await getCategories(6)
  return (
    <>
      <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
        <Title className="border-b pb-3">Popular Categories</Title>

        <div className="mt-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {
            categories?.map((category) => {
              return (
                <div key={category?._id} className="bg-shop_light_bg p-5 flex items-center gap-3 group">
                  {
                    category?.image &&

                    <div className="overflow-hidden border border-shop_orange/20 hover:border-shop_orange w-20 h-20 p-1">
                      <Link
                        href={`/category/${category?.slug?.current}`}

                      >
                        <Image src={urlFor(category?.image).url()} alt="Category image" width={500} height={500} className="w-full h-full object-contain group-hover:scale-110 hoverEffect" />
                      </Link>
                    </div>


                  }

                  <div className="space-y-1">
                    <h3 className="text-base font-semibold">{category?.title}</h3>
                    <p className="text-sm "><span className="font-bold text-shop_dark_green">{`(${category?.productCount})`}</span>{" "} items available</p>
                  </div>

                </div>


              )
            })
          }
        </div>

      </div>
    </>)
}
