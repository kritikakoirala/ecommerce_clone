import { Brand, FETCH_BRANDS_QUERYResult } from "@/sanity.types"
import { Title } from "../ui/text"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

interface Props {
  brands: FETCH_BRANDS_QUERYResult,
  selectedBrand: string | null,
  setSelectedBrand: (brand: string | null) => void
}


export default function BrandList({ brands, selectedBrand, setSelectedBrand }: Props) {
  return (
    <>
      <div className="w-full bg-white p-4">
        <Title className="text-base font-black">Brands</Title>
        <RadioGroup value={selectedBrand || ""} className="mt-4 space-y-1">
          {brands?.map((brand) => (
            <div
              key={brand?._id}
              onClick={() => setSelectedBrand(brand?.slug?.current as string)}
              className="flex items-center space-x-2 hover:cursor-pointer"
            >
              <RadioGroupItem
                value={brand?.slug?.current as string}
                id={brand?.slug?.current}
                className="rounded-sm"
              />
              <Label
                htmlFor={brand?.slug?.current}
                className={`${selectedBrand === brand?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
              >
                {brand?.title}
              </Label>
            </div>
          ))}

        </RadioGroup>

        {

          selectedBrand &&

          <button onClick={() => setSelectedBrand(null)} className="text-shop_dark_green mt-4 text-sm underline font-medium hover:text-shop_light_green hoverEffect">Reset Filters</button>
        }
      </div>
    </>
  )
}
