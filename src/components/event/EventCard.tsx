import { APIEndPoints } from "@/APIEndpoint"
import { IEvent } from "@/interface/data"



const EventCard = ({ event }: { event: IEvent }) => {


    const convertDateFormat = (item: string) => {
        const date = new Date(item);

        // Get day of the week
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfWeek = days[date.getDay()];

        // Get day of the month
        const dayOfMonth = date.getDate();

        // Get month
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = months[date.getMonth()];

        // Format the date
        const formattedDate = `${dayOfWeek} ${dayOfMonth}, ${month}`;
        return formattedDate;
    }
    const startDate = convertDateFormat(event?.start_date);
    const endDate = convertDateFormat(event?.end_date);
    return (
        <div className="flex flex-col gap-2 w-[100%] md:w-[60%]  items-center rounded-lg bg-[#f3f4f6] px-1">
            <div className="flex flex-col border-2 rounded-lg w-[100%] md:w-[80%]">
                <img src={`${APIEndPoints.BackendURL}/${event?.image}`} alt='img' className="w-[100%] h-[240px] md:h-[400px] object-cover bg-red border-t-1 rounded-t-md" />
                <div className="p-4 bg-black text-white border-b-1 rounded-b-md flex flex-col md:flex-row justify-between">
                    <span className="inline-block ">{startDate} - {endDate}</span>
                    <span className="inline-block ">Registration {event?.registration_status}</span>
                </div>
            </div>
            <div className="flex flex-col md:w-[80%] w-[100%] gap-1 p-1 ">
                <span className="inline-block text-[18px] font-semibold self-start">{event?.name}</span>
                <span className="inline-block text-[16px] font-semibold">{`${event?.grounds[0]?.name}, ${event?.grounds[0]?.venue?.name}, ${event?.grounds[0]?.venue?.address}`}</span>
                <span className="inline-block text-[16px] font-normal">{event?.description}</span>
            </div>
        </div>
    )
}

export default EventCard