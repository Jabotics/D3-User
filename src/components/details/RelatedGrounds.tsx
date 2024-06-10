import RelatedGroundsCarousel from "@/components/details/RelatedGroundsCarousel";

const RelatedGrounds = () => {
    return (
        <div className="flex justify-center flex-col items-center mt-10">
            <div className="flex w-[19rem] xs:w-[21rem] sm:w-[36rem] md:w-[44rem] lg:w-[56rem] xl:w-[1435px] mb-4 gap-4">
                <h1 className="text-lg md:text-2xl font-bold">Related Grounds</h1>
                <button className="border md:p-1 w-16 p-0 rounded-3xl md:w-24 bg-[#fb4c03] text-white font-medium md:text-sm text-xs">Popular</button>
                <button className="border text-xs w-16 rounded-3xl">New</button>
            </div>
            <div className="flex flex-col justify-center w-[19rem] xs:w-[21rem] sm:w-[36rem] md:w-[44rem] lg:w-[56rem] xl:w-[1435px]">
                <RelatedGroundsCarousel />
            </div>
        </div>
    )
}

export default RelatedGrounds