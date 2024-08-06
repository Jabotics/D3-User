import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { useFetchFaqsQuery } from "@/store/actions/slices/faqSlice";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

export const Faqs = () => {

  useFetchFaqsQuery({});
  const { faqs: faqData } = useAppSelector((state: RootState) => state.faqs)

  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems((prevOpenItems) => {
      if (prevOpenItems.includes(itemId)) {
        return prevOpenItems.filter((id) => id !== itemId);
      } else {
        return [...prevOpenItems, itemId];
      }
    });
  };

  return (
    <div className="faq-section text-center py-12 sm:py-24 px-8 sm:px-0">
      <div className="container">
        <h2 className="sm:text-lg md:text-2xl font-medium tracking-normal">
          Frequently Asked Questions
        </h2>
        <div className="accordion-section text-left ">
          <Accordion type="single" collapsible className="w-full mb-10">
            {faqData.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className={`${openItems.includes(faq.id) ? "border-none" : "border-b"} text-xs sm:text-[16px]`}>
                <AccordionTrigger
                  state={openItems.includes(faq.id) ? "open" : "closed"}
                  onClick={() => toggleItem(faq.id)}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="w-full flex items-center justify-center h-8">
            <Link to={'/frequently-asked-questions'} className="bg-gray-300 shadow-md rounded-2xl px-5 py-1">Read More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Faqs;
