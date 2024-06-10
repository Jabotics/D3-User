import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
 
export const Faqs = () => {
    return (
      <div className="faq-section text-center py-12 sm:py-24">
           <div className="container">
              <h2>Frequently asked questions</h2>
              <div className="acordien-sec text-left">
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It comes with default styles that matches the other
                      components&apos; aesthetic.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It's animated by default, but you can disable it if you prefer.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
           </div>
      </div>
    )
  
  };
export default Faqs;  