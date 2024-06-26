import { Separator } from "@/components/ui/separator";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

import { useGetVenueQuery } from "@/store/actions/slices/venueSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import React, { useState } from "react";

import { useGetSportQuery } from "@/store/actions/slices/sportSlice";

import {
  setSelectedGroundType,
  setSelectedSportsStore,
  setSelectedVenue,
} from "@/store/actions/slices/academySlice";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const groundType: string[] = ["Indoor", "Outdoor"];
const AcademyFilter = () => {
  const dispatch = useAppDispatch();

  const { selectedVenue, selectedGroundType } = useAppSelector(
    (state: RootState) => state.academy
  );
  const [showMoreSports, setShowMoreSports] = useState<boolean>(false);
  const { selectedCity } = useAppSelector((state: RootState) => state.city);

  useGetSportQuery({});
  const { sports } = useAppSelector((state: RootState) => state.sport);

  const { selectedSportsStore } = useAppSelector(
    (state: RootState) => state.academy
  );

  useGetVenueQuery({
    city: selectedCity
  }, {
    skip: !!!selectedCity,
  });
  const venue = useAppSelector((state: RootState) => state.venue.venues);

  const handleVenueCheckboxChange = (venueId: string) => {
    dispatch(setSelectedVenue(venueId));
  };

  const handleGroundTypeCheckboxChange = (venueId: string) => {
    dispatch(setSelectedGroundType(venueId));
  };

  return (
    <div className="h-[30rem] overflow-x-hidden overflow-y-auto scroll-nobg-l">
      {/* SPORTS */}
      {sports && sports.length > 0 ? (
        <div className="h-60 w-full bg-white mt-5 border border-gray-100 rounded-md flex flex-col items-start gap-4 py-2 ">
          <div className="px-5 text-sm font-medium text-[#53A53F] h-12 mt-2 w-full">
            <span>Sports</span>
            <Separator className="mt-5 " />
          </div>
          <div className="flex-1 w-full overflow-x-hidden overflow-y-auto filter-sc">
            <div className="w-full flex flex-col items-start px-11 gap-3 ">
              {sports.slice(0, 3).map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        onClick={() => {
                          if (item.id === selectedSportsStore) {
                            dispatch(setSelectedSportsStore(null));
                          } else {
                            dispatch(setSelectedSportsStore(item.id));
                          }
                        }}
                        checked={item.id === selectedSportsStore}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-light text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.name}
                      </label>
                    </div>
                  </React.Fragment>
                );
              })}
              <div
                className="text-sm font-medium text-[#53A53F] cursor-pointer w-full mt-3 flex items-center justify-between"
                onClick={() => {
                  setShowMoreSports(!showMoreSports);
                }}
              >
                <span>{showMoreSports ? 'Show Less' : 'Show More'}</span>
                {showMoreSports ? <IoIosArrowUp className="text-gray-500" /> : <IoIosArrowDown className="text-gray-500" />}
              </div>
              {showMoreSports &&
                sports.slice(3, sports.length).map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          onClick={() => {
                            if (item.id === selectedSportsStore) {
                              dispatch(setSelectedSportsStore(null));
                            } else {
                              dispatch(setSelectedSportsStore(item.id));
                            }
                          }}
                          checked={item.id === selectedSportsStore}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-light text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item.name}
                        </label>
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-60 w-full bg-gray-100 mt-5 border border-gray-100 rounded-md flex flex-col items-start gap-4 py-2 "></div>
      )}

      {/* VENUE */}
      {venue && venue.length > 0 ? (
        <div className="w-full bg-white rounded-lg mt-5">
          <Accordion
            type="single"
            collapsible
            className="w-full border border-gray-100 rounded-md px-6"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1" className="border-b-0 p-0">
              <AccordionTrigger
                className="no-underline text-[#53A53F] text-sm"
                state={"open"}
              >
                Select Venue
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 w-full">
                {venue?.map(
                  (
                    item: {
                      id: string;
                      name: string;
                    },
                    index: number
                  ) => {
                    return (
                      <div key={index} className="items-center flex gap-2">
                        <Checkbox
                          id={item.id}
                          checked={selectedVenue.includes(item.id)}
                          onCheckedChange={() => {
                            handleVenueCheckboxChange(item.id);
                          }}
                        />
                        <label
                          htmlFor={item.id}
                          className="text-sm font-light leading-none"
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
      ) : (
        <div className="w-full bg-gray-100 rounded-lg mt-5 h-40"></div>
      )}

      {/* GROUND TYPE */}
      <div className="w-full bg-white rounded-lg mt-5">
        <Accordion
          type="single"
          collapsible
          className="w-full border border-gray-100 rounded-md px-6"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1" className="border-b-0 p-0">
            <AccordionTrigger
              className="no-underline text-[#53A53F] text-[16px]"
              state={"open"}
            >
              Ground Type
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              {groundType?.map((item: string, index: number) => {
                return (
                  <div key={index} className="items-top flex space-x-2">
                    <Checkbox
                      id="ground_Type"
                      checked={selectedGroundType.includes(item)}
                      onCheckedChange={() => {
                        handleGroundTypeCheckboxChange(item);
                      }}
                    />
                    <label
                      htmlFor="ground_Type"
                      className="text-sm font-light leading-none"
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
    </div>
  );
};

export default AcademyFilter;
