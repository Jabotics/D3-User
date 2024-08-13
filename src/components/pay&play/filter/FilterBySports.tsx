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
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import React from "react";

const FilterBySports = () => {
  const dispatch = useDispatch();
  useGetSportQuery({});

  const [showMoreSports, setShowMoreSports] = useState<boolean>(false);

  const { sports } = useAppSelector((state: RootState) => state.sport);

  const { selectedSportsStore } = useAppSelector(
    (state: RootState) => state.ground
  );

  const handleCheckboxChange = (sportId: string) => {
    dispatch(setSelectedSports({ sportId }));

    const updatedIds = selectedSportsStore.includes(sportId)
      ? selectedSportsStore.filter((id) => id !== sportId)
      : [...selectedSportsStore, sportId];

    dispatch(setParams({ key: "supported_sports", data: updatedIds }));

    dispatch(setSelectedSportsStore(sportId));
  };

  return (
    <>
      {sports && sports.length > 0 ? (
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
                Sports
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 -ml-4">
                {sports.length > 0 &&
                  sports?.slice(0, 3).map(
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
                            className={`text-xs lg:text-sm ${
                              selectedSportsStore.includes(item.id)
                                ? "font-medium text-black"
                                : "font-light"
                            } leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-0 lg:-mt-[2px]`}
                          >
                            {item?.name}
                          </label>
                        </div>
                      );
                    }
                  )}
                <div
                  className="text-xs xl:text-sm font-medium text-[#53A53F] cursor-pointer w-full mt-3 flex items-center justify-between"
                  onClick={() => {
                    setShowMoreSports(!showMoreSports);
                  }}
                >
                  <span>{showMoreSports ? "Show Less" : "Show More"}</span>
                  {showMoreSports ? (
                    <IoIosArrowUp className="text-gray-500" />
                  ) : (
                    <IoIosArrowDown className="text-gray-500" />
                  )}
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  {showMoreSports &&
                    sports.slice(3, sports.length).map((item, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={item.id}
                              checked={selectedSportsStore.includes(item.id)}
                              onCheckedChange={() => {
                                handleCheckboxChange(item.id);
                              }}
                            />
                            <label
                              htmlFor={item.id}
                              className={`text-xs lg:text-sm ${
                                selectedSportsStore.includes(item.id)
                                  ? "font-medium text-black"
                                  : "font-light"
                              } leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-0 lg:-mt-[2px]`}
                            >
                              {item.name}
                            </label>
                          </div>
                        </React.Fragment>
                      );
                    })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : (
        <div className="bg-gray-100 min-h-20 w-full rounded-md"></div>
      )}
    </>
  );
};

export default FilterBySports;
