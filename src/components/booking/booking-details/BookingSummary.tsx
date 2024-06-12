import { Button } from "@/components/ui/button"


const BookingSummary = () => {
  return (
     <div className="flex flex-col bg-[#FFFFFF] border rounded-lg p-4 gap-4">
        <span className="inline-block text-[16px] font-semibold">Booking Summary</span>
        <div className="flex flex-row justify-between">
        <span className="inline-block text-[12px]">Date</span>
        <span className="inline-block text-[12px] text-[#000000] font-semibold"> 07-12-2023</span>
        </div>
        <div className="flex flex-row justify-between">
        <span className="inline-block text-[12px]">Sport</span>
        <span className="inline-block text-[12px] text-[#000000] font-semibold">Cricket</span>
        </div>
        <div className="flex flex-row justify-between">
        <span className="inline-block text-[12px]">Turf Size</span>
        <span className="inline-block text-[12px] text-[#000000] font-semibold">70ft x 110ft</span>
        </div>
        <div className="flex flex-row justify-between">
        <span className="inline-block text-[12px]">Time</span>
        <span className="inline-block text-[12px] text-[#000000] font-semibold">  11:00AM - 13:00PM</span>
        </div>
        <div className="flex flex-row justify-between border-t-2 border-dashed pt-1">
        <span className="inline-block text-[12px]">Sub total </span>
        <span className="inline-block text-[12px] text-[#000000] font-semibold"> ₹800.00</span>
        </div>
        <div className="flex flex-row justify-between border-t-2 border-solid border-black-700 p-1">
        <span className="inline-block text-[12px]  text-[#000000] font-bold">Total</span>
        <span className="inline-block text-[12px] text-[#000000] font-bold">   ₹800.00</span>
        </div>
        <Button className="bg-[#252525]">Proceed INR 800</Button>
     </div>
  )
}

export default BookingSummary