import { RootState } from "@/store";
import { useGetBookingsQuery } from "@/store/actions/slices/bookingSlice";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      <div className="hidden flex-col gap-4 w-full h-[500px] sm:flex">
        <span className="inline-block text-sm font-base text-gray-500">
          {title}
        </span>
        <div id="bookings" className="w-full flex flex-col gap-4">
          <div className="bg-white flex flex-row justify-between p-4 rounded-lg">
            <div className="text-sm w-1/6 flex justify-center font-light tracking-wide">
              Ground Name
            </div>
            <div className="text-sm w-1/6 flex justify-center font-light tracking-wide">
              Location
            </div>
            <div className="text-sm w-1/6 flex justify-center font-light tracking-wide">
              Booking Date
            </div>
            <div className="text-sm w-1/3 flex justify-center font-light tracking-wide">
              Booking Time
            </div>
            <div className="text-sm w-1/6 flex justify-center font-light tracking-wide">
              Status
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
                <div className="text-[14px] w-[20%] text-[#676767] flex justify-center items-center gap-2">
                  <FaLocationDot size={16} color="#D0D0D0" />
                  <span className="inline-block ">{item?.venue?.address}</span>
                </div>
                <div className="text-[14px] w-[20%] flex justify-center items-center gap-2">
                  <CalendarIcon size={16} />
                  <span className="inline-block ">
                    {" "}
                    {new Date(item?.date).toDateString()}
                  </span>
                </div>
                {item?.slots !== undefined && item?.slots.length > 0 ? (
                  <div className="text-[14px] w-[25%] flex justify-center items-center">
                    <span className="inline-block bg-[#E4F6DF] text-[#53A53F] p-2 rounded-md ">
                      {item?.slots[0]?.slot}
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
      <div className="flex flex-col gap-2 w-full h-[45vh] sm:hidden">
        {bookings.map((item, index) => {
          return (
            <div
              className="flex flex-col w-full bg-white p-4 gap-4 rounded-lg"
              key={index}
            >
              <div className="flex flex-row gap-4">
                <div className="text-[12px] w-[35%] flex justify-center items-center gap-2">
                  <CalendarIcon size={16} />
                  <span className="inline-block ">
                    {" "}
                    {new Date(item?.date).toDateString()}
                  </span>
                </div>

                {/* {item?.slots !== undefined && item?.slots.length > 0 ? (
                  <div className="text-[12px] w-[45%] flex justify-center items-center">
                    <span className="inline-block bg-[#E4F6DF] text-[#53A53F] p-2 rounded-md ">
                      {item?.slots[0].slot}
                    </span>
                  </div>
                ) : (
                  <div className="text-[12px] w-[45%] flex justify-center items-center">
                    <span className="inline-block bg-[#E4F6DF] text-[#53A53F] p-2 rounded-md ">
                      NA
                    </span>
                  </div>
                )} */}
                <div className="text-[12px] w-[15%] flex justify-center items-center">
                  <span className="inline-block bg-[#FF2626] text-white p-2 rounded-md ">
                    {item?.booking_status}
                  </span>
                </div>
              </div>
              <div className="text-[12px] w-[100%] flex justify-start items-center">
                {item?.ground?.name}
              </div>
              <div className="text-[12px] w-[100%] text-[#676767] flex justify-start items-center gap-2">
                <FaLocationDot size={16} color="#D0D0D0" />
                <span className="inline-block ">{item?.venue?.address}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="w-full flex items-center justify-center">
        <div className="px-16 py-3 rounded-full text-sm bg-gray-900 text-gray-100 cursor-pointer" onClick={() => {
                  navigate("/play");
                }}>
          Browse All Grounds
        </div>
      </div>
    </>
  );
};

export default Booking;
