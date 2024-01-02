import { create } from "zustand";

export const useModal = create((set) => ({
  show: false,
  content: null,
  showModal: (content) => set(() => ({ show: true, content })),
  hideModal: () => set(() => ({ show: false })),
}));
