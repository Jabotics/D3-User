import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Faqs = () => {

  const faqData = [
    {
      id: "item-1",
      question: "Is it accessible?",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      id: "item-2",
      question: "Is it styled?",
      answer:
        "Yes. It comes with default styles that matches the other components' aesthetic.",
    },
    {
      id: "item-3",
      question: "Is it animated?",
      answer:
        "Yes. It's animated by default, but you can disable it if you prefer.",
    },
  ];

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
    <div className="faq-section text-center py-12 sm:py-24">
      <div className="container">
        <h2 className="text-2xl font-medium tracking-normal">
          Frequently Asked Questions
        </h2>
        <div className="accordion-section text-left">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className={`${openItems.includes(faq.id) ? "border-none" : "border-b"}`}>
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
        </div>
      </div>
    </div>
  );
};
export default Faqs;
