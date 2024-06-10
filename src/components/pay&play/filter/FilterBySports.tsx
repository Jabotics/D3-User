
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
 
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
  import { Label } from "@/components/ui/label"
const FilterBySports = () => {
  return (
    <div className='w-[100%] bg-white rounded-lg'>
     <Accordion type="single" collapsible className="w-full border rounded-md px-6">
      <AccordionItem value="item-1" className='border-b-0 p-0'>
        <AccordionTrigger className='no-underline text-[#53A53F] text-[16px]'>Sports</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
        <RadioGroup defaultValue="" className="flex flex-col gap-4 ">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Box Cticket</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Swmming</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Badminton</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Football</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Basketball</Label>
      </div>
    </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}

export default FilterBySports