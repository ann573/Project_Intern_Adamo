import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/hooks/app";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import { toast } from "sonner";

const FormPrice = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const { tour } = useAppSelector((state) => state.tours);

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), tour?.duration || 0),
  });
  const [price, setPrice] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    if (tour) {
      setPrice(adults * tour?.cost + children * (tour?.cost / 2));
    }
  }, [adults, children, tour]);

  const handleClearDate = () => {
    setDate(undefined);
  };

  const handleSubmitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (!date)
        return toast.error("Pleas fill the date!!!", {
          style: {
            background: "red",
            color: "white",
          },
        });
      const { from, to } = date;
  
      if (from && to) {
        const selectedDays =
          (to.getTime() - from.getTime()) / (1000 * 3600 * 24) + 1; 
        if (tour && selectedDays !== tour?.duration) {
          toast.error(`The tour duration cannot be changed to ${selectedDays} days. Please select ${tour?.duration} days.`, {
            style: {
              background: "red",
              color: "white",
            },
          });
        }
      }
    };
  return (
    <>
      <form className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal py-7 px-3 rounded-none my-5",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="text-primary" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd/MM/yyyy")} -{" "}
                    {format(date.to, "dd/MM/yyyy")}
                  </>
                ) : (
                  format(date.from, "dd/MM.yyyy")
                )
              ) : (
                <span>Chọn khoảng ngày</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date || undefined}
              showOutsideDays={true}
              onSelect={setDate}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
            />
            {/* Nút hủy lựa chọn */}
            <Button
              variant="outline"
              className="mt-2 w-full"
              onClick={handleClearDate}
            >
              Hủy lựa chọn
            </Button>
          </PopoverContent>
        </Popover>
      </form>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start text-left flex items-center gap-2 w-full py-7 font-light"
          >
            <User2 className="text-orange-500" size={18} />
            <span>
              {adults} Adults - {children}{" "}
              {children === 1 ? "Child" : "Children"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="adults">Adults</Label>
            <Input
              id="adults"
              type="number"
              min={1}
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
              className="w-20 text-center"
            />
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="children">Children</Label>
            <Input
              id="children"
              type="number"
              min={0}
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
              className="w-20 text-center"
            />
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex justify-between items-center my-5">
        <span className="font-medium">Total</span>
        <span className="font-bold">${price.toFixed(2)}</span>
      </div>

      <Button
        variant={"default"}
        className="w-full py-7 mt-7 cursor-pointer hover:opacity-80"
        onClick={handleSubmitForm}
      >
        Book now
      </Button>
    </>
  );
};

export default FormPrice;
