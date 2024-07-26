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
  setSelectedVenueInGround,
} from "@/store/actions/slices/groundSlice";
import {
  setSelectedVenue,
  useGetVenueQuery,
} from "@/store/actions/slices/venueSlice";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const FilterByVenue = () => {
  const dispatch = useDispatch();

  const selectedCity = useAppSelector(
    (state: RootState) => state.city.selectedCity
  );
  const getVenueQuery = useGetVenueQuery({ city: selectedCity });

  const venue = useAppSelector((state: RootState) => state.venue.venues);
  // const selectedVenue = useAppSelector(
  //   (state: RootState) => state.venue.selectedVenue
  // );

  const { selectedVenue } = useAppSelector((state: RootState) => state.ground);

  const handleCheckboxChange = (venueId: string) => {
    dispatch(setSelectedVenue({ venueId }));

    const updatedIds = selectedVenue.includes(venueId)
      ? selectedVenue.filter((id) => id !== venueId)
      : [...selectedVenue, venueId];

    dispatch(setParams({ key: "venue", data: updatedIds }));

    dispatch(setSelectedVenueInGround(venueId));
  };

  useEffect(() => {
    getVenueQuery.refetch();
  }, [selectedCity]);

  return (
    <>
      {venue && venue.length > 0 ? (
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
                Select Venue
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 -ml-4">
                {venue?.map(
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
                          checked={selectedVenue.includes(item.id)}
                          onCheckedChange={() => {
                            handleCheckboxChange(item.id);
                          }}
                        />
                        <label
                          htmlFor={item.id}
                          className={`text-xs lg:text-sm ${
                            selectedVenue.includes(item.id)
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : (
        <div className="w-[100%] bg-gray-100 min-h-20 rounded-md"></div>
      )}
    </>
  );
};

export default FilterByVenue;
