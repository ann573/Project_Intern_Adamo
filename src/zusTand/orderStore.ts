import { create } from "zustand";
type Tour = {
  id: string | number,
  from: Date,
  to: Date,
  adults: number,
  children?: number,
}
type useOrderStore = {
  orderTour: Tour,
  setOrderTour: (tour: Tour) => void,
}

export const useOrderStore = create<useOrderStore>((set) => ({
  orderTour: {
    id: '',
    from: new Date(),
    to: new Date(),
    adults: 0,
    children: 0,
  },
  setOrderTour: (tour : Tour) => set({ orderTour: tour }),
}))