import { APIEndPoints } from "@/APIEndpoint";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useGetGroundQuery } from "@/store/actions/slices/groundSlice";
import { useAppSelector } from "@/store/hooks";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { MdBookmarkRemove } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useVerifySessionQuery } from "@/store/actions/slices/authSlice";

const Favorites = () => {
  const navigate = useNavigate();

  const [toRefetchUserData, setToRefetchUserData] = useState(false);
  useVerifySessionQuery({}, { skip: !toRefetchUserData });

  const { userData } = useAppSelector((state: RootState) => state.auth);
  useGetGroundQuery({});

  const { grounds } = useAppSelector((state: RootState) => state.ground);

  return (
    <>
      <div className="hidden flex-col gap-4 w-full h-[500px] sm:flex">
        <span className="inline-block text-sm font-base text-gray-500">
          My Favorites
        </span>
        <Separator />
        <div id="bookings" className="w-full flex flex-col gap-4 mt-5">
          {userData && userData.favorites
            ? userData.favorites?.map((item, index) => {
                const selectedGroundIndex = grounds.findIndex(
                  (i) => i.id === item
                );

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-5 p-4 bg-gradient-to-r from-[#89b37f] to-[#4a9936d3] rounded-lg"
                  >
                    <div className="flex items-center justify-start gap-5">
                      <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                        {grounds[selectedGroundIndex] ? (
                          <img
                            src={`${APIEndPoints.BackendURL}/${grounds[selectedGroundIndex].images[0]}`}
                            className="object-cover object-center h-full w-full"
                            alt=""
                          />
                        ) : null}
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <div className="text-base whitespace-nowrap flex justify-center items-center text-gray-50 font-medium tracking-wide">
                          {grounds[selectedGroundIndex]
                            ? grounds[selectedGroundIndex].name
                            : null}
                        </div>
                        <div className="text-sm whitespace-nowrap text-[#ffffffbe] flex justify-center items-center gap-1">
                          <FaLocationDot size={10} className="text-[#ffffff]" />
                          {grounds[selectedGroundIndex] ? (
                            <span className="inline-block ">
                              {grounds[selectedGroundIndex]?.venue?.address}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        variant={"outline"}
                        className="flex items-center justify-center gap-4 h-6 bg-[#53a53f] text-[#b7cab2] hover: "
                        onClick={() => {
                          setToRefetchUserData(true);
                        }}
                      >
                        <span>Remove from Favorites</span>
                        <MdBookmarkRemove />
                      </Button>
                      <Button
                        className="flex items-center justify-center gap-4 h-6 bg-[#b9cab4] text-[#3c792d] hover:bg-[#3c792d] hover:text-[#b9cab4]"
                        onClick={() => {
                          navigate(`/details?id=${item}`);
                        }}
                      >
                        <span>View</span>
                        <HiOutlineArrowLongRight />
                      </Button>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="px-16 py-3 rounded-full text-sm bg-gray-900 text-gray-100">
          Browse All Grounds
        </div>
      </div>
    </>
  );
};

export default Favorites;
