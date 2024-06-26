import { FaCircle } from "react-icons/fa6";

const Commitment = () => {
  return (
    <div className="my-10">
      <h1 className="text-2xl font-medium">Our Commitment to the Community</h1>
      <p className="mt-4 text-sm">
        At D3 Sports Arena, we believe in the power of sports to transform lives
        and build stronger communities. We are committed to:
      </p>

      <div className="w-full flex items-start mt-7 mb-3">
        <div className="flex flex-col">
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Inclusivity and Accessibility:{" "}
            </span>
            <span className="ml-2">
              Ensuring that our facilities and programs are accessible to
              everyone, regardless of age, ability, or background.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Youth Empowerment:{" "}
            </span>
            <span className="ml-2">
              Providing opportunities for young athletes to grow, learn, and
              succeed through sports.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Community Engagement:{" "}
            </span>
            <span className="ml-2">
              Actively engaging with the local community through outreach
              programs, partnerships, and volunteer initiatives.
            </span>
          </span>
          <span className="text-sm flex items-center justify-start">
            <span className="font-semibold flex items-center gap-2">
              <FaCircle size={5} /> Sustainability:{" "}
            </span>
            <span className="ml-2">
              Implementing eco-friendly practices and promoting sustainability
              within our operations and facilities.
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Commitment;
