
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  import { Checkbox } from "@/components/ui/checkbox"

const FilterBySurface = () => {
  return (
    <div className='w-[100%] bg-white rounded-lg'>
   <Accordion type="single" collapsible className="w-full border rounded-md px-6">
      <AccordionItem value="item-1" className='border-b-0 p-0'>
        <AccordionTrigger className='no-underline text-[#53A53F] text-[16px]' >Surface</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
    
    <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
         Court
        </label>
        </div>
        <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
         Soapy

        </label>
        </div>
        <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Public
        </label>
        </div>
        <div className="items-top flex space-x-2">
        <Checkbox id="terms1"  />
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Grass

        </label>
        </div>
        <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Turf
        </label>
        </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
</div>
  )
}

export default FilterBySurface