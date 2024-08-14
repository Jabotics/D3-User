import { RootState } from "@/store";
import { useGetBookingsQuery } from "@/store/actions/slices/bookingSlice";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BsInfoCircle } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { GrPowerForceShutdown } from "react-icons/gr";

const Booking = () => {
  const navigate = useNavigate();

  const getBookings = useGetBookingsQuery({});
  const { bookings } = useAppSelector((state: RootState) => state.booking);

  const { title } = useAppSelector((state: RootState) => state.profile);

  useEffect(() => {
    getBookings.refetch();
  }, []);
  return (
    <>
      <div className="px-2 lg:px-0 flex-col gap-4 w-full h-16 mt-5 lg:mt-0 lg:h-[500px] flex">
        <span className="inline-block text-sm font-base text-black">
          {title}
        </span>
        <div id="bookings" className="w-full hidden lg:flex flex-col gap-4">
          <div className="bg-white flex flex-row justify-between p-4 rounded-lg">
            <div className="text-sm w-1/6 flex justify-center font-light tracking-wide">
              <span className="lg:block hidden">Ground Name</span>
              <span className="hidden sm:block lg:hidden">Ground</span>
              <BsInfoCircle className="block sm:hidden" />
            </div>
            <div className="text-sm w-1/3 flex justify-center font-light tracking-wide">
              <span className="hidden sm:block">Location</span>
              <GoLocation className="block sm:hidden" />
            </div>
            <div className="text-sm w-1/6 flex justify-center font-light tracking-wide">
              <span className="lg:block hidden">Booking Date</span>
              <span className="hidden sm:block lg:hidden">Date</span>
              <FaCalendarAlt className="block sm:hidden" />
            </div>
            <div className="text-sm w-1/3 flex justify-center font-light tracking-wide">
              <span className="lg:block hidden">Booking Time</span>
              <span className="hidden sm:block lg:hidden">Time</span>
              <MdAccessTime className="block sm:hidden" />
            </div>
            <div className="text-sm w-1/6 flex justify-center font-light tracking-wide">
              <span className="hidden sm:block">Status</span>
              <GrPowerForceShutdown className="block sm:hidden" />
            </div>
          </div>
          {bookings.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-row justify-between p-4 bg-white rounded-lg"
              >
                <div className="text-[14px] w-[20%] flex justify-center items-center">
                  {item?.ground?.name}
                </div>
                <div className="text-[14px] w-[40%] text-[#676767] flex justify-center items-center gap-2">
                  <FaLocationDot size={20} color="#D0D0D0" />
                  <span className="inline-block line-clamp-1 ">{item?.venue?.address}</span>
                </div>
                <div className="text-[14px] w-[20%] flex justify-center items-center gap-2">
                  <CalendarIcon size={16} />
                  <span className="inline-block ">
                    {" "}
                    {new Date(item?.date).toDateString()}
                  </span>
                </div>
                {item?.slots !== undefined && item?.slots.length > 0 ? (
                  <div className="text-[14px] w-[35%] flex justify-center items-center">
                    <span
                      className={`${item?.slots?.length > 1
                        ? "bg-[#53A53F] text-[#E4F6DF]"
                        : "bg-[#E4F6DF] text-[#53A53F]"
                        } p-2 w-40 flex items-center justify-center rounded-md `}
                    >
                      {item?.slots?.length > 1 ? (
                        <>
                          <DropdownMenu>
                            <DropdownMenuTrigger>SLOTS</DropdownMenuTrigger>
                            <DropdownMenuContent className="w-60 flex flex-col bg-gray-200 items-center justify-center px-10 py-5 gap-5">
                              {item?.slots?.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="text-sm bg-[#2c7e4c] text-[#E4F6DF] px-5 whitespace-nowrap rounded-md"
                                  >
                                    {item.slot}
                                  </div>
                                );
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      ) : (
                        item?.slots[0]?.slot
                      )}
                    </span>
                  </div>
                ) : (
                  <div className="text-[14px] w-[25%] flex justify-center items-center">
                    <span className="inline-block bg-[#E4F6DF] text-[#53A53F] p-2 rounded-md ">
                      NA
                    </span>
                  </div>
                )}
                <div className="text-[14px] w-[20%] flex justify-center items-center">
                  <span className="inline-block bg-[#FF2626] text-white p-2 rounded-md ">
                    {item?.booking_status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full mb-10 lg:mb-0 -mt-5 lg:mt-0 h-fit lg:h-[45vh] lg:hidden">
        {bookings.map((item, index) => {
          return (
            <div
              className="flex flex-col w-full bg-white p-4 gap-4 rounded-lg"
              key={index}
            >
              <div className="text-[16px] w-[100%] flex justify-start items-center font-extrabold h-fit">
                {item?.ground?.name}
              </div>

              <div className="flex flex-row gap-4 h-5 -mt-3">
                <div className="text-[12px] w-[35%] flex justify-center items-center gap-2">
                  <CalendarIcon size={12} />
                  <span className="inline-block text-xs whitespace-nowrap font-medium">
                    {" "}
                    {new Date(item?.date).toDateString()}
                  </span>
                </div>

                {item?.slots !== undefined && item?.slots.length > 0 ? (
                  <div className="text-[10px] w-[40%] flex justify-center items-center">
                    <span className="inline-block bg-[#E4F6DF] text-[#53A53F] p-2 rounded-md ">
                      {item?.slots[0].slot}
                    </span>
                  </div>
                ) : (
                  <div className="text-[10px] w-[40%] flex justify-center items-center">
                    <span className="inline-block bg-[#E4F6DF] text-[#53A53F] p-2 rounded-md ">
                      NA
                    </span>
                  </div>
                )}
                <div className="text-[10px] w-[15%] flex justify-center items-center">
                  <span className="inline-block bg-[#FF2626] text-white p-2 rounded-md ">
                    {item?.booking_status}
                  </span>
                </div>
              </div>

              <div className="text-[9px] w-[100%] text-[#676767] flex justify-start items-center gap-2">
                <FaLocationDot size={10} color="#D0D0D0" />
                <span className="inline-block ">{item?.venue?.address}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full flex items-center justify-center">
        <div
          className="px-16 py-3 rounded-full text-sm bg-gray-900 text-gray-100 cursor-pointer"
          onClick={() => {
            navigate("/play");
          }}
        >
          Browse All Grounds
        </div>
      </div>
    </>
  );
};

export default Booking;
