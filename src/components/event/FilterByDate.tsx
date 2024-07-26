import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const FilterByDate = () => {
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
                        className="no-underline text-[#53A53F] text-[16px]"
                        state={"open"}
                    >
                        Date
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4">
                        <div className="items-top flex space-x-2">
                            <Checkbox id="terms1" />
                            <label
                                htmlFor="terms1"
                                className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Date Range
                            </label>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default FilterByDate;