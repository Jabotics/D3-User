import { Button } from "../ui/button";
import eventImage from "../../../public/images/event-img.webp"
export const Events = () => {
    return (
      <div className="h-[50vh] overflow-hidden grid grid-cols-2 items-center ">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4 bg-zinc-800 text-zinc-200 h-full items-center">
            <div className="w-[75%] md:w-[45%] mt-20">
              <h2 className="text-lg md:text-2xl font-semibold tracking-wide">Upcoming Events </h2>
              <div className="mt-4 flex flex-row items-center gap-4">
                <span className="bg-yellow-400 rounded-md w-24 h-5 flex items-center justify-center text-stone-950 font-normal text-sm">
                  Sports Alive
                </span>
                <small className="text-lime-600">16th Feb 2024 </small>
              </div>
              <h5 className="text-[12px] md:text-[16px] mt-5 md:mt-1 font-semibold md:font-normal">The Role of Coaches in Youth Sports: How They Can Impact Your Child’s Development</h5>
              <p className="mt-3 text-[8px] md:text-xs leading-none md:leading-5">Youth sports have long been recognised as a crucial part of a child’s development. From improving physical health to teaching teamwork, sports provide children with numerous benefits.</p>
              <div className="mt-5 flex gap-4">
                <Button variant={'default'} className="rounded-full h-8 border border-zinc-100 text-xs">Become a Member</Button>
                <Button variant={'lowTheme'} className="text-zinc-50 bg-green-500 rounded-full h-8 text-xs hover:bg-green-400">Read More</Button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-1 h-full">
            <img src={eventImage} alt="event-image" className="h-full object-cover"/>
          </div>
      </div>
    )
  
  };
export default Events;  