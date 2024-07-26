import EventCard from "./EventCard"
import { RootState } from "@/store";
import { useFetchEventsQuery } from "@/store/actions/slices/eventSlice";
import { useAppSelector } from "@/store/hooks";
import EventRegistrationForm from "./EventRegistrationForm";
import { useSearchParams } from "react-router-dom";

const EventSection = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    useFetchEventsQuery({})
    const { events } = useAppSelector((state: RootState) => state.event);
    const eventData = events.filter((event) => { return event?.id === id })
    return (
        <div className="w-[100%] flex flex-col gap-4 bg-[#f3f4f6] p-4">
            <div className="flex mt-6 md:mb-4 self-center">
                <span className="text-[20px] font-bold">Event Details</span>
            </div>
            {eventData && eventData.length > 0 ? (
                <div className="flex flex-col md:flex-row gap-2 w-full">
                    <EventCard event={eventData[0]} />
                    <EventRegistrationForm eventId={eventData[0]?.id} />
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