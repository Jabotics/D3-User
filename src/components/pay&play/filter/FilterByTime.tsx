
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Slider } from "@/components/ui/slider"
const FilterByTime = () => {
  return (
    <div className='w-[100%] bg-white rounded-lg'>
         <Accordion type="single" collapsible className="w-full border rounded-md px-6">
      <AccordionItem value="item-1" className='border-b-0 p-0'>
        <AccordionTrigger className='no-underline text-[#53A53F] text-[16px]' state={"open"}>Time</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <span className="inline-block">Preferred Time</span>
            <span className="inline-block text-[#53A53F] font-bold">0:00 AM - 7:30 AM</span>
          </div>
        <Slider defaultValue={[1]} max={12} step={0.5} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}

export default FilterByTime