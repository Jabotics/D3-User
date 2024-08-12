import { FaLocationDot } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IGround } from "@/interface/data";
import venueImg from "../../../assets/venueImg.jpg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedGroundId } from "@/store/actions/slices/slotsSlice";
import { Button } from "@/components/ui/button";
import { APIEndPoints } from "@/APIEndpoint";
import {
  setLocationArr,
  useSetFavoriteMutation,
} from "@/store/actions/slices/groundSlice";
import { RootState } from "@/store";
import { IoIosHeart } from "react-icons/io";
import { useState } from "react";
import { useVerifySessionQuery } from "@/store/actions/slices/authSlice";

import { FaRegCheckSquare } from "react-icons/fa";
import React from "react";

import { FaDiamond } from "react-icons/fa6";

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

  const [toRefetchUserData, setToRefetchUserData] = useState(false);
  useVerifySessionQuery(
    {},
    { refetchOnMountOrArgChange: true, skip: !toRefetchUserData }
  );

  const { userData, hasToken } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [updateFavorite] = useSetFavoriteMutation();

  const openDetailsPage = (id: string) => {
    navigate(`/details?id=${id}`);
    dispatch(setLocationArr(item.name));
  };

  const handleSetFavorite = async () => {
    try {
      if (hasToken) {
        await updateFavorite({
          ground_id: item.id,
          customer_id: userData?.id,
        });
        setToRefetchUserData(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setToRefetchUserData(false);
    }
  };

  return (
    <React.Fragment>
      {Object.keys(item).length !== 0 ? (
        <div className="flex flex-col items-center justify-center relative">
          <span className="w-fit absolute bg-[#c1ecb6] block sm:hidden top-1 left-1 text-teal-900 px-1 rounded-md text-xs font-semibold tracking-wide">
            {`₹2000`}
            <span className="italic"> onwards</span>
          </span>
          <div className="flex rounded-t-md overflow-hidden w-[90vw] sm:w-full lg:w-[45vw] xl:w-[65vw] 2xl:w-full h-24 sm:h-32 lg:h-24 xl:h-32 border border-b-gray-200 border-t-[#b2d8a9] border-r-[#b2d8a9]">
            <div
              className={`${
                window.innerWidth < 320 ? "hidden" : "block"
              } w-24 sm:w-60`}
            >
              <img
                src={
                  item?.images.length > 0
                    ? `${APIEndPoints.BackendURL}/${item?.images[0]}`
                    : `${venueImg}`
                }
                alt="venueImg"
                className="h-full w-full object-cover object-center rounded-tl-md "
              />
            </div>
            <div className="hidden flex-1 sm:flex flex-row gap-4 py-2 sm:py-2 px-4 sm:px-5">
              <div className="w-full flex flex-col">
                <div className="flex flex-row w-full gap-2 justify-between items-center mt-0 xl:mt-3">
                  <span className="w-[40%] text-[8px] sm:text-[12px] md:text-base lg:text-sm xl:text-base font-bold flex flex-row gap-5 items-center">
                    <span className="w-fit h-full">{item?.name}</span>
                    {item?.is_popular ? (
                      <span className="flex-1 h-full overflow-hidden flex flex-row items-center ">
                        <span className="font-light text-sm flex items-center gap-1 bg-[#f0f18eb9] px-3 rounded-md">
                          <FaDiamond size={8} className="text-[#b88436]" />
                          <span>Popular</span>
                        </span>
                      </span>
                    ) : null}
                  </span>
                  <button
                    className="bg-[#54a63f] w-[40%] md:w-[30%] ms-auto h-[24px] xl:h-[30px] text-[12px] lg:text-sm xl:text-[12px] flex items-center justify-center text-white p-2 rounded-lg shadow-md shadow-gray-500"
                    onClick={() => openDetailsPage(item?.id)}
                  >
                    View Details
                  </button>
                  <div
                    className="h-[22px] w-[22px] p-1  bg-[#54a63fb3] rounded-lg flex items-center justify-center cursor-pointer"
                    onClick={handleSetFavorite}
                  >
                    {userData?.favorites?.includes(item.id) ? (
                      <IoIosHeart
                        className="font-bold "
                        size={20}
                        color="white"
                      />
                    ) : (
                      <IoIosHeartEmpty
                        className="font-bold "
                        size={20}
                        color="white"
                      />
                    )}
                  </div>
                </div>

                <div className="w-full flex items-start gap-3 h-6 mt-4 lg:mt-1">
                  <Button
                    variant={"outline"}
                    className="border-[#54a63f] bgb hover:bg-[#70a862] text-xs h-full hover:text-white py-[4px] md:py-[6px] px-[4px] md:px-[4px] w-[120px] md:w-[140px] border rounded-sm "
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
                          generateRandomString()
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

                <div className="flex items-start justify-between gap-2 mt-5">
                  <span className="w-40 overflow-y-hidden overflow-x-auto pb-2 flex-1 hidden lg:flex text-[12px] sm:text-[14px] md:text-xs lg:text-[10px] xl:text-xs font-base text-[#676767] gap-2 whitespace-nowrap">
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
                  <div className="w-full lg:w-40 xl:w-60 overflow-hidden flex flex-row items-center gap-2 self-start cursor-pointer hover:underline">
                    <FaLocationDot size={12} color="#000" />
                    <p className="p-0 m-0 text-[12px] sm:text-[14px] md:text-xs text-[#676767] whitespace-nowrap">
                      {window.innerWidth > 1280
                        ? `${(
                            item?.venue?.name +
                            " " +
                            item?.venue?.address
                          ).substring(0, 30)}...`
                        : window.innerWidth > 1024
                        ? `${(
                            item?.venue?.name +
                            " " +
                            item?.venue?.address
                          ).substring(0, 20)}...`
                        : `${item?.venue?.name + " " + item?.venue?.address}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex sm:hidden flex-1 flex-col justify-center gap-1 px-5">
              <div className="h-4 w-full flex items-center justify-between ">
                <span className="inline-block w-[40%] text-[14px] sm:text-[16px] md:text-base font-bold">
                  {item?.name}
                </span>
                <div className="flex items-end gap-2">
                  <Button
                    className="bg-[#54a63f] w-20 h-6 text-[10px] rounded-lg shadow-md shadow-gray-500"
                    onClick={() => openDetailsPage(item?.id)}
                  >
                    View Details
                  </Button>
                  <div
                    className="h-[22px] w-[22px] p-1 z-30 bg-[#54a63fb3] rounded-lg flex items-center justify-center "
                    onClick={handleSetFavorite}
                  >
                    {userData?.favorites?.includes(item.id) ? (
                      <IoIosHeart
                        className="font-bold "
                        size={20}
                        color="white"
                      />
                    ) : (
                      <IoIosHeartEmpty
                        className="font-bold "
                        size={20}
                        color="white"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full overflow-hidden h-fit flex items-start justify-between gap-2 mt-1">
                <span className="hidden ">
                  {item?.supported_sports &&
                    item.supported_sports.map((item, index) => {
                      return (
                        <p
                          key={index}
                          className="text-[8px] bg-gray-300 px-3 rounded-md"
                        >
                          {item.name}
                        </p>
                      );
                    })}
                </span>
                <div className="flex h-fit items-start gap-1">
                  <FaLocationDot size={12} color="#000" />
                  <p className="text-[10px] text-[#676767] leading-[9px]">
                    {item?.venue?.name}, {item?.venue?.address}
                  </p>
                </div>
              </div>

              <div className="w-full flex items-start gap-3 h-4 mt-1">
                <Button
                  variant={"outline"}
                  className="border-[#54a63f] hover:bg-[#70a862] text-xs h-full hover:text-white w-20 border rounded-sm "
                  onClick={() => {
                    dispatch(setSelectedGroundId(item.id));
                    navigate("/booking");
                  }}
                >
                  Book Now
                </Button>
                <Button
                  variant={"outline"}
                  className="text-xs h-full w-20 border rounded-sm flex items-center justify-center gap-2"
                  onClick={() => {
                    dispatch(setSelectedGroundId(item.id));
                    navigate(
                      `/scoreboard?playid=${
                        generateRandomString()
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
          <div className="flex rounded-b-md overflow-hidden w-[90vw] sm:w-full lg:w-[45vw] xl:w-[65vw] 2xl:w-full h-16 shadow-md shadow-[#b2d8a9] mb-3 bg-gradient-to-r from-[#54a63f] via-[#81d86b] to-[#a5e794]">
            <div className="w-24 sm:w-60 max-h-full flex flex-col px-2 py-1 md:py-2 md:px-5">
              <span className="text-[12px] md:text-sm text-gray-100 mt-2 md:mt-0">
                {/* {window.innerWidth > 768 ? (
              <span className="text-[10px]">
                <span className="underline ">Dimensions</span> :
              </span>
            ) : null} */}
                <span className="font-extrabold tracking-wide font-mono text-[#fff]">{`${item.dimensions.width} x ${item.dimensions.length}`}</span>
                <span className="w-fit bg-[#c1ecb6] hidden sm:block text-teal-900 font-mono font-semibold px-3 rounded-md">{`₹2000 onwards`}</span>
              </span>
            </div>
            <span className="flex-1 border-l-[1px] border-[#a5e794] flex items-start pt-2 text-sm pl-5">
              <span className="w-full flex flex-wrap gap-2 md:gap-5 leading-none mt-1">
                {item.amenities.map((amenity, index) => {
                  return (
                    <span
                      className="flex items-center gap-1 text-[11px] font-medium tracking-wide"
                      key={index}
                    >
                      <FaRegCheckSquare className="text-green-100" />
                      <span>{amenity}</span>
                    </span>
                  );
                })}
              </span>
            </span>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default VenueItem;
