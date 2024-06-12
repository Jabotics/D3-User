import { FaRegHeart } from "react-icons/fa";
import turfImage from "../../../public/images/truf-image.webp";
import { Button } from "../ui/button";

export const SlotCard = () => {
  return (
    <div className="card-main mx-4">
      <div className=" flex relative flex-col gap-4">
        <div className="ground-image rounded-lg relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-[#53A53F] rounded-md p-1">
            <FaRegHeart className="text-[#DBE9D9] text-xl" />
          </div>
          <img src={turfImage} alt="icon" />
        </div>
        <div className="slot-content text-left flex flex-row justify-between align-center">
          <div className="slot-title-content">
            <h3 className="font-semibold">The Legends Turf XL</h3>
            <p className="text-xs">Box Cricket, Football</p>
          </div>
          <div className="slot-action rounded-3xl">
            <Button variant={'default'} className="rounded-3xl">Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SlotCard;
