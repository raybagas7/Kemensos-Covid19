import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const convertDateToMilis = (dateString) => {
  const date = new Date(dateString);
  return date.getTime();
};

export const randomSuccessPost = () => {
  const randomValue = Math.random();
  const threshold = 0.7;

  return randomValue < threshold ? true : false;
};
