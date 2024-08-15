import "react-multi-carousel/lib/styles.css";
import LeftPanel from "@/components/details/LeftPanel";
import RightPanel from "@/components/details/RightPanel";
import Accordion from "@/components/details/DetailsAccordion";
import RelatedGrounds from "@/components/details/RelatedGrounds";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { IGround } from "@/interface/data";
import {
  setLocationArr,
  useGetGroundQuery,
} from "@/store/actions/slices/groundSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

import { SiTicktick } from "react-icons/si";
import { RxCrossCircled } from "react-icons/rx";
import { Button } from "@/components/ui/button";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const selectedCity = useAppSelector(
    (state: RootState) => state.city.selectedCity
  );
  useGetGroundQuery(
    { id: id, city: selectedCity },
    { refetchOnMountOrArgChange: true }
  );
  const { grounds: groundDetails, locationArr } = useAppSelector(
    (state: RootState) => state.ground
  );

  useEffect(() => {
    // getGround.refetch();
    // if (!getGround.isLoading) {
    if (groundDetails.length === 1) {
      dispatch(setLocationArr(groundDetails[0]?.name));
    }
    // }
  }, [dispatch, groundDetails, id, selectedCity]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex flex-col px-5 lg:px-[95px] xl:px-40 w-full overflow-hidden ">
      <span className="h-20 lg:h-5 flex items-center mb-2 mt-4 lg:mb-4 lg:mt-4 gap-1 text-[10px] md:text-xs lg:text-sm">
        {locationArr.map((item, index) => (
          <div key={index}>
            <span
              className={`${
                (
                  locationArr.length === 2
                    ? item === "Home"
                    : item === "Home" || item === "Play"
                )
                  ? "text-[#54a63f] cursor-pointer hover:underline font-semibold"
                  : "text-[#a7d19d] font-medium"
              }`}
              onClick={() => {
                if (item === "Home") {
                  navigate("/");
                } else if (item === "Play") {
                  navigate("/play");
                }
              }}
            >
              {item}
            </span>
            {(locationArr.length === 2
              ? item === "Home"
              : item === "Home" || item === "Play") && (
              <span className="text-[#a7d19d] ml-1">{"/"}</span>
            )}
          </div>
        ))}
      </span>

      <div className="flex flex-col mt-5 gap-8 w-full relative">
        {/* <div className="absolute left-12 top-1/2 -translate-y-1/3 -z-30 w-80 h-32">
          <img src="/images/pattern-5.svg" alt="" className="w-full h-full" />
        </div> */}
        <div className="flex justify-center items-center xl:gap-10 lg:gap-6 gap-5 flex-col lg:flex-row md:items-center w-full h-fit lg:h-[65vh] overflow-hidden">
          <div className="w-full lg:w-2/3 h-full ">
            <LeftPanel groundDetails={groundDetails[0] as IGround} />
          </div>
          <div className="w-full lg:w-1/3 h-full">
            <RightPanel groundDetails={groundDetails[0] as IGround} />
          </div>
        </div>
        <div className="flex justify-center flex-col items-center gap-4 mt-20 md:mt-16 lg:mt-2 w-full">
          <div className="w-full h-20 flex flex-row items-start gap-5">
            <div className="w-full h-full">
              <h1 className="text-2xl">AddOns</h1>
              <span className="flex-1 flex gap-7 mt-3">
                {groundDetails[0]?.rules?.not_allowed?.length > 0
                  ? groundDetails[0]?.rules?.not_allowed?.map((item, index) => {
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <RxCrossCircled className="text-red-800" />
                          <span>{item}</span>
                        </div>
                      );
                    })
                  : null}
                {groundDetails[0]?.rules?.allowed?.length > 0
                  ? groundDetails[0]?.rules?.allowed?.map((item, index) => {
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <IoIosCheckmarkCircleOutline className="text-[#54a63f]" />
                          <span>{item}</span>
                        </div>
                      );
                    })
                  : null}

                {!(
                  groundDetails[0]?.rules?.not_allowed?.length > 0 ||
                  groundDetails[0]?.rules?.allowed?.length > 0
                ) ? (
                  <span>No Data Available</span>
                ) : null}
              </span>
            </div>
          </div>
          <div className="w-full">
            {groundDetails[0]?.supported_sports ? (
              <Accordion
                items={groundDetails[0]?.supported_sports?.map((i) => i.name)}
              />
            ) : null}
          </div>
          <div className="w-full h-10 flex flex-row items-center gap-4 mt-2">
            {groundDetails[0]?.coupon_available ? (
              <SiTicktick size={25} className="text-[#54a63f]" />
            ) : (
              <RxCrossCircled size={25} className="text-[#C63927]" />
            )}
            <span className="text-xl">
              {groundDetails[0]?.coupon_available
                ? "Coupon(s) Available"
                : "Coupon Not Available"}
            </span>
          </div>
        </div>
        <hr />
        <div className="mb-10">
          <RelatedGrounds relatedGroundsOfId={groundDetails[0]?.id} />
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-24 mt-20 mb-10">
        <div className="w-1/2 h-full bg-[#53A53F] rounded-l-md hidden md:flex flex-col items-start justify-center pl-5 lg:pl-20">
          <div className="text-lg font-semibold text-gray-50">
            Host Your Events
          </div>
          <div className="w-[340px] text-xs text-gray-50">
            Engage with the Largest Sports Community and Network
          </div>
          <Button variant={"default"} className="rounded-md mt-2 h-6">
            Get In Touch
          </Button>
        </div>
        <div
          className={`w-full md:w-1/2 h-full rounded-r-md overflow-hidden relative`}
        >
          <img
            src="/images/academy.jpeg"
            alt="academy"
            className="w-full h-full object-cover object-top "
          />

          <div className="absolute top-4 left-4 md:hidden text-xl font-semibold text-gray-200 bg-gray-500/25">
            Host Your Events
          </div>
          <div className="absolute top-12 left-4 md:hidden max-w-[340px] text-xs text-gray-100 bg-gray-500/25">
            Engage with the Largest Sports Community and Network
          </div>
          <Button
            variant={"default"}
            className="absolute bottom-4 left-4 md:hidden rounded-md mt-3 h-5 text-xs"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Details;
