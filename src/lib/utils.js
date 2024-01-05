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
  const threshold = 0.5;

  return randomValue < threshold ? true : false;
};

export const formatIDR = (balance) => {
  const format = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (typeof balance === "string") {
    const parsedBalance = parseInt(balance);
    const formatted = format.format(parsedBalance);
    return formatted;
  }

  return format.format(balance);
};
