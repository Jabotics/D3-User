import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
const FilterByPrice = () => {
  return (
    <div className="w-[100%] bg-white rounded-lg">
      <Accordion
        type="single"
        collapsible
        className="w-full border-[1px] border-gray-100 rounded-md px-6"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="border-b-0 p-0">
          <AccordionTrigger
            className="no-underline text-[#53A53F] text-sm lg:text-[16px]"
            state={"open"}
          >
            Price
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 -ml-4">
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <label
                htmlFor="terms1"
                className="text-xs lg:text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-0 lg:-mt-[2px]"
              >
                <RiArrowDropLeftLine size={window.innerWidth < 1024 ? 14 : 18} className="inline-block" /> 1000
              </label>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <label
                htmlFor="terms1"
                className="text-xs lg:text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-0 lg:-mt-[2px]"
              >
                1000 - 2000
              </label>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <label
                htmlFor="terms1"
                className="text-xs lg:text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-0 lg:-mt-[2px]"
              >
                2000 - 3000
              </label>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <label
                htmlFor="terms1"
                className="text-xs lg:text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-0 lg:-mt-[2px]"
              >
                3000 - 4000
              </label>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <label
                htmlFor="terms1"
                className="text-xs lg:text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-0 lg:-mt-[2px]"
              >
                <RiArrowDropRightLine size={window.innerWidth < 1024 ? 14 : 18} className="inline-block" /> 4000
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterByPrice;
