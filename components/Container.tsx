import { cn } from "@/lib/utils";

export default function Container(
  { children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("max-w-screen-xl mx-auto", className)}>

      {children}
    </div>
  )
}
