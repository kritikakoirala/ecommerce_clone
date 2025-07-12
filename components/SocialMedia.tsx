import { Facebook, Github, Linkedin, Slack, Youtube } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";


interface SocialProps {
  className?: string,
  iconClassName?: string,
  tooltipClassName?: string
}

const socialLinks = [
  {
    title: "Youtube",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "Github",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: "Slack",
    href: "https://www.youtube.com/@reactjsBD",
    icon: <Slack className="w-5 h-5" />,
  },
];

export default function SocialMedia({ className, iconClassName, tooltipClassName }: SocialProps) {

  return (
    <>
      <div className={cn("flex items-center gap-3.5", className)}>
        {
          socialLinks?.map((link, index) => {
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link href={link?.href} target="_blank" className={cn("p-2 border rounded-full text-white hover:border-shop_light_green hover:text-shop_light_green hoverEffect", iconClassName)}>
                    {link?.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent className={cn("bg-shop_light_green text-white font-semibold", tooltipClassName)} >
                  <Link href={link?.href} target="_blank" >{link?.title}</Link>
                </TooltipContent>
              </Tooltip>

            )
          })
        }
      </div>
    </>
  )
}
