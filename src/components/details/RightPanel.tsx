import { IGround } from "@/interface/data";
import { setSelectedGroundId } from "@/store/actions/slices/slotsSlice";
import { useAppDispatch } from "@/store/hooks";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { GoLocation } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaRegCheckSquare } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect } from "react";
import { setLocationArr } from "@/store/actions/slices/groundSlice";
import { IoTime } from "react-icons/io5";

const RightPanel = ({ groundDetails }: { groundDetails: IGround }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (groundDetails && groundDetails?.name) {
      dispatch(setLocationArr(groundDetails?.name));
    }
  }, [dispatch, groundDetails]);

  return (
    <div className="w-full h-full mt-5 lg:mt-0">
      <div className="flex justify-between">
        <h2 className="md:text-3xl text-2xl font-medium text-[#53A53F]">
          {groundDetails?.name}
        </h2>
        <div className="flex gap-1 items-center">
          <div className="bg-[#DBE9D9] items-center flex rounded-md h-8 w-8 justify-center">
            <CiHeart className="text-[#53A53F] cursor-pointer md:text-xl text-md" />
          </div>
          <div className="bg-[#DBE9D9] items-center flex rounded-md h-8 w-8 justify-center">
            <CiShare2 className="text-[#53A53F] cursor-pointer md:text-xl text-md" />
          </div>
        </div>
      </div>

      <div className="mt-2">
        {groundDetails?.dimensions?.width &&
        groundDetails?.dimensions?.length ? (
          <span className="font-semibold text-[#53a53fad] text-base tracking-wide">
            {groundDetails?.dimensions?.width} x{" "}
            {groundDetails?.dimensions?.length}
          </span>
        ) : (
          <div className="h-10 w-full bg-gray-100"></div>
        )}
      </div>
      {groundDetails?.name &&
      groundDetails?.amenities &&
      groundDetails?.amenities?.length > 0 ? (
        <div className="mt-3 ml-[1px] flex flex-col">
          <span className="font-normal text-gray-500 ">
            {groundDetails?.name} is a premium synthetic grass product designed
            for sports fields and recreational areas.{" "}
          </span>
          <span className=" tracking-widest w-full scroll-nobg py-5 flex flex-wrap gap-3">
            {groundDetails?.amenities?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <FaRegCheckSquare className="text-[#53a53f]" />
                  <span>{item}</span>
                </div>
              );
            })}
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, index) => {
            return (
              <p
                key={index}
                className="w-full h-5 rounded-full bg-gray-100"
              ></p>
            );
          })}
        </div>
      )}

      {/* <div className="mt-8 flex flex-wrap items-center gap-3 w-full text-xs"></div> */}

      <Dialog>
        <DialogTrigger className="mt-1 flex items-center gap-1 bg-[#53a53f] shadow-md shadow-[#aacca194] px-3 py-0 rounded-2xl">
          <IoTime className="text-gray-100" />
          <span className="text-gray-100">Timings</span>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="sr-only">Timings</DialogTitle>
        </DialogContent>
      </Dialog>

      {/* <div className="mt-8 max-h-16 min-h-12 overflow-hidden">
        <h2 className="text-lg font-bold">Timing</h2>
        <span className="text-sm font-light">
          6 AM- 9 AM & 3 PM - 11 PM On Weekday, 6 AM - 11 PM On Weekends
        </span>
      </div> */}

      {groundDetails?.venue?.address ? (
        <div className="flex justify-between mt-32 mb-4 mr-1 md:mr-0">
          <span className=" flex items-center gap-2">
            <GoLocation className="text-[#53a53f] w-10" size={20} />
            <span className="line-clamp-1">
              {groundDetails?.venue?.address}
            </span>
          </span>
          <div className="flex items-center gap-1 cursor-pointer  rounded-md px-3">
            <IoIosSend className="" />
            <span className="text-sm font-medium ">Navigate</span>
          </div>
        </div>
      ) : (
        <div className="h-5 rounded-full bg-gray-100 mt-36"></div>
      )}
      <div className="mt-4 mr-2 md:mr-0">
        <button
          className="w-full bg-gray-900 p-3 rounded-3xl text-white"
          onClick={() => {
            dispatch(setSelectedGroundId(groundDetails.id));
            navigate("/booking");
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RightPanel;
