import { RootState } from "@/store";
import { useGetBookingsQuery } from "@/store/actions/slices/bookingSlice";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";


const RightPanel = () => {
    const getBookings = useGetBookingsQuery({})
    const { bookings, title } = useAppSelector(
        (state: RootState) => state.booking
    );
    useEffect(() => {
        getBookings.refetch()
    }, [])

    return (
        <>
            <div className=" hidden flex-col gap-4 w-[1054px] h-[500px] sm:flex">
                {title == 'My Booking' && <>
                    <span className="inline-block text-[20px] font-bold">{title}</span>
                    <div id="bookings" className="w-full flex flex-col gap-4" >
                        <div className="bg-white flex flex-row justify-between p-4 rounded-lg">
                            <div className="text-[16px] w-[20%] flex justify-center">Ground Name</div>
                            <div className="text-[16px] w-[20%] flex justify-center">Location</div>
                            <div className="text-[16px] w-[20%] flex justify-center">Booking Date</div>
                            <div className="text-[16px] w-[20%] flex justify-center">Booking Time</div>
                            <div className="text-[16px] w-[20%] flex justify-center">Status</div>
                        </div>
                        {bookings.map((item, index) => {
                            return (
                                <div key={index} className="flex flex-row justify-between p-4 bg-white rounded-lg">
                                    <div className="text-[14px] w-[20%] flex justify-center items-center">{item?.ground?.name}</div>
                                    <div className="text-[14px] w-[20%] text-[#676767] flex justify-center items-center">{item?.venue?.address}</div>
                                    <div className="text-[14px] w-[20%] flex justify-center items-center ">{new Date(item?.date).toDateString()}</div>
                                    <div className="text-[14px] w-[20%] flex justify-center items-center">
                                        <span className="inline-block bg-[#E4F6DF] text-[#53A53F] p-2 rounded-md ">{item?.slots[0].slot}</span>
                                    </div>

                                    <div className="text-[14px] w-[20%] flex justify-center items-center"><span className="inline-block bg-[#FF2626] text-white p-2 rounded-md ">{item?.booking_status}</span></div>
                                </div>
                            )
                        })}
                    </div>
                </>}
            </div>
            <div className="flex flex-col gap-2 w-full sm:hidden">
                {bookings.map((item, index) => {
                    return (
                        <div className="flex flex-col w-full bg-white p-4 gap-4 rounded-lg" key={index} >
                            <div className="flex flex-row gap-1">
                                <div className="text-[14px] w-[30%] flex justify-center items-center">{new Date(item?.date).toDateString()}</div>
                                <div className="text-[14px] w-[30%] flex justify-center items-center"><span className="inline-block bg-[#E4F6DF] text-[#53A53F] p-2 rounded-md ">{item?.slots[0].slot}</span></div>
                                <div className="text-[14px] w-[30%] flex justify-center items-center"><span className="inline-block bg-[#FF2626] text-white p-2 rounded-md ">{item?.booking_status}</span></div>
                            </div>
                            <div className="text-[14px] w-[20%] flex justify-center items-center">{item?.ground?.name}</div>
                            <div className="text-[14px] w-[20%] text-[#676767] flex justify-center items-center">{item?.venue?.address}</div>
                        </div>
                    )
                })}
            </div>

        </>
    )

}

export default RightPanel