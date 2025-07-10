import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function dateFormatter(date: string) {

  let formattedDate = new Date(date)

  // console.log(formattedDate.toDateString())

  return formattedDate.toDateString()
}
