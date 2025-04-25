import { Button } from "@/components/ui/button";
import { ContactFormData, contactSchema } from "@/schema/contactSchema";
import { instance } from "@/service";
import { useAuthStore } from "@/zusTand/authStore";
import hero from "@assets/images/hero_1.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const contactItems = [
  {
    icon: "ri-home-4-line",
    title: "Address",
    content: "27 Old Gloucester Street, London, WC1N 3AX",
  },
  {
    icon: "ri-phone-line",
    title: "Phone Number",
    content: "+84 (0)20 33998400",
  },
  {
    icon: "ri-mail-line",
    title: "Email Us",
    content: "info@ngaoduvietnam.com",
  },
];

const ContactPage = () => {
  const nav = useNavigate();
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      telephone: "",
    },
  });

  const handleSubmitForm = async (data: ContactFormData) => {
    try {
      await instance.post("/contact", data);
      toast.success("Send message successfully", {
        style: {
          background: "green",
          color: "white",
        },
        description: "We will contact you as soon as possible",
      });
      reset();
      nav("/");
    } catch (error) {
      toast.error((error as Error).message, {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <section className="banner_contact ">
        <div className="flex h-full items-center justify-start max-w-[1200px] mx-auto">
          <h1 className="font-semibold text-white text-5xl pl-5 xl:pl-0">
            Contact Us
          </h1>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto my-5 xl:px-0 px-10">
        <p className="flex justify-start gap-5">
          <Link to={"/"} className="hover:underline">
            Home
          </Link>
          <span className="text-[#C4C4C4] text-lg">•</span>
          Contact Us
        </p>
      </section>

      <section className="max-w-[1200px] mx-auto grid lg:grid-cols-2 xl:gap-20 gap-10 mt-10 my-20 xl:px-0 px-5 ">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <h2 className="font-bold text-4xl">We'd love to hear from you</h2>
          <p className="mt-5 mb-10">
            Send us a message and we'll respond as soon as possible
          </p>

          <div className="flex flex-col gap-5">
            <div>
              <input
                type="name"
                className="bg-[#F5F5F5] p-3 focus:outline-none w-full"
                placeholder="Your Name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 italic">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                className="bg-[#F5F5F5] p-3 focus:outline-none w-full"
                placeholder="Your Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 italic">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                className="bg-[#F5F5F5] p-3 focus:outline-none w-full"
                placeholder="Your Phone"
                {...register("telephone")}
              />
              {errors.telephone && (
                <p className="text-red-500 italic">
                  {errors.telephone.message}
                </p>
              )}
            </div>

            <div>
              <textarea
                id=""
                placeholder="Message"
                className="resize-none bg-[#F5F5F5] p-3 focus:outline-none w-full"
                rows={5}
                {...register("message")}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 italic">{errors.message.message}</p>
              )}
            </div>

            <Button className="w-fit rounded-none py-5 px-10 ml-auto cursor-pointer">
              Send Message
            </Button>
          </div>
        </form>

        {/* ================================ Second Col========================================= */}
        <div className="relative">
          <img src={hero} className="w-full" alt="hero" />

          <div className="absolute bg-heading p-5 bottom-0 left-0 sm:w-2/3 w-11/12">
            <h3 className="text-white text-3xl mb-5">Our Office</h3>

            <div>
              {contactItems.map((item, index) => (
                <div key={index} className="flex gap-5 mb-5 last:mb-0">
                  <div className="max-h-[50px] bg-primary rounded-full center">
                    <i
                      className={`${item.icon} text-white  text-2xl px-3 center  `}
                    ></i>
                  </div>
                  <div>
                    <h4 className="text-primary font-bold">{item.title}</h4>
                    <p className="text-white text-sm">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
