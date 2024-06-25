import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useGetGroundQuery } from "@/store/actions/slices/groundSlice";
import { useAddSlotsMutation } from "@/store/actions/slices/slotsSlice";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { toast } from "sonner";

const BookingSummary = () => {
  const {
    allSlots,
    selectedSlots,
    listOfPrices,
    selectedGroundId,
  } = useAppSelector((state: RootState) => state.slots);
  const { userData } = useAppSelector(
    (state: RootState) => state.auth
  );
  const getGround = useGetGroundQuery({ id: selectedGroundId })
  const groundDetails = useAppSelector((state: RootState) => state.ground.grounds)
  const { selectedDate } = useAppSelector(
    (state: RootState) => state.slots
  );
  const { newPrice } = useAppSelector((state: RootState) => state.promocode);
  const totalAmount = listOfPrices.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.value;
  }, 0);
  const selectedPromo = useAppSelector((state: RootState) => state.promocode.selectedPromo)
  useEffect(() => {
    getGround.refetch()
  }, [selectedGroundId]);

  const [add] = useAddSlotsMutation()
  const handleSlotBooking = async () => {
    try {
      const res: any = await add({
        city: groundDetails[0].city?._id,
        ground: groundDetails[0].id,
        slots: selectedSlots,
        date: selectedDate,
        venue: groundDetails[0].venue?._id,
        customer: userData?.id,
        amount: totalAmount
      }).unwrap()
      console.log(res)
    }
    catch (error) {
      toast.error((error as { data: { message: string } })?.data?.message)
    }
  }


  return (
    <div className="flex flex-col bg-[#FFFFFF] border rounded-lg p-4 gap-4">
      <span className="inline-block text-[16px] font-semibold">
        Booking Summary
      </span>
      <div className="flex flex-row justify-between">
        <span className="inline-block text-[12px]">Date</span>
        <span className="inline-block text-[12px] text-[#000000] font-semibold">
          {" "}
          07-12-2023
        </span>
      </div>
      <div className="flex flex-row justify-between">
        <span className="inline-block text-[12px]">Sport</span>
        <span className="inline-block text-[12px] text-[#000000] font-semibold">
          Cricket
        </span>
      </div>
      <div className="flex flex-row justify-between">
        <span className="inline-block text-[12px]">Turf Size</span>
        <span className="inline-block text-[12px] text-[#000000] font-semibold">
          70ft x 110ft
        </span>
      </div>
      {selectedSlots.length !== 0 && (
        <div className="flex flex-row justify-between">
          <span className="inline-block text-[12px]">Time</span>
          <div className="flex flex-col">
            {selectedSlots.map((item, index) => {
              const slot = allSlots.find((i) => i.id === item)?.slot;
              return (
                <span
                  className="inline-block text-[12px] text-[#000000] font-semibold text-end"
                  key={index}
                >
                  {slot}
                </span>
              );
            })}
          </div>
        </div>
      )}
      {selectedSlots.length !== 0 && (
        <div className="flex flex-row justify-between border-t-2 border-dashed pt-1">

          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between ">
              <span className="inline-block text-[12px]">Sub total </span>
              <span
                className="inline-block text-[12px] text-[#000000] font-semibold w-16 text-end"

              >
                {`₹${totalAmount}`}
              </span>
            </div>

            {(newPrice.discount > 0 && selectedPromo !== null) &&
              <div className="flex flex-row justify-between">
                <span className="inline-block text-[12px] text-[#53A53F] ">Coupan Code {selectedPromo && selectedPromo?.code}</span>
                <span className="inline-block text-[12px] text-[#53A53F]  font-semibold w-16 text-end">
                  {`- ₹${newPrice.discount}`}
                </span>
              </div>

            }
          </div>
        </div>
      )}
      {selectedSlots.length !== 0 && (
        <div className="flex flex-row justify-between border-t-2 border-solid border-black-700 p-1">
          <span className="inline-block text-[12px]  text-[#000000] font-bold">
            Total
          </span>
          <span className="inline-block text-[12px] text-[#000000] font-bold">
            {(newPrice.discount > 0 && selectedPromo !== null) ? totalAmount - newPrice.discount : `₹${totalAmount}`}
          </span>
        </div>
      )}
      {selectedSlots.length !== 0 && (
        <Button className="bg-[#252525]" onClick={handleSlotBooking}>Proceed INR   {(newPrice.discount > 0 && selectedPromo !== null) ? totalAmount - newPrice.discount : `₹${totalAmount}`}</Button>
      )}
    </div>
  );
};

export default BookingSummary;
