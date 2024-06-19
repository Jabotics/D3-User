import { FaCircle } from "react-icons/fa6";

const Facilities = () => {
  return (
    <div className="my-10">
      <h1 className="text-2xl font-medium">Our Facilities</h1>
      <p className="mt-4 text-sm">
        D3 Sports Arena boasts a state-of-the-art multi-sports complex designed
        to cater to a diverse range of athletic pursuits. Our facilities
        include:
      </p>

      <div className="w-full flex items-start mt-7 mb-3">
        <div className="w-8">1.</div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg tracking-wide font-medium mb-4">
            Indoor Facilities
          </h3>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Basketball Courts:{" "}
            </span>
            <span className="ml-2">
              Multiple full-sized courts equipped with high-quality flooring and
              lighting, ideal for training and tournaments.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Badminton Courts:{" "}
            </span>
            <span className="ml-2">
              Professional-grade courts for both recreational play and
              competitive matches.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Squash Courts:{" "}
            </span>
            <span className="ml-2">
              Modern courts that meet international standards, perfect for
              enthusiasts and professionals alike.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Fitness Center:{" "}
            </span>
            <span className="ml-2">
              A fully equipped gym with the latest fitness equipment, offering
              personalized training programs and group classes.
            </span>
          </span>
        </div>
      </div>

      <div className="w-full flex items-start mt-7 mb-3">
        <div className="w-8">2.</div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg tracking-wide font-medium mb-4">
            Outdoor Facilities
          </h3>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Football Field:{" "}
            </span>
            <span className="ml-2">
              A well-maintained, regulation-size field for training sessions,
              leagues, and tournaments.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Tennis Courts:{" "}
            </span>
            <span className="ml-2">
              High-quality courts suitable for all levels of play, from
              beginners to advanced players.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Running Track:{" "}
            </span>
            <span className="ml-2">
              A meticulously designed track for runners of all levels, promoting
              cardiovascular fitness and endurance.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Multi-Purpose Fields:{" "}
            </span>
            <span className="ml-2">
              Versatile spaces that can be adapted for various sports and
              activities, including cricket, rugby, and more.
            </span>
          </span>
        </div>
      </div>

      <div className="w-full flex items-start mt-7 mb-3">
        <div className="w-8">3.</div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg tracking-wide font-medium mb-4">
            Additional Amenities
          </h3>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Swimming Pool:{" "}
            </span>
            <span className="ml-2">
              An Olympic-sized pool for competitive swimming, training, and
              leisure activities.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Café and Lounge:{" "}
            </span>
            <span className="ml-2">
              A comfortable space for athletes and visitors to relax, socialize,
              and refuel with nutritious snacks and beverages.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Pro Shop:{" "}
            </span>
            <span className="ml-2">
              A well-stocked shop offering sports equipment, apparel, and
              accessories to meet all your sporting needs.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Event Spaces:{" "}
            </span>
            <span className="ml-2">
              Versatile spaces for hosting sports events, workshops, seminars,
              and community gatherings.
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
