import EventSection from "@/components/event/EventSection";
// import FilterSection from "@/components/event/FilterSection";

const Event = () => {
    return (
        <>
            <div className="flex flex-row gap-2 min:h-[90vh] w-[100%] self-center justify-center p-4">
                {/* <FilterSection /> */}
                <EventSection />
            </div>

        </>
    )
}

export default Event;