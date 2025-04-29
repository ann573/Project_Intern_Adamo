import { useDetailHotels } from "@/hooks/hotels";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRoomStore } from "@/zusTand/roomStore";
import { Button } from "@components/ui/button";
import React, { useEffect } from "react";
import ImageSlider from "../detailTour/ImageSlide";

const DescriptionHotel = ({ id }: { id: string }) => {
  const { t } = useTranslation("hotel");
  const { data } = useDetailHotels(id);

  const { rooms, setRooms, setRoomCount } = useRoomStore();

  useEffect(() => {
    if (data && data.description?.room && rooms.length === 0) {
      setRooms(
        data.description.room.map((room) => ({
          count: 0,
          ...room,
        }))
      );
    }
  }, [data, setRooms, rooms.length]);
  return (
    <>
      <h3 className="font-bold my-5 text-xl">{t("select.room")}</h3>

      {rooms.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div className="my-5 flex sm:flex-row flex-col gap-5 bg-[#F8F8F8] dark:bg-[#373636]">
              <div>
                <img
                  src={`https://picsum.photos/seed/${index}/200`}
                  alt="image_room"
                  className=" w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <Dialog>
                <div className="w-full p-5 flex-col">
                  <DialogTrigger asChild>
                    <h3 className="text-heading-second text-xl font-semibold cursor-pointer hover:underline">
                      {item.name}
                    </h3>
                  </DialogTrigger>

                  <div className="flex justify-between flex-wrap text-color-content-second">
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
                          ? item.count > 0
                            ? "bg-primary text-white px-10"
                            : `border border-primary bg-transparent text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors`
                          : `bg-[#223143] text-white`
                      }`}
                      onClick={() =>
                        item.count === 0 && setRoomCount(item.name, 1)
                      }
                    >
                      {item.isAvailable
                        ? item.count > 0
                          ? t("select.selected")
                          : t("select.selectBtn")
                        : t("select.out")}
                    </button>
                  </div>
                </div>
                <DialogContent className="sm:w-[90%] sm:max-w-[2000px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{item.name}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="grid md:grid-cols-2 grid-cols-1 gap-10 text-black">
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
                        <Button
                          className={`px-8 py-2 ${
                            item.isAvailable
                              ? item.count > 0
                                ? "bg-primary text-white px-10"
                                : `border border-primary bg-transparent text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors`
                              : `bg-[#223143] text-white`
                          }`}
                          onClick={() =>
                            item.count === 0 && setRoomCount(item.name, 1)
                          }
                        >
                          {item.isAvailable
                            ? item.count > 0
                              ? "Selected"
                              : "Select Room"
                            : "Out of room"}
                        </Button>
                      </div>
                      <ImageSlider />
                    </div>
                    {/* ============================= */}
                    <div>
                      <div className="flex justify-between text-color-content-second gap-4">
                        {/* =========== */}
                        <div className="flex gap-2 items-center">
                          <i className="ri-shape-line text-xl dark:text-[#c2c1c0]"></i>
                          <p className="text-[#0069E4] dark:text-[#60a5f5]">{item.acreage} m2</p>
                        </div>

                        {/* =========== */}
                        <div className="flex gap-2 items-center">
                          <i className="ri-hotel-bed-line text-3xl dark:text-[#c2c1c0]"></i>
                          <p className="text-[#0069E4] dark:text-[#60a5f5]">{item.beds}</p>
                        </div>

                        {/* =========== */}
                        <div className="flex gap-2 items-center">
                          <i className="ri-group-line text-xl dark:text-[#c2c1c0]"></i>
                          <p className="text-[#0069E4] dark:text-[#60a5f5]">{item.guest} Guest</p>
                        </div>
                      </div>

                      <hr className="my-3" />

                      <p className="text-heading leading-8">
                        {item.description}
                      </p>

                      <hr className="my-3" />

                      <h3 className="font-bold text-lg mb-5 text-heading">
                        Room Facilities:{" "}
                      </h3>
                      <div className="max-h-80 overflow-y-auto columns-2">
                        {item.facilities.map((item) => {
                          return (
                            <div
                              key={item}
                              className="flex gap-2 items-center  mb-2 "
                            >
                              <i className="ri-check-line text-green-500"></i>
                              <p className="dark:text-content-second">{item}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default DescriptionHotel;
