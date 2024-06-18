import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { format, addDays } from "date-fns";
import { resetSlots, useGetAllSlotsQuery } from "@/store/actions/slices/slotsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";

type DateInfo = {
  dayOfWeek: string;
  date: string;
  isoString: string;
};

const SelectBookingDate: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedGroundId: GroundId } = useAppSelector(
    (state: RootState) => state.slots
  );

  const [selectedDate, setSelectedDate] = useState<string>("");
  useGetAllSlotsQuery(
    {
      date: selectedDate.length !== 0 ? selectedDate : null,
      ground: GroundId,
    },
    {
      skip: selectedDate.length === 0,
    }
  );

  const generateDates = (): DateInfo[] => {
    const dates: DateInfo[] = [];
    for (let i = 0; i <= 15; i++) {
      const date = addDays(new Date(), i);
      dates.push({
        dayOfWeek: format(date, "EEE"),
        date: format(date, "d MMM"),
        isoString: date.toISOString(),
      });
    }
    return dates;
  };

  const dates = generateDates();

  useEffect(() => {
    if (GroundId.length === 0) {
      navigate(-1);
    }
  }, [GroundId]);

  return (
    <div className="flex flex-col p-4 gap-4 w-[300px] sm:w-full">
      <span className="inline-block text-sm font-semibold">
        Select Booking Date
      </span>
      <Carousel className="w-[70%] md:w-[80%] lg:w-[90%] self-center border-zinc-900 mt-1">
        <CarouselContent className="-ml-1 flex flex-row gap-4">
          {dates.map((dateInfo, index) => {
            return (
              <CarouselItem
                key={index}
                className="pl-1 basis-[60px] lg:basis-[75px] cursor-pointer"
                onClick={() => {
                  setSelectedDate(dateInfo.isoString);
                  dispatch(resetSlots())
                }}
              >
                <div
                  className={`p-1 h-16 sm:h-20 flex flex-col items-center justify-center border rounded-md gap-1 hover:bg-[#53A53F] text-[#A4A3A3] hover:text-white group ${
                    dateInfo.isoString.split(":")[0] ===
                    selectedDate.split(":")[0]
                      ? "text-white bg-[#53A53F]"
                      : ""
                  }`}
                >
                  <span className="inline-block font-light sm:font-semibold text-xs">
                    {dateInfo.dayOfWeek}
                  </span>
                  <span
                    className={`inline-block text-sm font-semibold sm:text-lg sm:font-light ${
                      dateInfo.isoString.split(":")[0] ===
                      selectedDate.split(":")[0]
                        ? "text-gray-200"
                        : "text-gray-500 "
                    } -mt-2 group-hover:text-gray-200 whitespace-nowrap`}
                  >
                    {dateInfo.date}
                  </span>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default SelectBookingDate;
