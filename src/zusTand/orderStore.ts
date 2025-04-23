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

type Room = {
  name: string;
  cost: number;
  total: number;
  from: Date;
  location: string;
  to: Date;
  adults: number;
  children?: number;
  adds: {
    name: string;
    quantity: number;
    cost: number;
  }[];
  rooms: {
    name: string;
    quantity: number;
    cost: number;
  }[];
};
type useOrderStore = {
  orderTour: Tour;
  orderRoom: Room;
  setOrderTour: (tour: Tour) => void;
  setOrderRoom: (room: Room) => void;
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
      orderRoom: {
        name: "",
        cost: 0,
        total: 0,
        location: "",
        from: new Date(),
        to: new Date(),
        adults: 0,
        children: 0,
        adds: [
          {
            name: "",
            quantity: 0,
            cost: 0,
          },
        ],
        rooms: [
          {
            name: "",
            quantity: 0,
            cost: 0,
          },
        ],
      },
      setOrderTour: (tour: Tour) => set({ orderTour: tour }),
      setOrderRoom: (room: Room) => set({ orderRoom: room }),
    }),
    {
      name: "order-tour",
    }
  )
);
