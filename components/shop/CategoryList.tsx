import { Category } from "@/sanity.types"
import { Title } from "../ui/text"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";


interface Props {
  categories: Category[],
  selectedCategory: string | null,
  setSelectedCategory: (category: string | null) => void
}

export default function CategoryList({ categories, selectedCategory, setSelectedCategory }: Props) {
  return (
    <>

      <div className="w-full bg-white p-4">
        <Title className="text-base font-black">Product Categories</Title>
        <RadioGroup value={selectedCategory || ""} className="mt-4 space-y-1">
          {categories?.map((category) => (
            <div
              onClick={() => {
                setSelectedCategory(category?.slug?.current as string);
              }}
              key={category?._id}
              className="flex items-center space-x-2 hover:cursor-pointer"
            >
              <RadioGroupItem
                value={category?.slug?.current as string}
                id={category?.slug?.current}
                className="rounded-sm"
              />
              <Label
                htmlFor={category?.slug?.current}
                className={`${selectedCategory === category?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
              >
                {category?.title}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {

          selectedCategory &&

          <button onClick={() => setSelectedCategory(null)} className="text-shop_dark_green mt-4 text-sm underline font-medium hover:text-shop_light_green hoverEffect">Reset Filters</button>
        }
      </div>
    </>
  )
}
