import turfImage from "/images/truf-image.webp";
import { CiHeart } from "react-icons/ci";

const GroundCard = () => {
  return (
    <div className="w-72 rounded-lg h-60 border">
      <div className="bg-cover bg-center relative">
        <img
          src={turfImage}
          alt="turf"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1 right-1 rounded bottom-0 text-center z-50 cursor-pointer">
          <div className="bg-[#DBE9D9] rounded">
            <CiHeart className="text-[#53A53F] text-xl" />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4 px-2">
        <div className="flex flex-col">
          <span className="font-medium text-sm">The Legends Turf XL</span>
          <span className="font-light text-sm">Box Cricket, Football</span>
        </div>
        <div>
          <button className="bg-gray-900 text-white text-sm p-2 rounded-3xl w-24">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroundCard;
