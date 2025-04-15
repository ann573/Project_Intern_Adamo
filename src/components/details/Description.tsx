import { useAppSelector } from "@/hooks/app";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import image360 from "@assets/images/360.png";
import icon360 from "@assets/images/360icon.svg";

import videoTravel from "@assets/video/vietnam.mp4";
const Description = () => {
  const { tour } = useAppSelector((state) => state.tours);

  return (
    <>
      <div>
        <h3 className="font-bold my-5 text-xl">Overview</h3>
        <p className="text-[#4F4F4F]">{tour?.overview.description}</p>
        <ul className="my-10 list-inside">
          {tour?.overview.highlight.map((item, index) => {
            return (
              <li key={index} className="list-disc text-[#4F4F4F] my-2">
                {item}
              </li>
            );
          })}
        </ul>
      </div>

      <hr />

      <div>
        <h3 className="font-bold my-5 text-xl">What's Include</h3>
        {tour?.include.map((item, index) => {
          return (
            <p key={index} className="text-[#4F4F4F] my-2">
              <i className="ri-check-line text-green-500 text-xl mr-3 font-bold"></i>
              {item}
            </p>
          );
        })}
      </div>

      <hr />

      <div>
        <h3 className="font-bold my-5 text-xl">Departure & Return</h3>
        <h4 className="font-bold mb-2 text-lg text-[#1e1e1e]">
          Departure Point
        </h4>
        <ul className="list-decimal list-inside my-5">
          {tour?.departure.point.map((item, index) => {
            return (
              <li key={index} className="text-[#4F4F4F] my-2">
                {item}
              </li>
            );
          })}
        </ul>

        <h4 className="font-bold mb-2 text-lg text-[#1e1e1e]">
          Departure Time
        </h4>
        <p>{tour?.departure.time}</p>
      </div>

      <hr className="my-5" />

      <h3 className="font-bold my-5 text-xl">Tour Itinerary</h3>

      <Accordion type="single" collapsible className="w-full">
        {tour?.itinerary.map((item, index) => {
          return (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className=" transition-colors"
            >
              <AccordionTrigger className="text-[#04316A] font-semibold text-lg">
                Day {index + 1}: {item.title} ({item.details.length}{" "}
                {item.details.length > 1 ? "stops" : "stop"})
              </AccordionTrigger>
              <AccordionContent>
                {item.details.map((detail, index) => {
                  return (
                    <div key={index} className="flex gap-5 mb-10 first:mt-10">
                      <i className="ri-map-pin-line text-[#2A2A2A] text-2xl"></i>
                      <div className="text-[#4F4F4F]">
                        <h3 className="text-[#04316A] font-semibold">
                          {" "}
                          {detail.location}
                        </h3>
                        <p className="mb-5 mt-2 leading-8">
                          {detail.description}
                        </p>

                        <div>
                          <p className="font-bold mb-1">
                            Duration:{" "}
                            <span className="font-light">
                              {detail.duration}
                            </span>
                          </p>
                        </div>

                        <p>{detail.other}</p>
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <hr />

      <h3 className="font-bold my-5 text-xl">Maps</h3>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.3719535378073!2d105.77852957471416!3d21.017798188156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab1167edbae7%3A0xa0790fee2a2a9c1b!2sAdamo%20Software!5e0!3m2!1svi!2s!4v1744619664297!5m2!1svi!2s"
        width="100%"
        height="450"
        style={{ border: "0" }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <h3 className="font-bold my-5 text-xl">
        360° Panoramic Images and Videos
      </h3>

      <div className="relative cursor-pointer hover:opacity-90">
        <img src={image360} alt="360_view" className="w-full " />

        <img
          src={icon360}
          alt="icon_360"
          className="absolute inset-0 mx-auto my-auto"
        />
      </div>

      <video src={videoTravel} controls className=" my-10"></video>
    </>
  );
};

export default Description;
