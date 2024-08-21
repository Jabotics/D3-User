import { FaRegHeart } from "react-icons/fa";
import turfImage from "../../../public/images/truf-image.webp";
import { Button } from "../ui/button";
import { IGround } from "@/interface/data";
// import { APIEndPoints } from "@/APIEndpoint";
import { useAppDispatch } from "@/store/hooks";
import { useNavigate } from "react-router-dom";
import { setSelectedGroundId } from "@/store/actions/slices/slotsSlice";

export const SlotCard = ({ data }: { data: IGround }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      className={`card-main mx-4 ${!data ? "h-80 bg-gray-100 rounded-md" : ""}`}
    >
      {Object.keys(data).length > 0 ? (
        <div className=" flex relative flex-col gap-4">
          <div className="w-full h-60 rounded-lg relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-[#53A53F] rounded-md p-1">
              <FaRegHeart className="text-[#DBE9D9] text-xl" />
            </div>
            <img
              src={
                data.images?.[0]
                  ? `${data.images[0]}`
                  : turfImage
              }
              alt="icon"
              className="h-full w-full object-cover object-center"
            />
            <p className="text-xs mt-3 flex flex-row gap-2 absolute top-0 left-2 shadow-md shadow-gray-300/65 rounded-md">
                {data.supported_sports.map((item, index) => {
                  return (
                    <span key={index} className="bg-[#53A53F] text-white px-3 py-1 rounded-md">
                      {`${item?.name}`}
                    </span>
                  );
                })}
              </p>
          </div>
          <div className="slot-content text-left flex flex-row justify-between align-center">
            <div className="slot-title-content">
              <h3
                className="font-semibold group cursor-pointer pr-4 line-clamp-2"
                onClick={() => {
                  navigate(`/details?id=${data?.id}`);
                }}
              >
                <span className="text-gray-400">{data?.venue?.name}/</span>{" "}
                &nbsp;
                <span className="group-hover:underline">{data?.name}</span>
              </h3>
              {/* <p className="text-xs mt-3 flex flex-row gap-2">
                {data.supported_sports.map((item, index) => {
                  return (
                    <span key={index} className="bg-[#a7d19d] px-3 py-1 rounded-md">
                      {`${item?.name}`}
                    </span>
                  );
                })}
              </p> */}
            </div>
            <div className="slot-action rounded-3xl">
              <Button
                variant={"default"}
                className="rounded-3xl"
                onClick={() => {
                  dispatch(setSelectedGroundId(data?.id));
                  navigate(`/booking?id=${data?.id}`);
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default SlotCard;
