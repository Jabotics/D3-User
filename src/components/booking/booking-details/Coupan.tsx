import { GiTicket } from "react-icons/gi";
import { MdKeyboardArrowRight } from "react-icons/md";
const Coupan = () => {
  return (
    <div className="flex flex-row items-center border rounded-lg bg-[#FFFFFF] p-4 gap-4">
       <GiTicket size={24}/>
       <div className="flex flex-col me-auto">
           <span className="inline-block text-[16px] text-[#000000] font-semibold">Apply Coupan</span>
           <span className="inline-block text-[12px]">Apply Coupan Get Discount</span>
       </div>
       <MdKeyboardArrowRight size={20}/>
    </div>
  )
}

export default Coupan