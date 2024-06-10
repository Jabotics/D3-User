import RelatedGroundsCarousel from "@/components/details/RelatedGroundsCarousel";

const RelatedGrounds = () => {
    return (
        <div className="flex justify-center flex-col items-center">
            <div className="flex w-96 md:w-[1435px] mb-4 gap-4">
                <h1 className="text-lg md:text-2xl font-bold">Related Grounds</h1>
                <button className="border p-1 rounded-3xl w-24 bg-[#fb4c03] text-white font-medium text-sm">Popular</button>
                <button className="border p-1 rounded-3xl w-20 font-medium text-sm">New</button>
            </div>
            <div className="flex flex-col justify-center w-[20rem] md:w-[1435px]">
                <RelatedGroundsCarousel />
            </div>
        </div>
    )
}

export default RelatedGrounds