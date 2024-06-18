import { RootState } from "@/store";
import { setSelectedSlots } from "@/store/actions/slices/slotsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const formatTime = (time: string): React.JSX.Element => {
  const reqTime = time.replace(/\s/g, "");

  const reqTimeStart = reqTime.split("-")[0];
  const startHour = reqTimeStart.split(":")[0];
  const startMin = reqTimeStart.split(":")[1];

  const reqTimeEnd = reqTime.split("-")[1];
  const endHour = reqTimeEnd.split(":")[0];
  const endMin = reqTimeEnd.split(":")[1];

  return (
    <span className="flex items-center gap-2">
      <span>
        <span className="text-sm tracking-tighter sm:tracking-widest">{startHour}</span>
        <span className="text-[10px] tracking-wide">{startMin.replace(/(\d{2})(AM|PM)/, '$1 $2')}</span>
      </span>
      <span>-</span>
      <span>
        <span className="text-sm tracking-widest">{endHour}</span>
        <span className="text-[10px] tracking-wide">{endMin.replace(/(\d{2})(AM|PM)/, '$1 $2')}</span>
      </span>
    </span>
  );
};

const SlotsDetail = () => {
  const dispatch = useAppDispatch();
  const { allSlots, selectedSlots } = useAppSelector(
    (state: RootState) => state.slots
  );

  return (
    <div className="flex flex-col p-4 relative">
      <span className="inline-block text-sm font-semibold">
        Booked Slots{" "}
        <span className="text-[#53A53F]">({Number(selectedSlots.length)})</span>
      </span>
      <span className="inline-block text-[16px] font-light text-[#676767]">
        All Slots Available
      </span>
      <div className="flex flex-row items-center gap-2 py-2">
        <MdOutlineCheckBoxOutlineBlank size={15} color="gray" />
        <span className="inline-block text-sm mr-4">Booked</span>
        <MdOutlineCheckBoxOutlineBlank size={15} color="#53A53F" />
        <span className="inline-block text-sm">Available</span>
      </div>
      <div className="w-full max-h-[30vh] overflow-x-hidden overflow-y-auto booked-slot mt-5">
        <div
          className={`flex flex-row w-full sm:w-[65%] gap-2 flex-wrap justify-start mt-3 ${
            allSlots.length === 0 && "min-h-[15vh]"
          }`}
        >
          {allSlots.length !== 0 ? (
            allSlots.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center gap-2 w-fit h-20`}
                >
                  <div
                    className={`flex items-center justify-center w-full h-10 border-[1px] border-gray-300 ${
                      item.available
                        ? "border-[#53A53F] cursor-pointer"
                        : "text-gray-600 bg-gray-300 cursor-not-allowed"
                    } ${
                      selectedSlots.includes(item.id)
                        ? "bg-[#53A53F] text-gray-200"
                        : "bg-[#53a53f1e] text-[#53A53F]"
                    } rounded-md px-2 whitespace-nowrap text-xs`}
                    onClick={() => {
                      if (item.available) {
                        dispatch(setSelectedSlots(item.id));
                      }
                    }}
                  >
                    {formatTime(item.slot)}
                  </div>

                  <div className="font-semibold text-xs tracking-widest text-[#3f862d6b] h-8">
                    {item.available && `₹${item.price}`}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-full h-[50%] bg-[#53A53F] rounded-2xl flex flex-col items-center justify-center">
                <h3 className="font-semibold text-lg text-gray-200">
                  Please Select The Date First.
                </h3>
                <p className="text-xs text-gray-300">
                  You can book slots of one day only in a single booking.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotsDetail;
