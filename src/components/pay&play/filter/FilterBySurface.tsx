import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";
import { RootState } from "@/store";
import {
  setParams,
  setSelectedGroundType,
} from "@/store/actions/slices/groundSlice";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";

const groundType: string[] = ["Indoor", "Outdoor"];
const FilterBySurface = () => {

  const dispatch = useDispatch();
  const { selectedGroundType } = useAppSelector(
    (state: RootState) => state.ground
  );

  const handleCheckboxChange = (groundType: string) => {
    if (selectedGroundType.includes(groundType)) {
      const updatedTypes = selectedGroundType.filter(
        (type) => type !== groundType
      );
      dispatch(setParams({ key: "ground_type", data: updatedTypes }));
      // return updatedTypes;
    } else {
      dispatch(
        setParams({
          key: "ground_type",
          data: [...selectedGroundType, groundType],
        })
      );
    }
    dispatch(setSelectedGroundType(groundType));
  };
  
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
            Ground Type
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 -ml-4">
            {groundType?.map((item: string, index: number) => {
              return (
                <div key={index} className="items-top flex space-x-2">
                  <Checkbox
                    id="ground_Type"
                    checked={selectedGroundType.includes(item)}
                    onCheckedChange={() => {
                      handleCheckboxChange(item);
                    }}
                  />
                  <label
                    htmlFor="ground_Type"
                    className={`text-xs lg:text-sm ${selectedGroundType.includes(item) ? 'font-medium text-black' : 'font-light'} leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-0 lg:-mt-[2px]`}
                  >
                    {item}
                  </label>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterBySurface;
