import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import hero from "@assets/images/hero_1.png";

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
  return (
    <>
      <section className="banner_contact ">
        <div className="flex h-full items-center justify-start max-w-[1200px] mx-auto">
          <h1 className="font-semibold text-white text-5xl ">Contact Us</h1>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto my-5">
        <p className="flex justify-start gap-5">
          <Link to={"/"} className="hover:underline">
            Home
          </Link>
          <span className="text-[#C4C4C4] text-lg">•</span>
          Contact Us
        </p>
      </section>

      <section className="max-w-[1200px] mx-auto grid grid-cols-2 gap-20 mt-10 my-20">
        <form className="">
          <h2 className="font-bold text-4xl">We'd love to hear from you</h2>
          <p className="mt-5 mb-10">
            Send us a message and we'll respond as soon as possible
          </p>

          <div className="flex flex-col gap-5">
            <input
              type="name"
              className="bg-[#F5F5F5] p-3 focus:outline-none"
              placeholder="Your Name"
            />
            <input
              type="email"
              className="bg-[#F5F5F5] p-3 focus:outline-none"
              placeholder="Your Email"
            />
            <input
              type="tel"
              className="bg-[#F5F5F5] p-3 focus:outline-none"
              placeholder="Your Phone"
            />
            <textarea
              name=""
              id=""
              placeholder="Message"
              className="resize-none bg-[#F5F5F5] p-3 focus:outline-none"
              rows={5}
            ></textarea>

            <Button className="w-fit rounded-none py-5 px-10 ml-auto cursor-pointer">
              Send Message
            </Button>
          </div>
        </form>

        {/* ================================ Second Col========================================= */}
        <div className="relative">
          <img src={hero} className="w-full" alt="hero" />

          <div className="absolute bg-heading p-5 bottom-0 left-0">
            <h3 className="text-white text-3xl mb-5">Our Office</h3>

            <div>
              {contactItems.map((item, index) => (
                <div key={index} className="flex gap-5 mb-5 last:mb-0">
                  <i
                    className={`${item.icon} text-white bg-primary text-2xl px-3 center rounded-full`}
                  ></i>
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
