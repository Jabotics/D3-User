import { FaCircle } from "react-icons/fa6";

const Services = () => {
  return (
    <div className="my-10">
      <h1 className="text-xl lg:text-2xl font-medium">Our Programs and Services</h1>
      <p className="mt-4 text-xs md:text-sm">
        At D3 Sports Arena, we offer a wide array of programs and services
        designed to cater to athletes of all ages and skill levels:
      </p>

      <div className="w-full flex items-start mt-7 mb-3">
        <div className="w-8">1.</div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm lg:text-lg tracking-wide font-medium mb-4">
            Coaching and Training
          </h3>
          <span className="text-xs md:text-sm mb-5 md:mb-0 flex items-start md:items-center justify-start">
            <span className="font-semibold flex items-center gap-2 w-3/5 md:w-fit">
              <FaCircle size={5} className="hidden md:inline-block" /> Youth Development Programs:{" "}
            </span>
            <span className="ml-2">
              Tailored programs for young athletes to develop their skills,
              discipline, and sportsmanship.
            </span>
          </span>
          <span className="text-xs md:text-sm mb-5 md:mb-0 flex items-start md:items-center justify-start">
            <span className="font-semibold flex items-center gap-2 w-3/5 md:w-fit">
              <FaCircle size={5} className="hidden md:inline-block" /> Adult Training Programs:{" "}
            </span>
            <span className="ml-2">
              Specialized training sessions for adults looking to improve their
              fitness, skills, and overall well-being.
            </span>
          </span>
          <span className="text-xs md:text-sm mb-5 md:mb-0 flex items-start md:items-center justify-start">
            <span className="font-semibold flex items-center gap-2 w-3/5 md:w-fit">
              <FaCircle size={5} className="hidden md:inline-block" /> Professional Coaching:{" "}
            </span>
            <span className="ml-2">
              Expert coaches with extensive experience in their respective
              sports, providing personalized guidance and support.
            </span>
          </span>
        </div>
      </div>

      <div className="w-full flex items-start mt-7 mb-3">
        <div className="w-8">2.</div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm lg:text-lg tracking-wide font-medium mb-4">
            Events and Competitions
          </h3>
          <span className="text-xs md:text-sm mb-5 md:mb-0 flex items-start md:items-center justify-start">
            <span className="font-semibold flex items-center gap-2 w-3/5 md:w-fit">
              <FaCircle size={5} className="hidden md:inline-block" /> Local and International Tournaments:{" "}
            </span>
            <span className="ml-2">
              We host a variety of tournaments, bringing together athletes from
              around the globe to compete and showcase their talents.
            </span>
          </span>
          <span className="text-xs md:text-sm mb-5 md:mb-0 flex items-start md:items-center justify-start">
            <span className="font-semibold flex items-center gap-2 w-3/5 md:w-fit">
              <FaCircle size={5} className="hidden md:inline-block" /> Community Events:{" "}
            </span>
            <span className="ml-2">
              HEngaging events designed to bring the community together,
              promoting camaraderie and a love for sports.
            </span>
          </span>
          <span className="text-xs md:text-sm mb-5 md:mb-0 flex items-start md:items-center justify-start">
            <span className="font-semibold flex items-center gap-2 w-3/5 md:w-fit">
              <FaCircle size={5} className="hidden md:inline-block" /> Workshops and Clinics:{" "}
            </span>
            <span className="ml-2">
              Educational sessions and skill-building clinics conducted by
              seasoned professionals to help athletes enhance their performance.
            </span>
          </span>
        </div>
      </div>

      <div className="w-full flex items-start mt-7 mb-3">
        <div className="w-8">3.</div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm lg:text-lg tracking-wide font-medium mb-4">
            Health and Wellness
          </h3>
          <span className="text-xs md:text-sm mb-5 md:mb-0 flex items-start md:items-center justify-start">
            <span className="font-semibold flex items-center gap-2 w-3/5 md:w-fit">
              <FaCircle size={5} className="hidden md:inline-block" /> Fitness Classes:{" "}
            </span>
            <span className="ml-2">
              A range of group classes, including yoga, pilates, aerobics, and
              more, aimed at promoting overall health and fitness.
            </span>
          </span>
          <span className="text-xs md:text-sm mb-5 md:mb-0 flex items-start md:items-center justify-start">
            <span className="font-semibold flex items-center gap-2 w-3/5 md:w-fit">
              <FaCircle size={5} className="hidden md:inline-block" /> Nutrition Counseling:{" "}
            </span>
            <span className="ml-2">
              Personalized nutrition plans and guidance to help athletes achieve
              their health and performance goals.
            </span>
          </span>
          <span className="text-xs md:text-sm mb-5 md:mb-0 flex items-start md:items-center justify-start">
            <span className="font-semibold flex items-center gap-2 w-3/5 md:w-fit">
              <FaCircle size={5} className="hidden md:inline-block" /> Rehabilitation Services:{" "}
            </span>
            <span className="ml-2">
              On-site physical therapy and rehabilitation services to support
              recovery and prevent injuries.
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Services;
