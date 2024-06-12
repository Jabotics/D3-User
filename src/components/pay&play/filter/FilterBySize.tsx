
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
const FilterBySize = () => {
  return (
    <div className='w-[100%] bg-white rounded-lg'>
 <Accordion type="single" collapsible className="w-full border rounded-md px-6">
      <AccordionItem value="item-1" className='border-b-0 p-0'>
        <AccordionTrigger className='no-underline text-[#53A53F] text-[16px]' >Size</AccordionTrigger>
        <AccordionContent>
          PrferedTime
        </AccordionContent>
      </AccordionItem>
    </Accordion>
</div>
  )
}

export default FilterBySize