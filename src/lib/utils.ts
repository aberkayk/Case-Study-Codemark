import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstChar = (value?: string) => {
  if (!value) return "";
  return value.substring(0, 1);
};
