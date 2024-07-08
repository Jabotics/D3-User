import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import {
  setParams,
  setSelectedSportsStore,
} from "@/store/actions/slices/groundSlice";
import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";
import {
  setSelectedSports,
  useGetSportQuery,
} from "@/store/actions/slices/sportSlice";

const FilterBySports = () => {
  
  const dispatch = useDispatch();
  useGetSportQuery({});

  const { sports } = useAppSelector((state: RootState) => state.sport);

  const { selectedSportsStore } = useAppSelector((state: RootState) => state.ground)

  const handleCheckboxChange = (sportId: string) => {
    dispatch(setSelectedSports({ sportId }));

    const updatedIds = selectedSportsStore.includes(sportId)
      ? selectedSportsStore.filter((id) => id !== sportId)
      : [...selectedSportsStore, sportId];

    dispatch(setParams({ key: "supported_sports", data: updatedIds }));

    dispatch(setSelectedSportsStore(sportId));
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
            className="no-underline text-[#53A53F] text-[16px]"
            state={"open"}
          >
            Sports
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {sports?.map(
              (
                item: {
                  id: string;
                  name: string;
                },
                index: number
              ) => {
                return (
                  <div key={index} className="items-top flex space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={selectedSportsStore.includes(item.id)}
                      onCheckedChange={() => {
                        handleCheckboxChange(item.id);
                      }}
                    />
                    <label
                      htmlFor={item.id}
                      className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item?.name}
                    </label>
                  </div>
                );
              }
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterBySports;
