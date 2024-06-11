

const SelectSport = () => {
  return (
    <div className="flex flex-col gap-4 p-4 ">
    <span className="inline-block text-[20px] font-semibold">Select Sports</span>
    <div className="flex flex-row w-full gap-2 flex-wrap justify-start ps-8">
    {Array.from({ length: 2 }).map((_, index) => (
           <div key={index} className="flex flex-row justify-center w-[40%] sm:w-[40%] md:w-[30%] lg:w-[20%] xl:w-[15%] border-2 border-[#53A53F] rounded-2xl p-2 ">
               <span className="text-[12px]">Box Football </span>
           </div>
        ))}
    </div>
   
</div>
  )
}

export default SelectSport