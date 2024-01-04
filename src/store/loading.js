import { create } from "zustand";

export const useLoading = create((set) => ({
  show: false,
  looadingSm: false,
  showLoading: () => set(() => ({ show: true })),
  hideLoading: () => set(() => ({ show: false })),
  showLoadingSm: () => set(() => ({ looadingSm: true })),
  hideLoadingSm: () => set(() => ({ looadingSm: false })),
}));
