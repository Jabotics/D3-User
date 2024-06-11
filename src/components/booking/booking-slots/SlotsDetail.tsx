import { FaCircle } from "react-icons/fa6"


const SlotsDetail = () => {

  return (
    <div className="flex flex-col gap-4 p-4 ">
         <span className="inline-block text-[20px] font-semibold">Booked Slots <span className="text-[#53A53F]">(0)</span></span>
         <span className="inline-block text-[16px] font-semibold text-[#676767]">All Slots Available</span>
         <div className="flex flex-row items-center gap-2 py-2" >
         <FaCircle size={10} color="#FF2626"/>
         <span className="inline-block">Booked</span>
         <FaCircle size={10} color="#53A53F"/>
         <span className="inline-block">Available</span>
         </div>
         <div className="flex flex-row w-full gap-2 flex-wrap justify-start ps-8">
         {Array.from({ length: 10 }).map((_, index) => (
           <div key={index} className="flex flex-row justify-center w-[40%] sm:w-[40%] md:w-[30%] lg:w-[20%] xl:w-[15%] border-2 border-[#53A53F] rounded-md p-2 ">
               <span className="text-[12px]">12.00 - 01.00 </span>
           </div>
        ))}
         </div>
        
    </div>
  )
}

export default SlotsDetail