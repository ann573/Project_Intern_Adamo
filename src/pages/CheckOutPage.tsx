import { format } from "date-fns";
import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@components/ui/input";

import { Button } from "@/components/ui/button";
import checkoutSchema, { CheckoutFormData } from "@/schema/checkoutSchema";
import { instance } from "@/service";
import { useAuthStore } from "@/zusTand/authStore";
import { useOrderStore } from "@/zusTand/orderStore";
import { useRoomStore } from "@/zusTand/roomStore";
import card from "@assets/images/card.png";
import paypal from "@assets/images/paypal.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, User2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CheckOutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isTour = useLocation().pathname.includes("tour");
  const nav = useNavigate();

  const { orderTour, orderRoom, clearOrderTour, clearOrderRoom } =
    useOrderStore();
  const { clearRoom } = useRoomStore();
  const { user } = useAuthStore();
  const [discount, setDiscount] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: user?.name.split(" ")[0] || "",
      lastName: user?.name.split(" ")[1] || "",
      email: user?.email,
    },
  });
  const submitForm = async (data: CheckoutFormData) => {
    const { firstName, lastName, ...rest } = data;

    const userInformation = {
      fullname: `${firstName} ${lastName}`,
      ...rest,
    };

    if (isTour) {
      const dataBody = {
        userInformation,
        orderTour: {
          ...orderTour,
          discount,
          total: orderTour.total * (1 - discount / 100),
        },
      };

      try {
        await instance.post("/orderTours", dataBody);
        toast.success("Order successfully", {
          style: {
            background: "green",
            color: "#fff",
          },
        });
        clearOrderTour();
        nav("/thanks");
      } catch (error) {
        toast.error("Something went wrong", {
          style: {
            background: "red",
            color: "#fff",
          },
          description: (error as Error).message || "Something went wrong",
        });
      }
    } else {
      const dataBody = {
        ...userInformation,
        orderRoom: {
          ...orderRoom,
          discount,
          total: orderRoom.total * (1 - discount / 100),
        },
      };

      try {
        await instance.post("/orderHotels", dataBody);
        toast.success("Order successfully", {
          style: {
            background: "green",
            color: "#fff",
          },
        });
        clearOrderRoom();
        clearRoom();
        nav("/thanks");
      } catch (error) {
        toast.error("Something went wrong", {
          style: {
            background: "red",
            color: "#fff",
          },
          description: (error as Error).message || "Something went wrong",
        });
      }
    }
  };

  const promoCodeRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const submitPromotion = async (event: React.FormEvent) => {
    event.preventDefault();
    btnRef.current?.setAttribute("disabled", "true");
    if (!promoCodeRef.current?.value) {
      return toast.warning("Promo code is required", {
        style: {
          background: "orange",
          color: "#fff",
        },
        duration: 1000,
      });
    }

    const { data } = await instance.get(
      `/promotions?code=${promoCodeRef.current?.value}`
    );

    if (data.length === 0) {
      btnRef.current?.removeAttribute("disabled");
      return toast.warning("Promo code is invalid", {
        style: {
          background: "orange",
          color: "#fff",
        },
        duration: 1000,
      });
    }

    toast.success("Promo code is applied successfully", {
      style: {
        background: "green",
        color: "#fff",
      },
      duration: 3000,
    });
    btnRef.current?.removeAttribute("disabled");
    setDiscount(data[0].discount);
  };

  return (
    <main className="max-w-[1200px] mx-auto grid xl:grid-cols-3 grid-cols-2 gap-x-15 xl:p-0 px-5">
      <h1 className="xl:col-span-3 col-span-2 text-3xl mt-10 mb-5">
        Booking Submission
      </h1>

      <section className="col-span-2 mb-10 xl:order-1 order-2">
        <hr className="mb-5" />

        <h2 className="text-[#2A2A2A] font-bold text-xl">Traveler Details</h2>
        <p>Information we need to confirm your tour or activity</p>

        <form onSubmit={handleSubmit(submitForm)}>
          <h3 className="text-[#2A2A2A] mt-5 mb-3 font-bold text-xl">
            Lead Traveler (Adult)
          </h3>
          <section className="grid sm:grid-cols-2 gap-10 mb-10">
            {[
              {
                name: "firstName",
                label: "First Name",
                placeholder: "First Name",
              },
              {
                name: "lastName",
                label: "Last Name",
                placeholder: "Last Name",
              },
              {
                name: "email",
                label: "Email",
                placeholder: "youremail@domain.com",
              },
              {
                name: "phone",
                label: "Phone Number",
                placeholder: "Your Phone",
              },
            ].map((field) => (
              <div key={field.name}>
                <Label className="text-lg text-[#2A2A2A]">
                  {field.label} <span className="text-[#EE1D00]">*</span>
                </Label>
                <Input
                  className="rounded-none p-5 mt-2"
                  placeholder={field.placeholder}
                  {...register(
                    field.name as "firstName" | "lastName" | "email" | "phone"
                  )}
                />
                {errors[field.name as keyof CheckoutFormData] && (
                  <span className="text-red-500 text-sm">
                    {errors[field.name as keyof CheckoutFormData]?.message}
                  </span>
                )}
              </div>
            ))}
          </section>

          <h3 className="text-[#2A2A2A] mt-5 mb-3 font-bold text-xl">
            Address
          </h3>
          <label
            htmlFor="address"
            className="text-lg  text-[#2A2A2A] font-semibold"
          >
            Your Address
          </label>
          <Input
            className="rounded-none mt-3 mb-5 p-5"
            placeholder="Your Address"
            {...register("address")}
          />
          <section className="grid sm:grid-cols-2 gap-10 mb-10">
            {[
              {
                name: "city",
                label: "City",
                placeholder: "Your City",
              },
              {
                name: "state",
                label: "State/Province/Region",
                placeholder: "Your State/Province/Region",
              },
              {
                name: "zip",
                label: "Zip Code/ Postal Code",
                placeholder: "Your Zip Code/ Postal Code",
              },
              {
                name: "country",
                label: "Country",
                placeholder: "Your Country",
              },
            ].map((field) => (
              <div key={field.name}>
                <Label className="text-lg text-[#2A2A2A]">
                  {field.label} <span className="text-[#EE1D00]">*</span>
                </Label>
                <Input
                  className="rounded-none p-5 mt-2"
                  placeholder={field.placeholder}
                  {...register(
                    field.name as "city" | "state" | "zip" | "country"
                  )}
                />
                {errors[field.name as keyof CheckoutFormData] && (
                  <span className="text-red-500 text-sm">
                    {errors[field.name as keyof CheckoutFormData]?.message}
                  </span>
                )}
              </div>
            ))}
          </section>
          <h3 className="text-[#2A2A2A] mt-5 mb-3 font-bold text-xl">
            Special Requirement
          </h3>
          <textarea
            className="w-full focus:outline-none p-5 resize-none border mb-5"
            rows={5}
            placeholder="Special Requirement"
            {...register("specialRequirement")}
          ></textarea>
          <hr />
          <h3 className="text-[#2A2A2A] mt-5 mb-3 font-bold text-xl">
            Payment Method
          </h3>
          <p className="text-[#4F4F4F] mb-5">
            Pay securely—we use SSL encryption to keep your data safe
          </p>
          <div className="flex flex-col gap-8">
            {[
              { value: "card", img: card, label: "Card" },
              { value: "paypal", img: paypal, label: "PayPal" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center cursor-pointer space-x-3"
              >
                <div className="relative">
                  <input
                    type="radio"
                    value={option.value}
                    {...register("paymentMethod", { required: true })}
                    className="peer appearance-none w-6 h-6 border-2 border-gray-300 rounded-none checked:border-green-500 checked:bg-green-500 transition-colors"
                  />
                  {/* check mark */}
                  <span
                    className="
                      pointer-events-none absolute left-0 top-0 w-6 h-6 flex items-center justify-center
                      before:content-[''] before:absolute before:w-3 before:h-1.5 before:border-b-2 before:border-l-2
                      before:border-white before:rotate-[-45deg] before:opacity-0
                      peer-checked:before:opacity-100
                    "
                  ></span>
                </div>
                <img src={option.img} alt={option.label} className="h-8" />
              </label>
            ))}
          </div>

          {errors.paymentMethod && (
            <span className="text-red-500 text-sm block mt-2">
              Please select a payment method
            </span>
          )}

          <ul className="list-disc pl-5 space-y-2 text-[#4F4F4F] text-base my-5">
            <li>
              You will be charged the total amount once your order is confirmed.
            </li>
            <li>
              If confirmation isn't received instantly, an authorization for the
              total amount will be held until your booking is confirmed.
            </li>
            <li>
              You can cancel for free up to 24 hours before the day of the
              experience, local time.
              <br />
              By clicking &lsquo;Pay with PayPal&rsquo;, you are acknowledging
              that you have read and are bound by Ojimah’s
            </li>
            <li>
              Customer Terms of Use, Privacy Policy, plus the tour operator’s
              rules &amp; regulations (see the listing for more details).
            </li>
          </ul>

          <Button className="w-full rounded-none py-8 center text-lg font-bold">
            Complete Booking
          </Button>
        </form>
      </section>

      <section className="xl:order-2 order-1 md:col-span-1 col-span-2 my-5 xl:my-0">
        <div className="bg-[#F4F4F4] h-fit p-5 pt-8">
          <h2 className="text-heading text-lg font-bold">
            {isTour ? orderTour.title : orderRoom.name}
          </h2>

          <div className="flex items-center gap-2 my-3">
            <i className="ri-map-pin-line text-orange"></i>
            <p className="text-sub-color-primary text-sm">
              {isTour ? orderTour.location : orderRoom.location}
            </p>
          </div>

          {isTour && (
            <div className="flex justify-between">
              <div>
                <span className="text-sub-color-primary text-xs">
                  Duration:
                </span>
                <p className="font-semibold text-sm">
                  {orderTour.duration} days -{" "}
                  {orderTour.duration && orderTour.duration - 1} nights
                </p>
              </div>
              <div>
                <span className="text-sub-color-primary text-xs">
                  Tour type:
                </span>
                <p className="font-semibold text-sm">{orderTour.type}</p>
              </div>
            </div>
          )}

          <section className="grid gap-2">
            <div className="w-full justify-start text-left font-normal py-5 px-3 my-5 bg-white flex text-sm items-center gap-5 rounded-lg border">
              <CalendarIcon className="text-primary text-xs" />
              {format(
                isTour ? orderTour.from : orderRoom.from,
                "dd/MM/yyyy"
              )} - {format(isTour ? orderTour.to : orderRoom.to, "dd/MM/yyyy")}
            </div>

            <div className="w-full justify-start text-left font-normal py-5 px-3 bg-white flex text-sm items-center gap-5 rounded-lg border">
              <User2 className="text-orange-500" size={18} />
              {isTour ? (
                <span>
                  {orderTour.adults} Adults - {orderTour.children}{" "}
                  {orderTour.children === 1 ? "Child" : "Children"}
                </span>
              ) : (
                <span>
                  {orderRoom.adults} Adults - {orderRoom.children}{" "}
                  {orderRoom.children === 1 ? "Child" : "Children"}
                </span>
              )}
            </div>
          </section>

          {!isTour && (
            <section className="pl-2">
              {orderRoom.rooms.map((item, index) => (
                <div className="flex justify-between my-3" key={index}>
                  <div className="flex gap-5">
                    <span className="text-primary">{item.quantity}x</span>
                    <h4 className="font-bold">{item.name}</h4>
                  </div>
                  <p className="font-bold">${item.cost * item.quantity}</p>
                </div>
              ))}

              <h5 className="text-[#888888] font-bold">Adds on</h5>
              {orderRoom.adds.map((item, index) => (
                <div className="flex justify-between my-3" key={index}>
                  <div className="flex gap-5">
                    <span className="text-primary">{item.quantity}x</span>
                    <h4 className="font-bold">{item.name}</h4>
                  </div>
                  <p className="font-bold">${item.cost * item.quantity}</p>
                </div>
              ))}
            </section>
          )}

          <form
            className="my-5 flex gap-x-5 h-[56px]"
            onSubmit={submitPromotion}
          >
            <input
              type="text"
              placeholder="Promo Code"
              className="bg-white p-5 w-2/3 focus:outline-none h-full"
              ref={promoCodeRef}
            />
            <Button
              variant={"outline"}
              className="h-full inline-block rounded-none bg-transparent border-primary text-[#FF7B42] flex-1 hover:border-black"
              type="submit"
              ref={btnRef}
            >
              Apply
            </Button>
          </form>
          {discount > 0 && (
            <p className="text-[#FF7B42] pl-1">
              This code discount {discount}%
            </p>
          )}
        </div>
        <div className="bg-black p-5 text-white flex justify-between items-center">
          <p className="text-2xl">Total</p>
          <p
            className={`font-bold text-xl ${
              discount > 0 ? "flex flex-col items-end text-red-500" : ""
            }`}
          >
            <span
              className={`text-sm line-through text-white ${
                discount > 0 ? "inline-block" : "hidden"
              }`}
            >
              $
              {discount > 0 && isTour
                ? orderTour.total.toFixed(2)
                : orderRoom.total.toFixed(2)}
            </span>
            $
            {(
              (isTour ? orderTour.total : orderRoom.total) *
              (discount > 0 ? 1 - discount / 100 : 1)
            ).toFixed(2)}
          </p>
        </div>
      </section>
    </main>
  );
};

export default CheckOutPage;
