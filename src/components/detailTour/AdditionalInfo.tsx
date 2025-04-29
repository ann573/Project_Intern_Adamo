import { useAppSelector } from "@/hooks/app";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AdditionalInfo = () => {
  const { tour } = useAppSelector((state) => state.tours);
  return (
    <>
      <ul className="list-disc list-inside my-7">
        {tour?.additional.map((item, index) => (
          <li key={index} className="my-3">
            {item}
          </li>
        ))}
      </ul>

      <h3 className="font-bold my-5 text-xl">FAQs</h3>
      <Accordion type="single" collapsible className="w-full mb-15">
        {tour?.faqs.map((item, index) => {
          return (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className=" transition-colors"
            >
              <AccordionTrigger className="data-[state=open]:text-[#04316A] dark:data-[state=open]:text-[#2f7bdf] font-semibold text-lg ">
                <div className="font-medium">
                  <i className="ri-question-line mr-5 text-xl"></i>
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default AdditionalInfo;
