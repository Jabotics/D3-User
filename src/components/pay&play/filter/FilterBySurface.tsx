
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Checkbox } from "@/components/ui/checkbox"
import { setParams } from "@/store/actions/slices/groundSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
const groundType: string[] = ['Indoor', 'Outdoor']
const FilterBySurface = () => {
  const dispatch = useDispatch()
  const [selectedGroundType, setSelectedGroundType] = useState<string[]>([]);
  // const groundData = useAppSelector((state: RootState) => state.ground.grounds)
  // useEffect(() => {
  //   getGround.refetch()
  // }, [params])
  const handleCheckboxChange = (groundType: string) => {
    setSelectedGroundType((prevSelected) => {
      if (prevSelected.includes(groundType)) {
        const updatedTypes = prevSelected.filter((type) => type !== groundType);
        dispatch(setParams({ key: 'ground_type', data: updatedTypes }))
        return updatedTypes;
      } else {
        dispatch(setParams({ key: 'ground_type', data: [...prevSelected, groundType] }))
        return [...prevSelected, groundType];
      }
    });
  };
  return (
    <div className='w-[100%] bg-white rounded-lg'>
      <Accordion type="single" collapsible className="w-full border rounded-md px-6" defaultValue="item-1">
        <AccordionItem value="item-1" className='border-b-0 p-0'>
          <AccordionTrigger className='no-underline text-[#53A53F] text-[16px]' state={"open"} >Ground Type</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">

            {groundType?.map((item: string, index: number) => {
              return (
                <div key={index} className="items-top flex space-x-2">
                  <Checkbox id='ground_Type' checked={selectedGroundType.includes(item)} onCheckedChange={() => {
                    handleCheckboxChange(item)

                  }} />
                  <label
                    htmlFor='ground_Type'
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item}
                  </label>
                </div>
              )
            })}


          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default FilterBySurface