import HowitworksCard from "../hiw-card/card";
import "react-multi-carousel/lib/styles.css";

const hiwdata = [
  {
    count: 1,
    title: "Search Your Sports",
    description:
      "Are you looking to play after work, organize your Sunday Five match?",
    icon: "/images/hiw-icon1.svg",
  },
  {
    count: 2,
    title: "Reserve Your Slots",
    description:
      "Click Book Now Button to make online booking & secure payment",
    icon: "/images/reserv-slot.svg",
  },
  {
    count: 3,
    title: "Go & Play",
    description:
      "You’ve found a stunning turf or court, booked and now time to play.",
    icon: "/images/play.svg",
  },
];

export const HowitWorks = () => {
  return (
    <div className="w-screen overflow-hidden py-24 text-center bg-lightGreen">
      <div className="container">
        <h2 className="text-3xl font-medium">How It Works</h2>
        <div className="flex items-center gap-2 justify-center mt-10">
          {hiwdata.map((hiwdata, index) => (
            <HowitworksCard
              key={index}
              count={hiwdata.count}
              title={hiwdata.title}
              icon={hiwdata.icon}
              description={hiwdata.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default HowitWorks;
