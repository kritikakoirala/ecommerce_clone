'use client'
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderMenu() {

  const path = usePathname();

  return (
    <>
      <div className="hidden md:flex items-center justify-center capitalize text-sm font-semibold text-lightColor gap-8">
        {
          headerData?.map((data, index) => {
            return (
              <Link key={index} href={data?.href}
                className={`hover:text-shop_light_green hoverEffect relative group ${path === data?.href && 'text-shop_light_green'}`}
              >
                {data?.title}
                <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-shop_light_green group-hover:w-1/2 hoverEffect group-hover:left-0 ${path === data?.href && 'w-1/2'}`} />
                <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-shop_light_green group-hover:w-1/2 hoverEffect group-hover:right-0 ${path === data?.href && 'w-1/2'}`} />
              </Link>
            )
          })
        }
      </div>
    </>
  )
}
