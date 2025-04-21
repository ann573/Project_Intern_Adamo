import { useDetailHotels } from "@/hooks/hotels";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@components/ui/button";
import ImageSlider from "../detailTour/ImageSlide";
import { useEffect } from "react";
import { useRoomStore } from "@/zusTand/roomStore";
const DescriptionHotel = ({ id }: { id: string }) => {

  const { data } = useDetailHotels(id);

     // Zustand room state
     const { rooms, setRooms, setRoomCount } = useRoomStore();

     useEffect(() => {
      if (data && data.description?.room && rooms.length === 0) {
        setRooms( 
          data.description.room.map((room) => ({
            count: 0,
            ...room
          }))
        );
      }
    }, [data, setRooms, rooms.length]);
  console.log(data);
  return (
    <>
      <h3 className="font-bold my-5 text-xl">Rooms</h3>

      {rooms.map((item, index) => {
        return (
          <>
            <div className="my-5 flex gap-5 bg-[#F8F8F8]" key={index}>
              <div>
                <img
                  src={`https://picsum.photos/seed/${index}/200`}
                  alt="image_room"
                  className="max-h-[200px] w-full h-full object-cover"
                />
              </div>
              <Dialog>
                <div className="w-full p-5 flex-col">
                  <DialogTrigger asChild>
                    <h3 className="text-[#2A2A2A] text-xl font-semibold cursor-pointer hover:underline">
                      {item.name}
                    </h3>
                  </DialogTrigger>

                  <div className="flex justify-between text-[#4F4F4F]">
                    {/* =========== */}
                    <div className="flex gap-2 items-center">
                      <i className="ri-shape-line text-xl"></i>
                      <p>{item.acreage} m2</p>
                    </div>

                    {/* =========== */}
                    <div className="flex gap-2 items-center">
                      <i className="ri-hotel-bed-line text-3xl"></i>
                      <p>{item.beds}</p>
                    </div>

                    {/* =========== */}
                    <div className="flex gap-2 items-center">
                      <i className="ri-group-line text-xl"></i>
                      <p>{item.guest} Guest</p>
                    </div>
                  </div>

                  <div className="text-sub-color-primary my-5">
                    {Array.isArray(item.facilities) && (
                      <>
                        {item.facilities.slice(0, 4).map((facility, index) => (
                          <span key={index}>
                            {facility}
                            {index < Math.min(3, item.facilities.length - 1) &&
                              " • "}
                          </span>
                        ))}
                        {item.facilities.length > 4 && (
                          <span>
                            {" "}
                            •{" "}
                            <span className="text-[#04316A] font-semibold">
                              {item.facilities.length - 4} more
                            </span>
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  <div>
                    <button
                      className={`px-8 py-2 ${
                        item.isAvailable
                          ?  item.count > 0 ? "bg-primary text-white px-10" : `border border-primary bg-transparent text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors`
                          : `bg-[#223143] text-white`
                      }`}
                      onClick={() => (item.count === 0 && setRoomCount(item.name, 1))}
                    >
                      {item.isAvailable ? item.count > 0 ?"Selected" : "Select Room" : "Out of room"}
                    </button>
                  </div>
                </div>
                <DialogContent className="min-w-[1000px]">
                  <DialogHeader>
                    <DialogTitle>{item.name}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="grid grid-cols-2 gap-10 text-black">
                    <div>
                      <div className="flex justify-between items-center mb-5">
                        <div className="text-xs text-[#5E6D77]">
                          <span className="line-through">${item.price}</span>
                          <span className="text-red-500 text-xl font-bold">
                            {" "}
                            ${item.price_discount}
                          </span>{" "}
                          /night
                        </div>
                        <Button className="rounded-none ">{item.isAvailable ? item.count > 0 ?"Selected" : "Select Room" : "Out of room"} </Button>
                      </div>
                      <ImageSlider />
                    </div>
                    {/* ============================= */}
                    <div>
                      <div className="flex justify-between text-[#4F4F4F]">
                        {/* =========== */}
                        <div className="flex gap-2 items-center">
                          <i className="ri-shape-line text-xl"></i>
                          <p className="text-[#0069E4]">{item.acreage} m2</p>
                        </div>

                        {/* =========== */}
                        <div className="flex gap-2 items-center">
                          <i className="ri-hotel-bed-line text-3xl"></i>
                          <p className="text-[#0069E4]">{item.beds}</p>
                        </div>

                        {/* =========== */}
                        <div className="flex gap-2 items-center">
                          <i className="ri-group-line text-xl"></i>
                          <p className="text-[#0069E4]">{item.guest} Guest</p>
                        </div>
                      </div>

                      <hr className="my-3" />

                      <p className="text-[#1E1E1E] leading-8">
                        {item.description}
                      </p>

                      <hr className="my-3" />

                      <h3 className="font-bold text-lg mb-5">Room Facilities: </h3>
                      <div className="max-h-80 overflow-auto columns-2 flex-wrap">
                        {item.facilities.map(item => {
                          return (
                            <div key={item} className="flex gap-2 items-center break-inside-avoid mb-2">
                              <i className="ri-checkbox-circle-line text-[#0069E4]"></i>
                              <p>{item}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                      
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
          </>
        );
      })}
    </>
  );
};

export default DescriptionHotel;
