
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri"
const FilterByPrice = () => {
  return (
    <div className='w-[100%] bg-white rounded-lg'>
      <Accordion type="single" collapsible className="w-full border rounded-md px-6" defaultValue="item-1">
        <AccordionItem value="item-1" className='border-b-0 p-0'>
          <AccordionTrigger className='no-underline text-[#53A53F] text-[16px]' state={"open"} >Price</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <RiArrowDropLeftLine size={18} className="inline-block" /> 1000
              </label>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                1000 - 2000

              </label>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                2000 - 3000
              </label>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                3000 - 4000

              </label>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <RiArrowDropRightLine size={18} className="inline-block" /> 4000
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default FilterByPrice