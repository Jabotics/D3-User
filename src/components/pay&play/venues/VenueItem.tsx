import { FaLocationDot } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IGround } from "@/interface/data";
import venueImg from "../../../assets/venueImg.jpg";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedGroundId } from "@/store/actions/slices/slotsSlice";
import { Button } from "@/components/ui/button";
import { APIEndPoints } from "@/APIEndpoint";

function generateRandomString(length = 30) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  if (typeof length !== "number" || length <= 0) {
    throw new Error("Length must be a positive number");
  }

  // Using Array.from for better performance with large lengths
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * charactersLength))
  ).join("");
}

const VenueItem = ({ item }: { item: IGround }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openDetailsPage = (id: string) => {
    navigate(`/details/?id=${id}`);
  };

  return (
    <div className="flex rounded-md overflow-hidden w-full h-32 border border-gray-300 ">
      <div className="w-60 ">
        <img
          src={
            item?.images.length > 0
              ? `${APIEndPoints.BackendURL}/${item?.images[0]}`
              : `${venueImg}`
          }
          alt="venueImg"
          className="h-full w-full object-cover object-center rounded-l-md"
        />
      </div>
      <div className="flex-1 flex flex-row gap-4 py-2 sm:py-2 px-4 sm:px-5">
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full gap-2 justify-between items-center mt-3">
            <span className="inline-block w-[40%] text-[14px] sm:text-[16px] md:text-base font-bold">
              {item?.name}
            </span>
            <button
              className="bg-[#252525] w-[40%] md:w-[30%] ms-auto h-[30px]  text-[12px] flex items-center justify-center text-white p-2 border rounded-lg"
              onClick={() => openDetailsPage(item?.id)}
            >
              View Details
            </button>
            <div className="h-[22px] w-[22px] p-1  bg-[#54a63fb3] rounded-lg flex items-center justify-center ">
              <IoIosHeartEmpty className="font-bold " size={20} color="white" />
            </div>
          </div>

          <div className="flex items-start gap-2 mt-1">
            <span className="flex-1 flex flex-wrap text-[12px] sm:text-[14px] md:text-xs font-base text-[#676767]">
              {item?.supported_sports &&
                item.supported_sports.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className="bg-gray-300 w-fit px-3 rounded-md"
                    >
                      {item.name}
                    </p>
                  );
                })}
            </span>
            <div className="w-60 flex flex-row items-center gap-2 self-start">
              <FaLocationDot size={12} color="#D0D0D0" />
              <p className="p-0 m-0 text-[12px] sm:text-[14px] md:text-xs text-[#676767]">
                {item?.venue?.name}, {item?.venue?.address}
              </p>
            </div>
          </div>

          <div className="w-full flex items-start gap-3 h-7 mt-4">
            <Button
              variant={"outline"}
              className="border-[#54a63f] hover:bg-[#70a862] text-xs h-full hover:text-white py-[4px] md:py-[6px] px:[4px] md:px-[4px] w-[120px] md:w-[140px] border rounded-sm "
              onClick={() => {
                dispatch(setSelectedGroundId(item.id));
                navigate("/booking");
              }}
            >
              Book Now
            </Button>
            <Button
              variant={"outline"}
              className="text-xs h-full py-[4px] md:py-[6px] px-[4px] md:px-[4px] w-[120px] md:w-[140px] border rounded-sm flex items-center justify-center gap-2"
              onClick={() => {
                dispatch(setSelectedGroundId(item.id));
                navigate(
                  `/scoreboard?playid=${
                    !!generateRandomString()
                      ? `${generateRandomString(200)}-${item.id}`
                      : ""
                  }`
                );
              }}
            >
              <span className="animate-fade-in-out bg-rose-700 h-2 w-2 rounded-full"></span>
              <span>Live</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueItem;
