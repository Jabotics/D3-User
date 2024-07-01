import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { HiOutlineArrowLongRight } from "react-icons/hi2";
// import { MdOutlineCardMembership } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import {
  resetLocationArr,
  setSelectedSlots,
} from "@/store/actions/slices/academySlice";
import { APIEndPoints } from "@/APIEndpoint";

import { FaRegPlayCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

import { FaExternalLinkAlt } from "react-icons/fa";

const getEmbedUrl = (url: string): string => {
  switch (true) {
    case url.includes("youtube.com") || url.includes("youtu.be"):
      if (url.includes("embed")) {
        // Already an embed URL
        return `${
          url.split("?")[0]
        }?rel=0&modestbranding=1&controls=1&start=0&end=600&loop=1`;
      }
      // Extract video ID from regular YouTube URLs
      const videoId = url.split("v=")[1] || url.split("youtu.be/")[1];
      if (!videoId) {
        return "";
      }
      // Adjust URL to be an embed URL with parameters
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&start=0&end=600&loop=1`;

    case url.includes("drive.google.com"):
      // Extract Google Drive file ID
      const fileId = url.match(/\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/);
      if (fileId && fileId[1]) {
        return `https://drive.google.com/file/d/${fileId[1]}/preview`;
      }
      return "";

    default:
      return url; // Return original URL for unsupported types
  }
};

interface AcademyDetailsProps {
  academyId: string;
}
const AcademyDetails: React.FC<AcademyDetailsProps> = ({ academyId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { academies, selectedSlot } = useAppSelector(
    (state: RootState) => state.academy
  );

  const { hasToken } = useAppSelector((state: RootState) => state.auth);

  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const selectedAcademy = academies.find((i) => i.id === academyId);

  const [hasSelectVideo, setHasSelectVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    dispatch(resetLocationArr());
  }, [academyId]);

  useEffect(() => {
    if (selectedAcademy) {
      if (selectedAcademy.images !== undefined) {
        setSelectedImg(selectedAcademy.images[0]);
      }

      if (selectedAcademy.video !== undefined) {
        const refactoredVideoUrl = getEmbedUrl(selectedAcademy.video);
        setVideoUrl(refactoredVideoUrl);
      }
    }
  }, [selectedAcademy]);

  return (
    <div className="h-full lg:h-screen flex items-start gap-10">
      <div className="h-full flex-1">
        {!!selectedAcademy ? (
          <div className="w-full h-full overflow-hidden flex flex-col">
            <div className="w-80 sm:w-full h-20 flex items-center justify-between">
              <span className="text-base font-semibold md:font-normal text-gray-800 md:text-gray-950 tracking-wider md:tracking-normal md:text-lg lg:text-3xl ">
                {selectedAcademy.name}
              </span>
              <Dialog>
                <DialogTrigger
                  onClick={() => {
                    if (hasToken) {
                      if (selectedSlot) {
                        navigate(`/academy?id=${academyId}&join=1`);
                      }
                    } else {
                      navigate("/login");
                    }
                  }}
                  className="text-xs lg:text-sm bg-[#53a53fd7] flex items-center gap-2 px-5 py-1 md:py-2 rounded-full font-medium text-gray-50 cursor-pointer"
                >
                  <p>Join Academy</p>
                  <p>
                    <HiOutlineArrowLongRight />
                  </p>
                </DialogTrigger>
                <DialogContent aria-describedby="academy slots">
                  <div className="flex h-[30vh] flex-col items-center">
                    <DialogTitle className="mt-5 text-xl text-[#53a53f] font-semibold tracking-wide">
                      Selected Slot
                    </DialogTitle>
                    <Separator className="bg-[#53a53f] mt-3 mb-5" />
                    <div className="w-full text-sm tracking-widest flex flex-col gap-1">
                      {selectedAcademy.slotTimes.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={`text-xs h-fit whitespace-nowrap border-[1px] ${
                              selectedSlot && selectedSlot === item.slot
                                ? "bg-[#53a53f] text-gray-50"
                                : "text-[#53a53f] border border-[#53a53f] bg-gray-100"
                            } border-gray-300 px-2 py-1 rounded-xl cursor-pointer`}
                            onClick={() => {
                              dispatch(setSelectedSlots(item.slot));
                            }}
                          >
                            {item.slot}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <DialogClose
                    className="h-8 rounded-md bg-[#53a53f] text-xs text-gray-100 "
                    onClick={() => {
                      if (selectedSlot) {
                        navigate(`/academy?id=${academyId}&join=1`);
                      }
                    }}
                  >
                    {selectedSlot ? "Continue" : "Close"}
                  </DialogClose>
                </DialogContent>
              </Dialog>
              {/* <span className="text-sm bg-[#3fa583] flex items-center gap-2 px-5 py-2 rounded-full font-medium text-gray-50 ">
                <p><MdOutlineCardMembership /></p>
                <p>Member</p>
              </span> */}
            </div>
            <Separator className="-mt-2 mb-1 lg:mb-0 lg:mt-0 w-80 lg:w-full" />

            <div className="lg:flex-1 w-full flex gap-5">
              {/* IMAGE */}
              <div className="flex-1 h-full flex items-center justify-start rounded-md">
                <div className="mt-4 w-full overflow-hidden flex flex-col-reverse lg:flex-row items-start justify-center gap-2">
                  <div className="w-80 lg:w-12 h-12 lg:h-full pb-0 lg:pb-5 overflow-x-auto lg:overflow-x-hidden filter-sc overflow-y-hidden lg:overflow-y-auto flex flex-row lg:flex-col items-center gap-2 mt-2 rounded-md overflow-hidden">
                    {selectedAcademy.images
                      ? selectedAcademy.images.slice(0, 2).map((url, index) => {
                          return (
                            <div
                              key={index}
                              className={`w-8 h-8 shrink-0 bg-gray-100 ${
                                selectedImg === url &&
                                "border-[3px] border-[#53a53f]"
                              } rounded-md`}
                              onClick={() => {
                                setHasSelectVideo(false);
                                setSelectedImg(url);
                              }}
                            >
                              <img
                                src={`${APIEndPoints.BackendURL}/${url}`}
                                alt=""
                                className="w-full h-full object-cover rounded-md cursor-pointer"
                              />
                            </div>
                          );
                        })
                      : Array.from({ length: 4 }).map((_, index) => {
                          return (
                            <div
                              key={index}
                              className="w-8 h-8 bg-gray-100"
                            ></div>
                          );
                        })}
                    {selectedAcademy.video ? (
                      <div
                        className="w-8 h-8 bg-gray-100 flex items-center justify-center border border-gray-300 rounded-md cursor-pointer"
                        onClick={() => {
                          setHasSelectVideo(true);
                          setSelectedImg(null);
                        }}
                      >
                        <FaRegPlayCircle size={25} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 shrink-0 bg-gray-100"></div>
                    )}
                    {selectedAcademy.images
                      ? selectedAcademy.images
                          .slice(2, selectedAcademy.images.length)
                          .map((url, index) => {
                            return (
                              <div
                                key={index}
                                className={`w-8 h-8 shrink-0 bg-gray-100 ${
                                  selectedImg === url &&
                                  "border-[3px] border-[#53a53f]"
                                } rounded-md`}
                                onClick={() => {
                                  setHasSelectVideo(false);
                                  setSelectedImg(url);
                                }}
                              >
                                <img
                                  src={`${APIEndPoints.BackendURL}/${url}`}
                                  alt=""
                                  className="w-full h-full object-cover rounded-md cursor-pointer"
                                />
                              </div>
                            );
                          })
                      : Array.from({ length: 4 }).map((_, index) => {
                          return (
                            <div
                              key={index}
                              className="w-8 h-8 bg-gray-100"
                            ></div>
                          );
                        })}
                  </div>
                  <div
                    className="w-80 lg:flex-1 h-[34vh] rounded-md overflow-hidden"
                    style={{
                      backgroundImage: `url(${APIEndPoints.BackendURL}/${selectedImg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {selectedAcademy.video && hasSelectVideo && (
                      <iframe
                        width="100%"
                        height="100%"
                        src={`${videoUrl}`}
                        title="YouTube Video Player"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIVE DAYS */}
            <div className="block lg:hidden w-full h-fit mt-5">
              <h1 className="text-sm font-semibold tracking-wide h-10">
                Active Days
              </h1>
              <div className="flex-1 flex flex-wrap gap-2 pr-5">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (item, index) => {
                    return (
                      <div
                        key={index}
                        className={`${
                          selectedAcademy.active_days.includes(
                            item.toLowerCase()
                          )
                            ? "bg-[#53a53f] text-gray-200"
                            : "bg-gray-300"
                        } flex items-center justify-center px-2 py-1 rounded-lg text-xs`}
                      >
                        {item}
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* SLOTS */}
            <div className="lg:hidden min-h-20 max-h-32 w-80 flex items-center justify-center mt-5">
              <span className="w-full h-full bg-gray-100 rounded-md py-2 px-5 flex flex-col gap-3 border border-[#53a53f3d]">
                <h2 className="font-medium tracking-wider text-sm">
                  Practice Timings
                </h2>
                <Separator className="bg-gray-300" />
                {/* <span className="flex-1 w-full flex items-start"> */}
                <span className="h-fit w-full flex flex-wrap gap-2">
                  {selectedAcademy.slotTimes.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[10px] h-fit whitespace-nowrap border-[1px] bg-[#53a53f] text-gray-50 border-gray-300 px-2 py-1 rounded-xl"
                      >
                        {item.slot}
                      </div>
                    );
                  })}
                </span>
                {/* </span> */}
              </span>
            </div>

            {/* DESCRIPTION */}
            <section className="w-80 lg:w-full my-5 flex flex-col">
              <div className="flex-1 flex items-start gap-3">
                <div className="flex flex-col flex-1 h-full">
                  <h1 className="text-sm lg:text-base font-semibold tracking-wide h-10">
                    About Academy
                  </h1>
                  <div className="h-8 w-full flex items-center justify-start gap-3">
                    <span className="italic text-[10px] lg:text-sm text-gray-400 font-medium">
                      (&nbsp;{`@${selectedAcademy.name}`}&nbsp;)
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[10px] lg:text-sm">
                        <span className="text-gray-600">Venue:</span>
                        <span className="font-semibold tracking-wider">
                          {selectedAcademy.ground.venue.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] lg:text-sm">
                        <span className="text-gray-600">Ground:</span>
                        <span className="font-semibold tracking-wider">
                          {selectedAcademy.ground.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 w-full mt-3 text-xs">
                    {selectedAcademy.description}
                  </div>
                </div>
              </div>
            </section>

            {/* FEES */}
            <Dialog>
              <DialogTrigger className=" h-20 lg:mt-0 lg:h-2/5 w-full flex lg:hidden items-start justify-center">
                <div className="h-[75%] w-full bg-gray-900 rounded-xl py-3 px-5 flex gap-1 text-gray-100">
                  <div className="flex-1 flex flex-col gap-1 items-start justify-center">
                    <div className="flex items-center gap-1">
                      <RiMoneyRupeeCircleLine className="text-gray-300" size={20} />
                      <p className="text-base font-light tracking-wide">
                        Fees
                      </p>
                    </div>
                    <p className="text-[10px] text-gray-50 whitespace-nowrap">
                      Click to view the fees of the academy.
                    </p>
                  </div>
                  <div className="h-full w-10 flex items-center justify-center text-gray-100">
                    <HiOutlineArrowLongRight size={24} />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <div className="flex h-[30vh] flex-col items-center">
                  <div className="mt-5 text-xl text-gray-800 font-semibold tracking-wide">
                    Fees
                  </div>
                  <Separator className="bg-gray-800 mt-3 mb-5" />
                  <div className="w-full text-sm tracking-widest">
                    {[
                      {
                        name: "Admission",
                        fee: selectedAcademy.admission_fees,
                      },
                      {
                        name: "Monthly",
                        fee: selectedAcademy.monthly_fee,
                      },
                      {
                        name: "Quarterly",
                        fee: selectedAcademy.quarterly_fee,
                      },
                      {
                        name: "Semi Annual",
                        fee: selectedAcademy.half_yearly_fee,
                      },
                      {
                        name: "Annual",
                        fee: selectedAcademy.yearly_fee,
                      },
                    ].map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex h-8 w-full items-center justify-start gap-3"
                        >
                          <div className="w-32 text-gray-800">{item.name}</div>
                          <div className="text-gray-800">
                            {" "}
                            :&nbsp;&nbsp;&#x20B9;{item.fee}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <DialogClose className="h-8 rounded-md bg-gray-800 text-xs text-gray-100 ">
                  Close
                </DialogClose>
              </DialogContent>
            </Dialog>

            {/* MORE ACADEMIES */}
            <div className="flex lg:hidden flex-col h-32 mt-10 gap-3">
              <div className="h-fit flex items-center justify-between font-medium">
                <span className="flex-1 text-gray-800 text-sm lg:text-lg">
                  More Academies
                </span>
                <span
                  className="w-fit text-gray-800 text-xs hover:underline cursor-pointer"
                  onClick={() => {
                    navigate("/academy");
                  }}
                >
                  View all
                </span>
              </div>
              <Separator />
              <div className="flex-1 overflow-x-auto overflow-y-hidden flex items-center justify-start gap-3 mt-0 mb-3 lg:mb-0 lg:mt-5 relative">
                {academies
                  .filter((i) => i.id !== academyId)
                  .slice(0, 2)
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="h-12 w-16 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          navigate(`/academy?id=${item.id}`);
                        }}
                      >
                        <div className="w-full h-full rounded-md overflow-hidden flex items-center justify-center relative">
                          <FaExternalLinkAlt className="absolute top-1 right-1 text-gray-200" />
                          {item.images ? (
                            <img
                              src={
                                item.images[0]
                                  ? `${APIEndPoints.BackendURL}/${item.images[0]}`
                                  : "https://res.cloudinary.com/purnesh/image/upload/w_1080,f_auto/west-delhi-cricket-academy0.jpg"
                              }
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="hidden lg:flex h-full w-[20rem] xl:w-[28rem] flex-col gap-3">
        <div className="flex-1 flex flex-col">
          {selectedAcademy ? (
            <div className="w-full h-full flex flex-col">
              {/* ACTIVE DAYS */}
              <div className="w-full h-fit mt-5">
                <h1 className="font-medium tracking-wide h-10">
                  Active Days
                </h1>
                <div className="flex-1 flex flex-wrap gap-2 pr-5">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (item, index) => {
                      return (
                        <div
                          key={index}
                          className={`${
                            selectedAcademy.active_days.includes(
                              item.toLowerCase()
                            )
                              ? "bg-[#53a53f] text-gray-200"
                              : "bg-gray-300"
                          } flex items-center justify-center px-2 py-1 rounded-lg text-sm`}
                        >
                          {item}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* SLOTS */}
              <div className="h-3/5 w-full flex items-center justify-center mt-5">
                <span className="w-full h-4/5 bg-gray-100 rounded-md py-2 px-5 flex flex-col gap-3 border border-[#53a53f]">
                  <h2 className="font-medium tracking-wider">
                    Practice Timings
                  </h2>
                  <Separator className="bg-gray-300" />
                  <span className="flex-1 w-full flex items-start">
                    <span className="min-h-fit max-h-full w-full flex flex-wrap gap-2">
                      {selectedAcademy.slotTimes.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="text-xs h-fit whitespace-nowrap border-[1px] bg-[#53a53f] text-gray-50 border-gray-300 px-2 py-1 rounded-xl"
                          >
                            {item.slot}
                          </div>
                        );
                      })}
                    </span>
                  </span>
                </span>
              </div>

              {/* FEES */}
              <Dialog>
                <DialogTrigger className="h-2/5 w-full flex items-start justify-center">
                  <div className="h-[75%] w-full bg-gray-900 rounded-xl py-3 px-5 flex gap-1 text-gray-100">
                    <div className="flex-1 flex flex-col gap-1 items-start justify-center">
                      <div className="flex items-center gap-1">
                        <RiMoneyRupeeCircleLine color="white" size={20} />
                        <p className="text-base font-medium tracking-wide">
                          Fees
                        </p>
                      </div>
                      <p className="text-xs text-gray-200 whitespace-nowrap">
                        Click to view the fees of the academy.
                      </p>
                    </div>
                    <div className="h-full w-10 flex items-center justify-center text-gray-100">
                      <HiOutlineArrowLongRight size={24} />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <div className="flex h-[30vh] flex-col items-center">
                    <div className="mt-5 text-xl text-gray-800 font-semibold tracking-wide">
                      Fees
                    </div>
                    <Separator className="bg-gray-800 mt-3 mb-5" />
                    <div className="w-full text-sm tracking-widest">
                      {[
                        {
                          name: "Admission",
                          fee: selectedAcademy.admission_fees,
                        },
                        {
                          name: "Monthly",
                          fee: selectedAcademy.monthly_fee,
                        },
                        {
                          name: "Quarterly",
                          fee: selectedAcademy.quarterly_fee,
                        },
                        {
                          name: "Semi Annual",
                          fee: selectedAcademy.half_yearly_fee,
                        },
                        {
                          name: "Annual",
                          fee: selectedAcademy.yearly_fee,
                        },
                      ].map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex h-8 w-full items-center justify-start gap-3"
                          >
                            <div className="w-32 text-gray-800">
                              {item.name}
                            </div>
                            <div className="text-gray-800">
                              {" "}
                              :&nbsp;&nbsp;&#x20B9;{item.fee}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <DialogClose className="h-8 rounded-md bg-gray-800 text-xs text-gray-100 ">
                    Close
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* MORE ACADEMIES */}
        <div className="flex flex-col h-80 gap-3">
          <div className="h-fit flex items-center justify-between font-medium text-lg">
            <span className="flex-1 text-gray-800">More Academies</span>
            <span
              className="w-fit text-gray-800 text-xs hover:underline cursor-pointer"
              onClick={() => {
                navigate("/academy");
              }}
            >
              View all
            </span>
          </div>
          <Separator />
          <div className="flex-1 overflow-x-hidden overflow-y-auto flex flex-col gap-5 mt-5">
            {academies
              .filter((i) => i.id !== academyId)
              .slice(0, 2)
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full h-12 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-between px-5 cursor-pointer"
                    onClick={() => {
                      navigate(`/academy?id=${item.id}`);
                    }}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden">
                        <img
                          src="https://res.cloudinary.com/purnesh/image/upload/w_1080,f_auto/west-delhi-cricket-academy0.jpg"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-sm sm:text-lg font-light">
                          {item.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="text-[8px] sm:text-xs font-medium">
                            {item.ground.name}
                          </div>
                          <div className="text-[8px] sm:text-xs  text-gray-500">
                            ({item.ground.venue.name})
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <HiOutlineArrowLongRight
                        size={20}
                        className="text-gray-400"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyDetails;
