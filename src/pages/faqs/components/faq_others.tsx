import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFetchFaqsQuery } from "@/store/actions/slices/faqSlice";

const FaqOthersComponent = ({
  others,
}: {
  others: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const {
    data: Faqs,
    isLoading,
    isError,
  } = useFetchFaqsQuery({
    type: "Academy",
  });

  if (isError) {
    return null;
  }

  return (
    <div id="play" ref={others} className="my-5">
      {isLoading ? (
        <></>
      ) : Faqs && Faqs?.data.length > 0 ? (
        <div className="flex flex-col">
          <p className="text-2xl mb-8">Others</p>
          <Accordion type="single" collapsible className="w-full">
            {Faqs?.data.map((item, index) => {
              return (
                <AccordionItem value="item-1" key={index}>
                  <AccordionTrigger state={"open"}>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FaqOthersComponent;
