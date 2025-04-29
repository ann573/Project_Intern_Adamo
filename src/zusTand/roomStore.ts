import { create } from 'zustand'

type Room = {
  id: number
  name: string
  acreage: string
  beds: string
  guest: number
  description: string
  price: number
  price_discount: number
  isAvailable: boolean
  facilities: string[]
  count: number
}

type RoomStore = {
  rooms: Room[]
  setRooms: (rooms: Room[]) => void
  incrementRoom: (name: string) => void
  decrementRoom: (name: string) => void
  setRoomCount: (name: string, count: number) => void
  getMaxNumber: () => number
  clearRoom: () => void
}

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  incrementRoom: (name) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.name === name && room.isAvailable ? { ...room, count: room.count + 1 } : room
      )
    })),
  decrementRoom: (name) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.name === name && room.isAvailable && room.count > 0 ? { ...room, count: room.count - 1 } : room
      )
    })),
  setRoomCount: (name, count) =>
    set((state) => ({
      rooms: state.rooms.map((room) => (room.name === name ? { ...room, count } : room))
    })),

  getMaxNumber: () => {
    const maxNumber = get().rooms.reduce((acc, room) => {
      if (room.count > 0) {
        acc += room.guest
      }
      return acc
    }, 0)
    return maxNumber
  },
  clearRoom: () => set({ rooms: [] })
}))
