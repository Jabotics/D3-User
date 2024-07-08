import { 
  // useEffect, 
  useState 
} from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchEventsQuery } from "@/store/actions/slices/eventSlice";
import { useAppSelector } from "@/store/hooks";
import { APIEndPoints } from "@/APIEndpoint";
import { Button } from "../ui/button";

const monthMap: { [key: number | string]: string } = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const formattedTimeOfEvent = (time: string) => {
  const startingDate = time?.split(",")[0];
  if (!startingDate) return ["", "", ""];
  const [startMonth, startDate, startYear] = startingDate.split("/");
  return [startMonth, startDate, startYear];
};

const Events = () => {
  const { events } = useAppSelector((state) => state.event);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const { isLoading } = useFetchEventsQuery({});

  const [showReadMore, setShowReadMore] = useState<boolean>(false);

  // useEffect(() => {
  //   if (events?.length) {
  //     const interval = setInterval(() => {
  //       setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
  //     }, 10000);

  //     return () => clearInterval(interval);
  //   }
  // }, [events]);

  if (isLoading || !events?.length) {
    return <div></div>;
  }

  const [startMonth, startDate, startYear] = formattedTimeOfEvent(
    events[currentEventIndex]?.start_date || ""
  );

  const itemVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
    initialSlide: currentEventIndex, // Set initial slide based on currentEventIndex
    afterChange: (index: number) => {
      setCurrentEventIndex(index); // Update currentEventIndex after slide change
    },
  };

  return (
    <div className="h-[50vh] overflow-hidden">
      <div
        key={currentEventIndex}
        className="grid grid-cols-2 items-center h-full"
      >
        {/* Left column (content) */}
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-4 bg-zinc-800 text-zinc-200 h-full items-center">
          <div className="w-[75%] md:w-[45%] mt-20">
            <h2 className="text-lg md:text-2xl font-semibold tracking-wide">
              Upcoming Events
            </h2>
            <div className="mt-4 flex flex-row items-center gap-4">
              <span className="bg-yellow-400 rounded-md w-24 h-5 flex items-center justify-center text-stone-950 font-normal text-sm">
                Sports Alive
              </span>
              {startDate && startMonth && startYear && (
                <small className="text-lime-600">
                  {startDate}th {monthMap[startMonth]} {startYear}
                </small>
              )}
            </div>
            <motion.h5
              className="text-[12px] md:text-[16px] mt-5 md:mt-1 font-semibold md:font-normal"
              initial="initial"
              animate="animate"
              variants={itemVariants}
              transition={{ duration: 0.6 }}
            >
              {events[currentEventIndex]?.name}
            </motion.h5>
            {showReadMore ? (
              <div className="w-full h-32 scroll-nobg overflow-x-hidden overflow-y-auto">
                <motion.span
                  initial={{
                    opacity: 0,
                    y: -100,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className="text-xs leading-tight"
                >
                  {events[currentEventIndex]?.description}
                </motion.span>
              </div>
            ) : (
              <>
                <motion.span
                  className="text-sm flex items-center mt-2 text-gray-300 gap-3"
                  initial="initial"
                  animate="animate"
                  variants={itemVariants}
                  transition={{ duration: 0.6 }}
                >
                  <h3>Duration : </h3>
                  <h2>{events[currentEventIndex]?.duration}</h2>
                </motion.span>
                <span className="text-sm flex flex-col items-start mt-1 text-gray-300 gap-3 mb-3">
                  <h3>All Venues : </h3>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    variants={itemVariants}
                    transition={{ duration: 0.6 }}
                  >
                    {events[currentEventIndex]?.grounds.map((item, index) => (
                      <p
                        key={index}
                        className="px-2 rounded-md bg-gray-400 text-gray-50"
                      >
                        {item.venue.name}
                      </p>
                    ))}
                  </motion.div>
                </span>
              </>
            )}
            <div className="mt-5 flex gap-4">
              <Button
                variant={"default"}
                className="rounded-full h-8 border border-zinc-100 text-xs"
              >
                Become a Member
              </Button>
              <Button
                variant={"lowTheme"}
                className="text-zinc-50 bg-green-500 rounded-full h-8 text-xs hover:bg-green-400"
                onClick={() => {
                  setShowReadMore(!showReadMore);
                }}
              >
                {showReadMore ? "Read Less" : "Read More"}
              </Button>
            </div>
          </div>
        </div>
        {/* Right column (image carousel) */}
        <div className="hidden lg:block lg:col-span-1 h-full">
          <Slider {...settings}>
            {events.map((event, index) => (
              <div key={index}>
                {event.image && (
                  <img
                    src={`${APIEndPoints.BackendURL}/${event.image}`}
                    alt={`event-image-${index}`}
                    className="h-full object-cover"
                  />
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Events;
