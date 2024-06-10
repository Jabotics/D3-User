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
            <div className="self-end flex flex-row gap-2">
                 <span className="inline-block text-[14px] font-semibold">Page :</span>
                 <span className="inline-block text-[14px] font-semibold">1</span>
                 <span className="inline-block text-[14px] font-semibold">2</span>
                 <span className="inline-block text-[14px] font-semibold">3</span>
                 <span className="inline-block text-[14px] font-semibold">4</span>
            </div>
        </div>
    )
}

export default Venues