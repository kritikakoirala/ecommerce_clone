import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function dateFormatter(date: Date | undefined): string {

  if (!date) return '';

  const d = new Date(date);
  if (isNaN(d.getTime())) return ''; // Handle invalid date input

  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();

  return `${mm}/${dd}, ${yyyy}`;
}
