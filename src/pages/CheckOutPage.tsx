import { Label } from "@/components/ui/label";
import { Input } from "@components/ui/input";
import { useForm } from "react-hook-form";
const CheckOutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <main className="max-w-[1200px]  mx-auto grid grid-cols-3 gap-5">
      <h1 className="col-span-3 text-3xl mt-10 mb-5">Booking Submission</h1>

      <section className="col-span-2 ">
        <hr className=" mb-5" />

        <h2 className="text-[#2A2A2A] font-bold text-xl">Traveler Details</h2>
        <p>Information we need to confirm your tour or activity</p>

        <form>
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
                  {...register(field.name, { required: true })}
                />
                {errors[field.name] && (
                  <span className="text-red-500 text-sm">
                    This field is required
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
                  {...register(field.name, { required: true })}
                />
                {errors[field.name] && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
            ))}
          </section>

          <h3 className="text-[#2A2A2A] mt-5 mb-3 font-bold text-xl">
            Special Requirement
          </h3>
          <textarea  className="w-full focus:outline-none p-5 resize-none border mb-5" rows={5} placeholder="Special Requirement"></textarea>
        </form>
      </section>
    </main>
  );
};

export default CheckOutPage;
