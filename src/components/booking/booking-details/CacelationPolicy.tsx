import { MdKeyboardArrowRight } from "react-icons/md"


const CacelationPolicy = () => {
  return (
    <div className="flex flex-row items-center border rounded-lg bg-[#FFFFFF] p-4 gap-4">
       <div className="flex flex-col me-auto">
           <span className="inline-block text-[16px] text-[#000000] font-semibold">View Cancellation Policy</span>
           <span className="inline-block text-[12px]">Cancellation & things to remembe</span>
       </div>
       <MdKeyboardArrowRight size={20}/>
    </div>
  )
}

export default CacelationPolicy