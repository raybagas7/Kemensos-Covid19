import { create } from "zustand";

export const useModal = create((set) => ({
  show: false,
  content: null,
  showUpSlide: false,
  contentUpslide: null,
  showModal: (content) => set(() => ({ show: true, content })),
  hideModal: () => set(() => ({ show: false })),
  showModalUpSlide: (contentUpslide) =>
    set(() => ({ showUpSlide: true, contentUpslide })),
  hideModalUpSlide: () => set(() => ({ showUpSlide: false })),
}));
