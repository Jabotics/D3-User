import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



const SelectBookingDate = () => {
  return (
    <div className="flex flex-col p-4 gap-4 w-full">
       <span className="inline-block text-[20px] font-semibold">Select Booking Date</span>
       <Carousel className="w-[70%] md:w-[80%] lg:w-[85%] self-center disabled:opacity-5 border-zinc-900">
       <CarouselContent className="-ml-1 flex flex-row gap-4 w-[60px]">
        {Array.from({ length: 9 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 basis:[40px] sm:basis-[80px] md:basis-[120px] lg:basis-[140px]">
            <div className="p-1 flex flex-col items-center border rounded-md gap-1 hover:bg-[#53A53F] text-[#A4A3A3] hover:text-white" >
               <span className="inline-block">Tue</span>
               <span className="inline-block">5</span>
               <span className="inline-block">Dec</span> 
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  )
}

export default SelectBookingDate