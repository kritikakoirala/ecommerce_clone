import { productType } from "@/constants/data";
import Link from "next/link";


interface SelectedTabType {
  selectedTab: string,
  setSelectedTab: (tab: string) => void;
}

export default function HomeTabBar({ selectedTab, setSelectedTab }: SelectedTabType) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center gap-3 text-sm font-semibold">
        {
          productType?.map((data, index) => {
            return (
              <button key={index} className={`border border-shop_light_green/20 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect ${selectedTab === data?.title ? "bg-shop_light_green text-white border-shop_light_green" : 'bg-shop_light_green/20'}`}
                onClick={() => setSelectedTab(data?.title)}
              >{data?.title}</button>
            )
          })
        }
      </div>
      <Link href={'/shop'} className={`border border-shop_light_green/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop_light_green hover:border-shop_light_green hover:text-white hoverEffect`}>See all</Link>
    </div>
  )
}
