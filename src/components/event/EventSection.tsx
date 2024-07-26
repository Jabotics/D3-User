import EventCard from "./EventCard"
import { RootState } from "@/store";
import { useFetchEventsQuery } from "@/store/actions/slices/eventSlice";
import { useAppSelector } from "@/store/hooks";
import EventRegistrationForm from "./EventRegistrationForm";

const EventSection = () => {
    useFetchEventsQuery({})
    const { events } = useAppSelector((state: RootState) => state.event);
    return (
        <div className="w-[100%] flex flex-col gap-4 bg-[#f3f4f6] p-4">
            <div className="flex mt-10 md:mb-4 self-center">
                <span className="text-[20px] font-bold">Event Details</span>
            </div>
            {events && events.length > 0 ? (
                <div className="flex flex-col md:flex-row gap-2 w-full">
                    <EventCard event={events[0]} />
                    <EventRegistrationForm eventId={events[0]?.id} />
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-full">
                    <span className="text-lg">No events available</span>
                </div>
            )}

        </div>
    )
}

export default EventSection