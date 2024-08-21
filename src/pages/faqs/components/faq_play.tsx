import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFetchFaqsQuery } from "@/store/actions/slices/faqSlice";
import { useState } from "react";

const FaqPlayComponent = ({
  play,
}: {
  play: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  const {
    data: Faqs,
    isLoading,
    isError,
  } = useFetchFaqsQuery({
    type: "Booking",
  });

  if (isError) {
    return null;
  }

  return (
    <div id="play" ref={play} className="my-5">
      {isLoading ? (
        <div>Loading...</div>
      ) : Faqs && Faqs?.data.length > 0 ? (
        <div className="flex flex-col">
          <p className="text-2xl mb-8">Pay & Play Booking</p>
          <Accordion
            type="single"
            value={openItem}
            onValueChange={(value) => setOpenItem(value as string | undefined)}
            className="w-full"
          >
            {Faqs?.data.map((item, index) => {
              const itemValue = `item-${index}`;
              return (
                <AccordionItem value={itemValue} key={index}>
                  <AccordionTrigger
                    state={openItem === itemValue ? "open" : "closed"}
                    className={`tracking-wide px-2 rounded-md ${openItem !== itemValue ? "hover:bg-green-100 bg-opacity-65" : ""}`}
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-900 borber-b border-black">{item.answer}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      ) : (
        <div>No FAQs available</div>
      )}
    </div>
  );
};

export default FaqPlayComponent;
