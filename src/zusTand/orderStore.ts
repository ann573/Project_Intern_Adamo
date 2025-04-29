import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Tour = {
  id: number
  cost: number
  title: string
  location: string
  duration: number
  type: string
  total: number
  from: Date
  to: Date
  adults: number
  children?: number
}

type Room = {
  name: string
  cost: number
  total: number
  from: Date
  location: string
  to: Date
  adults: number
  children?: number
  adds: {
    name: string
    quantity: number
    cost: number
  }[]
  rooms: {
    id: number
    name: string
    quantity: number
    cost: number
  }[]
}

type useOrderStore = {
  orderTour: Tour
  orderRoom: Room
  isInitial: boolean
  setOrderTour: (tour: Tour) => void
  setOrderRoom: (room: Room) => void
  clearOrderTour: () => void
  clearOrderRoom: () => void
}

const initialOrderTourState: Tour = {
  id: 0,
  cost: 0,
  title: '',
  location: '',
  duration: 0,
  type: '',
  total: 0,
  from: new Date(),
  to: new Date(),
  adults: 0,
  children: 0
}

const initialOrderRoomState: Room = {
  name: '',
  cost: 0,
  total: 0,
  location: '',
  from: new Date(),
  to: new Date(),
  adults: 0,
  children: 0,
  adds: [
    {
      name: '',
      quantity: 0,
      cost: 0
    }
  ],
  rooms: [
    {
      id: 0,
      name: '',
      quantity: 0,
      cost: 0
    }
  ]
}
export const useOrderStore = create<useOrderStore>()(
  persist(
    (set) => ({
      orderTour: initialOrderTourState,
      orderRoom: initialOrderRoomState,
      isInitial: true,
      setOrderTour: (tour: Tour) => set({ orderTour: tour, isInitial: false }),
      setOrderRoom: (room: Room) => set({ orderRoom: room, isInitial: false }),
      clearOrderTour: () => set({ orderTour: initialOrderTourState, isInitial: true }),
      clearOrderRoom: () => set({ orderRoom: initialOrderRoomState, isInitial: true })
    }),
    {
      name: 'order-tour'
    }
  )
)
