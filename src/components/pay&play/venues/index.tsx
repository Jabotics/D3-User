import Sort from "./Sort"
import VenueItem from "./VenueItem"

const Venues=()=>{
    return (
        <div className="flex flex-col gap-8 w-[100%] sm:w-[70%] md:w-[70%] lg:w-[80%] xl:w-[60%] px-0 sm:px-8">
            <div className="flex flex-row border-b-2 pb-8 items-center">
                <span className="inline-block me-auto text-[16px] sm:text-[20px]"><b className="text-[#53A53F]">Total 15</b> results found</span>
                <Sort/>
            </div>
            <VenueItem/>
            <VenueItem/>
            <VenueItem/>
            <VenueItem/>
            <VenueItem/>
            <div className="self-end flex flex-row gap-4">
                 <span className="inline-block text-[14px] font-semibold cursor-pointer">Page :</span>
                 <button className="inline-block text-[12px] w-[20px] h-[20px] font-semibold cursor-pointer bg-[#53A53F] text-white rounded-md">1</button>
                 <button className="inline-block text-[12px]  w-[20px] h-[20px] font-semibold cursor-pointer bg-[#53A53F] text-white rounded-md">2</button>
                 <button className="inline-block text-[12px]  w-[20px] h-[20px] font-semibold cursor-pointer bg-[#53A53F] text-white rounded-md">3</button>
                 <button className="inline-block text-[12px]  w-[20px] h-[20px] font-semibold cursor-pointer bg-[#53A53F] text-white rounded-md">4</button>
            </div>
        </div>
    )
}

export default Venues