import { create } from "zustand";
import { persist } from "zustand/middleware";

type Tour = {
  cost: number;
  title: string;
  location: string;
  duration: number;
  type: string;
  total: number;
  from: Date;
  to: Date;
  adults: number;
  children?: number;
};
type useOrderStore = {
  orderTour: Tour;
  setOrderTour: (tour: Tour) => void;
};

export const useOrderStore = create<useOrderStore>()(
  persist(
    (set) => ({
      orderTour: {
        cost: 0,
        title: "",
        location: "",
        duration: 0,
        type: "",
        total: 0,
        from: new Date(),
        to: new Date(),
        adults: 0,
        children: 0,
      },
      setOrderTour: (tour: Tour) => set({ orderTour: tour }),
    }),
    {
      name: "order-tour",
    }
  )
);
