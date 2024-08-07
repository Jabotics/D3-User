import { FaRegHeart } from "react-icons/fa";
import turfImage from "../../../public/images/truf-image.webp";
import { Button } from "../ui/button";
import { IGround } from "@/interface/data";
import { APIEndPoints } from "@/APIEndpoint";
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
          <div className="ground-image rounded-lg relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-[#53A53F] rounded-md p-1">
              <FaRegHeart className="text-[#DBE9D9] text-xl" />
            </div>
            <img
              src={
                data.images?.[0]
                  ? `${APIEndPoints.BackendURL}/${data.images[0]}`
                  : turfImage
              }
              alt="icon"
            />
          </div>
          <div className="slot-content text-left flex flex-row justify-between align-center">
            <div className="slot-title-content">
              <h3
                className="font-semibold group cursor-pointer"
                onClick={() => {
                  navigate(`/details?id=${data?.id}`);
                }}
              >
                <span className="text-gray-400">{data?.venue?.name}/</span>{" "}
                &nbsp;
                <span className="group-hover:underline">{data?.name}</span>
              </h3>
              <p className="text-xs">
                {data.supported_sports.map((item, index) => {
                  return (
                    <span key={index}>
                      {index === 0 ? item?.name : `, ${item?.name}`}
                    </span>
                  );
                })}
              </p>
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
