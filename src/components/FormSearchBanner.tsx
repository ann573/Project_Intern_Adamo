import { getFilterTour } from "@features/tour/tourAction";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/app";
import { Button } from "@components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { SelectSingleEventHandler } from "react-day-picker";

type Props = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const FormSearchBanner = ({ date, setDate }: Props) => {
  const isDefault = useLocation().pathname === "/";
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      location: "Sapa, Laocai",
      type: "",
      tour: "",
    },
  });

  useEffect(() => {
    dispatch(getFilterTour());
  }, [dispatch]);

  const { type } = useAppSelector((state) => state.tours);

  const button = ["Tours", "Hotels"];

  const [choose, setChoose] = React.useState("Tours");

  function onsubmitForm(data: {
    location: string;
    type: string;
    tour: string;
  }) {
    console.log(data);
  }

  const handleSelect: SelectSingleEventHandler = (day) => {
    if (day) setDate(day);
  };
  return (
    <>
      <div className="max-w-[400px] lg:w-[400px] transition-all">
        {isDefault && (
          <div className="grid grid-cols-2 w-full">
            {button.map((item, index) => (
              <Button
                key={index}
                className={
                  item === choose
                    ? "rounded-none"
                    : "rounded-none bg-white/85 text-content"
                }
                onClick={() => {
                  setChoose(item);
                }}
              >
                {item}
              </Button>
            ))}
          </div>
        )}
        <form
          className="bg-white/85 pt-2 pb-6 px-5"
          onSubmit={handleSubmit(onsubmitForm)}
        >
          <h2 className="text-2xl text-left text-heading font-medium mt-5 mb-3">
            {choose === "Tours"
              ? "Discover beautiful Vietnam"
              : "Find hotels for your next trip"}
          </h2>

          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <div className="relative mb-3">
                <label
                  htmlFor="location"
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-orange"
                >
                  <i className="ri-map-pin-line"></i>
                </label>
                <input
                  type="text"
                  id="location"
                  className="bg-white focus:outline-none w-full px-10 py-4 text-sm"
                  {...field}
                />
              </div>
            )}
          />

          {/* ================ FIELD INPUT 2 =============== */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal py-6 outline-none shadow-none",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-orange" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span className="text-sub-color-second">Departure time</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelect}
                disabled={{ before: new Date() }}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* ================ FIELD INPUT 4 =============== */}
          {choose === "Tours" && (
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full mt-3">
                    <div className="flex items-center gap-5">
                      <i className="ri-flag-line text-orange"></i>
                      <SelectValue
                        placeholder="Type of tour"
                        className="placeholder:text-sub-color-second"
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>--- Các loại tour ---</SelectLabel>
                      {type?.map((item) => (
                        <SelectItem value={item} key={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            ></Controller>
          )}

          {/* ================ FIELD INPUT 5 =============== */}
          <Controller
            name="tour"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full mt-3">
                  <div className="flex items-center gap-5">
                    <i className="ri-group-line text-orange"></i>
                    <SelectValue
                      placeholder="Number of guests"
                      className="placeholder:text-sub-color-second"
                    />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>--- Số lượng khách ---</SelectLabel>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="4">More than 4</SelectItem>
                    <SelectItem value="7">More than 7</SelectItem>
                    <SelectItem value="10">More than 10</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          ></Controller>

          <Button className={"w-full mt-5 py-8"}>
            <i className="ri-search-line text-xl"></i>
            Search
          </Button>
        </form>
      </div>
    </>
  );
};

export default FormSearchBanner;
