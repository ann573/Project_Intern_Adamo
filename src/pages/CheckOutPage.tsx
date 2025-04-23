import { format } from "date-fns";
import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Input } from "@components/ui/input";

import { Button } from "@/components/ui/button";
import checkoutSchema, { CheckoutFormData } from "@/schema/checkoutSchema";
import { instance } from "@/service";
import { useOrderStore } from "@/zusTand/orderStore";
import card from "@assets/images/card.png";
import paypal from "@assets/images/paypal.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, User2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const CheckOutPage = () => {
  const { orderTour } = useOrderStore();

  console.log(orderTour);
  const [discount, setDiscount] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const submitForm = (data: CheckoutFormData) => {
    console.log(data);
  };

  const promoCodeRef = useRef<HTMLInputElement>(null);

  const submitPromotion = async (event: React.FormEvent) => {
    event.preventDefault();

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

    setDiscount(data[0].discount);
  };

  return (
    <main className="max-w-[1200px]  mx-auto grid grid-cols-3 gap-x-15">
      <h1 className="col-span-3 text-3xl mt-10 mb-5">Booking Submission</h1>

      <section className="col-span-2 mb-10">
        <hr className="mb-5" />

        <h2 className="text-[#2A2A2A] font-bold text-xl">Traveler Details</h2>
        <p>Information we need to confirm your tour or activity</p>

        <form onSubmit={handleSubmit(submitForm)}>
          <h3 className="text-[#2A2A2A] mt-5 mb-3 font-bold text-xl">
            Lead Traveler (Adult)
          </h3>
          <section className="grid grid-cols-2 gap-10 mb-10">
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
          />
          <section className="grid grid-cols-2 gap-10 mb-10">
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

      <section className="sticky top-0">
        <div className="bg-[#F4F4F4] h-fit p-5 pt-8">
          <h2 className="text-heading text-lg font-bold">{orderTour.title}</h2>

          <div className="flex items-center gap-2 my-3">
            <i className="ri-map-pin-line text-orange"></i>
            <p className="text-sub-color-primary text-sm">
              {orderTour.location}
            </p>
          </div>

          <div className="flex justify-between">
            <div>
              <span className="text-sub-color-primary text-xs">Duration:</span>
              <p className="font-semibold text-sm">
                {orderTour.duration} days -{" "}
                {orderTour.duration && orderTour.duration - 1} nights
              </p>
            </div>
            <div>
              <span className="text-sub-color-primary text-xs">Tour type:</span>
              <p className="font-semibold text-sm">{orderTour.type}</p>
            </div>
          </div>

          <section className="grid gap-2">
            <Button
              id="date"
              variant={"outline"}
              className="w-full justify-start cursor-default text-left font-normal py-7 px-3 rounded-none my-5"
            >
              <CalendarIcon className="text-primary" />
              {format(orderTour.from, "dd/MM/yyyy")} -{" "}
              {format(orderTour.to, "dd/MM/yyyy")}
            </Button>

            <Button
              variant="outline"
              className="justify-start cursor-default text-left flex items-center gap-2 w-full py-7 font-light"
            >
              <User2 className="text-orange-500" size={18} />
              <span>
                {orderTour.adults} Adults - {orderTour.children}{" "}
                {orderTour.children === 1 ? "Child" : "Children"}
              </span>
            </Button>
          </section>

          <form
            className="my-5 flex gap-x-5 h-[56px]"
            onSubmit={submitPromotion}
          >
            <input
              type="text"
              placeholder="Promo Code"
              className="bg-white p-5 focus:outline-none h-full"
              ref={promoCodeRef}
            />
            <Button
              variant={"outline"}
              className="h-full inline-block rounded-none bg-transparent border-primary text-[#FF7B42] flex-1 hover:border-black"
              type="submit"
              disabled={discount > 0}
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
        <div className="bg-black p-5 text-white flex justify-between">
          <p className="text-2xl">Total</p>
          <p className="font-bold text-xl">
            $
            {discount > 0
              ? (orderTour.total * (1 - discount / 100)).toFixed(2)
              : orderTour.total.toFixed(2)}
          </p>
        </div>
      </section>
    </main>
  );
};

export default CheckOutPage;
