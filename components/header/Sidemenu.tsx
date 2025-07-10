import { X } from "lucide-react"
import { headerData } from "@/constants/data"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useOutsideClick } from "@/hook"
import Logo from "../Logo"
import SocialMedia from "../SocialMedia"

interface SidebarProps {
  isOpen: boolean,

  onClose: () => void
}

export default function SideMenu(
  {
    isOpen,
    onClose
  }: SidebarProps
) {

  const path = usePathname()
  const sidebarRef = useOutsideClick(onClose)

  return (
    <div className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 shadow-xl
    ${isOpen ? ' translate-x-0' : '-translate-x-full'} hoverEffect`}>
      <div className="min-w-72 max-w-96 bg-black h-screen p-10 border-r border-r-shop_light_green flex flex-col gap-6">
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          <button className="text-white hover:text-shop_light_green hoverEffect " onClick={onClose}>
            <X />
          </button>
        </div>

        <div ref={sidebarRef} className="flex flex-col space-y-3.5 font-semibold tracking-wider text-white ">
          {
            headerData?.map((item, index) => {
              return (
                <Link href={item?.href} key={index}
                  className={`${item?.href === path && 'text-shop_light_green'} hover:text-shop_light_green`}>{item?.title} </Link>
              )
            })
          }
        </div>

        <div>
          <SocialMedia />
        </div>
      </div>
    </div>
  )
}
