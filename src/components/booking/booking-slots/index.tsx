import { Button } from "@/components/ui/button";
import SelectBookingDate from "./SelectBookingDate";
import SelectSport from "./SelectSport";
import SlotsDetail from "./SlotsDetail";

const SlotBooking = ({ handleBook }: { handleBook: () => void }) => {
  const handleClick = () => {
    handleBook();
  };

  return (
    <div className="flex flex-col gap-3 -ml-10">
      <div className="flex flex-col gap-4 w-full h-24 border rounded-lg bg-[#FFFFFF]">
        <img src="/images/check.jpeg" alt="" className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="flex flex-col gap-4 w-full h-40 border rounded-lg bg-[#FFFFFF]">
        <SelectBookingDate />
      </div>
      <div className="flex flex-col gap-4 w-full border rounded-lg bg-[#FFFFFF]">
        <SlotsDetail />
      </div>
      <div className="flex flex-col gap-4 w-full border rounded-lg bg-[#FFFFFF]">
        <SelectSport />
        <div className="flex flex-row justify-center items-center self-center mt-auto w-full px-2 border-t border-t-[#53a53f56]">
          <p className="p-0 m-0 text-[#53a53f9d] text-[10px] ">
            Offer 10% additional discount for 3 hours booking on weekdays only
          </p>
        </div>
      </div>
      <Button
        className="sm:hidden w-[90%] self-center bg-[#53A53F] h-7 text-[16px] font-bold"
        onClick={handleClick}
      >
        Next
      </Button>
      <div className="sm:hidden h-1"></div>
    </div>
  );
};

export default SlotBooking;
