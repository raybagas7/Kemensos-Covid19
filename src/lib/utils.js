import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const convertDateToMilis = (dateString) => {
  const date = new Date(dateString);
  return date.getTime();
};
