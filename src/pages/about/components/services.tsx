import { FaCircle } from "react-icons/fa6";

const Services = () => {
  return (
    <div className="my-10">
      <h1 className="text-2xl font-medium">Our Programs and Services</h1>
      <p className="mt-4 text-sm">
        At D3 Sports Arena, we offer a wide array of programs and services
        designed to cater to athletes of all ages and skill levels:
      </p>

      <div className="w-full flex items-start mt-7 mb-3">
        <div className="w-8">1.</div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg tracking-wide font-medium mb-4">
            Coaching and Training
          </h3>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Youth Development Programs:{" "}
            </span>
            <span className="ml-2">
              Tailored programs for young athletes to develop their skills,
              discipline, and sportsmanship.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Adult Training Programs:{" "}
            </span>
            <span className="ml-2">
              Specialized training sessions for adults looking to improve their
              fitness, skills, and overall well-being.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Professional Coaching:{" "}
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
          <h3 className="text-lg tracking-wide font-medium mb-4">
            Events and Competitions
          </h3>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Local and International Tournaments:{" "}
            </span>
            <span className="ml-2">
              We host a variety of tournaments, bringing together athletes from
              around the globe to compete and showcase their talents.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Community Events:{" "}
            </span>
            <span className="ml-2">
              HEngaging events designed to bring the community together,
              promoting camaraderie and a love for sports.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Workshops and Clinics:{" "}
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
          <h3 className="text-lg tracking-wide font-medium mb-4">
            Health and Wellness
          </h3>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Fitness Classes:{" "}
            </span>
            <span className="ml-2">
              A range of group classes, including yoga, pilates, aerobics, and
              more, aimed at promoting overall health and fitness.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Nutrition Counseling:{" "}
            </span>
            <span className="ml-2">
              Personalized nutrition plans and guidance to help athletes achieve
              their health and performance goals.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Rehabilitation Services:{" "}
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
