import EventSection from "@/components/event/EventSection";
import { useEffect } from "react";
// import FilterSection from "@/components/event/FilterSection";

const Event = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="flex flex-row gap-2 min-h-[90vh] max-h-fit w-[100%] self-center justify-center p-4">
        {/* <FilterSection /> */}
        <EventSection />
      </div>
    </>
  );
};

export default Event;
