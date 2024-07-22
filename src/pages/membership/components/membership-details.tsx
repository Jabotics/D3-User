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
import {
  // resetLocationArr,
  setSelectedSlots,
} from "@/store/actions/slices/membershipSlice";
import { APIEndPoints } from "@/APIEndpoint";

import { FaRegPlayCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

import { useGetGroundQuery } from "@/store/actions/slices/groundSlice";
import { IGround } from "@/interface/data";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { MdCardMembership } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { CgCloseR } from "react-icons/cg";

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

interface MembershipDetailsProps {
  membershipId: string;
}
const MembershipDetails: React.FC<MembershipDetailsProps> = ({
  membershipId,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const [groundId, setGroundId] = useState<string | null>(null);

  useGetGroundQuery({}, { refetchOnMountOrArgChange: true });
  const { grounds } = useAppSelector((state: RootState) => state.ground);

  const { memberships, selectedSlot } = useAppSelector(
    (state: RootState) => state.membership
  );

  const { hasToken, userData } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [selectedGround, setSelectedGround] = useState<IGround | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const selectedMembership = memberships.find((i) => i.id === membershipId);

  const [hasSelectVideo, setHasSelectVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   dispatch(resetLocationArr());
  // }, [membershipId]);

  useEffect(() => {
    if (selectedMembership) {
      const groundId = selectedMembership.ground._id;

      const selectedGround = grounds.find((i) => i.id === groundId);
      if (selectedGround) {
        setSelectedGround(selectedGround);

        if (selectedGround.images !== undefined) {
          setSelectedImg(selectedGround.images[0]);
        }

        if (selectedGround.video !== undefined) {
          const refactoredVideoUrl = getEmbedUrl(selectedGround.video);
          setVideoUrl(refactoredVideoUrl);
        }
      }
    }
  }, [selectedMembership, grounds, getEmbedUrl]);

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="flex-1 w-full flex gap-5">
        {selectedMembership ? (
          <>
            <div className="flex-1 h-full flex flex-col gap-2">
              <div className="h-12 w-full flex flex-col items-center justify-center">
                <h1 className="text-2xl font-medium tracking-wide">
                  {selectedMembership?.ground?.name}
                </h1>
                <p className="text-sm tracking-wider text-gray-400 font-black">{`${selectedMembership?.sport?.name} Membership`}</p>
              </div>
              <Separator />
              <div className="flex-1 w-full flex gap-0 mt-3">
                <div className="w-12 h-full mr-1 flex flex-col overflow-y-auto overflow-x-hidden gap-2 filter-sc">
                  {selectedGround &&
                    selectedGround.images?.length > 0 &&
                    selectedGround.images?.slice(0, 2).map((url, index) => {
                      return (
                        <div
                          key={index}
                          className={`w-8 h-8 bg-gray-100 ${
                            selectedImg === url &&
                            "border-[3px] border-[#53a53f]"
                          } rounded-lg shrink-0`}
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
                    })}
                  {selectedGround && selectedGround.video?.length > 0 ? (
                    <div
                      className="w-8 h-8 bg-gray-100 flex items-center justify-center border-2 border-gray-300 text-gray-700 rounded-md cursor-pointer"
                      onClick={() => {
                        setHasSelectVideo(true);
                        setSelectedImg(null);
                      }}
                    >
                      <FaRegPlayCircle size={20} />
                    </div>
                  ) : (
                    <></>
                  )}

                  {selectedGround &&
                    selectedGround.images?.length > 0 &&
                    selectedGround.images
                      ?.slice(2, selectedGround.images.length)
                      .map((url, index) => {
                        return (
                          <div
                            key={index}
                            className={`w-8 h-8 ${
                              selectedImg === url &&
                              "border-[3px] border-[#53a53f]"
                            } bg-gray-100 rounded-lg shrink-0`}
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
                      })}
                </div>
                <div
                  className="flex-1 h-full w-[93%] bg-black flex items-center justify-center rounded-2xl"
                  style={{
                    backgroundImage: `url(${APIEndPoints.BackendURL}/${selectedImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {selectedGround && selectedGround.video && hasSelectVideo && (
                    <iframe
                      width="100%"
                      height="100%"
                      className="rounded-2xl"
                      src={`${videoUrl}`}
                      title="YouTube Video Player"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[30vw] h-full ">
              <div className="w-full h-full flex flex-col gap-4">
                <div className="w-full h-12 flex flex-col items-start justify-center text-xl text-[#53a53f]">
                  About Membership
                </div>
                <div className="w-full h-1/6 flex flex-col gap-2">
                  <h2 className="text-sm font-light">
                    Venue :{" "}
                    <span className="font-semibold tracking-wider">
                      {selectedMembership.ground.venue?.name}
                    </span>
                  </h2>
                  <h2 className="text-sm font-light">
                    Ground :{" "}
                    <span className="font-semibold tracking-wider">
                      {selectedMembership.ground.name}
                    </span>
                  </h2>

                  <Dialog>
                    <DialogTrigger>
                      <p className="text-xs text-gray-400 flex items-center gap-2 cursor-pointer">
                        <AiOutlineExclamationCircle className="text-amber-700/80" />{" "}
                        <span>Rules & Amenities</span>
                      </p>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="flex h-[30vh] flex-col items-center">
                        <div className="mt-5 w-full items-center justify-start text-xs text-gray-600 font-light mb-2 tracking-wide">
                          Amenities :
                        </div>
                        <div className="w-full text-sm tracking-widest flex flex-wrap gap-3">
                          {selectedGround &&
                            selectedGround.amenities.map((amenity, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex h-5 px-3 border border-gray-300 text-gray-600 rounded-xl text-xs items-center justify-center gap-3"
                                >
                                  {amenity}
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

                <div className="h-40 w-full">
                  <span className="w-full h-full bg-gray-100 rounded-md py-2 px-5 flex flex-col gap-3 border border-[#53a53f3d]">
                    <h2 className="font-medium tracking-wider text-sm">
                      Timings
                    </h2>
                    <Separator className="bg-gray-300" />
                    <span className="h-fit w-full flex flex-wrap gap-2">
                      {selectedMembership.slotTimes.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="text-sm h-fit whitespace-nowrap border-[1px] bg-[#53a53f] text-gray-50 border-gray-300 px-2 py-1 rounded-xl"
                          >
                            {item.slot}
                          </div>
                        );
                      })}
                    </span>
                  </span>
                </div>

                {!userData?.joined_memberships?.includes(membershipId) ? (
                  <Dialog>
                    <DialogTrigger className="flex-1 w-full">
                      <div className="h-[65%] w-full bg-gray-900 rounded-xl py-3 px-5 flex gap-1 text-gray-100">
                        <div className="flex-1 flex flex-col gap-1 items-start justify-center">
                          <div className="flex items-center gap-1">
                            <MdCardMembership
                              className="text-gray-300"
                              size={20}
                            />
                            <p className="text-base font-light tracking-wide">
                              Subscriptions
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 whitespace-nowrap">
                            Click to view the fees of the subscription.
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
                              fee: selectedMembership.admission_fee,
                            },
                            {
                              name: "Monthly",
                              fee: selectedMembership.monthly_fee,
                            },
                            {
                              name: "Quarterly",
                              fee: selectedMembership.quarterly_fee,
                            },
                            {
                              name: "Semi Annual",
                              fee: selectedMembership.half_yearly_fee,
                            },
                            {
                              name: "Annual",
                              fee: selectedMembership.yearly_fee,
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
                ) : (
                  <Dialog>
                    <DialogTrigger className="flex-1 w-full">
                      <div className="h-[65%] w-full bg-gray-900 rounded-xl py-3 px-5 flex gap-1 text-gray-100">
                        <div className="flex-1 flex flex-col gap-1 items-start justify-center">
                          <div className="flex items-center gap-1">
                            <MdCardMembership
                              className="text-gray-300"
                              size={20}
                            />
                            <p className="text-base font-light tracking-wide">
                              Your Subscription
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 whitespace-nowrap">
                            Click to view the validity of the current
                            subscription.
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
                          Current Subscription
                        </div>
                        <Separator className="bg-gray-800 mt-3 mb-5" />
                        <div className="w-full">{}</div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className="h-[33%] w-full flex items-start gap-5">
        <div className="flex-1 w-full h-full flex items-start gap-4">
          <div className="flex-1 flex flex-col gap-5">
            <div className="h-12 w-full flex items-end">
              <div className="w-full text-sm tracking-widest flex flex-wrap gap-3">
                {selectedGround &&
                  selectedGround.amenities.map((amenity, index) => {
                    return (
                      <div
                        key={index}
                        className="flex h-5 px-3 border border-gray-300 text-gray-600 rounded-xl text-xs items-center justify-center gap-3"
                      >
                        {amenity}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex-1 w-full flex flex-col gap-5">
              <h1 className="text-xs font-medium tracking-wider">Rules</h1>
              <div className="flex-1 w-full flex flex-wrap gap-5">
                {selectedGround &&
                  selectedGround.rules &&
                  [
                    ...selectedGround.rules.allowed,
                    ...selectedGround.rules.not_allowed,
                  ].map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex text-xs items-center gap-2 h-fit ${
                          index > selectedGround.rules.allowed.length - 1
                            ? "text-[#53a53f]"
                            : "text-rose-700"
                        }`}
                      >
                        {index > selectedGround.rules.allowed.length - 1 ? (
                          <SiTicktick />
                        ) : (
                          <CgCloseR />
                        )}
                        <div>{`${item}`}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="w-[15vw] h-full flex items-start justify-center">
            <div className="h-12 w-full flex items-end justify-end">
              {!userData?.joined_memberships?.includes(membershipId) ? (
                <Dialog>
                  <DialogTrigger
                    className="w-full h-10 flex items-center justify-between rounded-xl px-5 bg-[#53a53f] text-[#e8fce2] hover:text-gray-50 cursor-pointer hover:bg-[#53a53fd2]"
                    onClick={() => {
                      if (hasToken) {
                        if (selectedSlot) {
                          navigate(`/membership?id=${membershipId}&join=1`);
                        }
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    <span>Subscribe</span>
                    <HiOutlineArrowLongRight size={20} />
                  </DialogTrigger>
                  <DialogContent aria-describedby="academy slots">
                    <div className="flex h-[30vh] flex-col items-center">
                      <DialogTitle className="mt-5 text-xl text-[#53a53f] font-semibold tracking-wide">
                        Selected Slot
                      </DialogTitle>
                      <Separator className="bg-[#53a53f] mt-3 mb-5" />
                      <div className="w-full text-sm tracking-widest flex flex-col gap-1">
                        {selectedMembership &&
                          selectedMembership.slotTimes.map((item, index) => {
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
                          navigate(`/membership?id=${membershipId}&join=1`);
                        }
                      }}
                    >
                      {selectedSlot ? "Continue" : "Close"}
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              ) : (
                <span className="text-sm bg-[#3fa583] flex items-center gap-2 px-5 py-2 rounded-full font-medium text-gray-50 ">
                  <p>
                    <MdCardMembership size={20} />
                  </p>
                  <p>Subscribed</p>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="w-[30vw] h-full flex flex-col items-start justify-start">
          <h1 className="font-medium tracking-wide">More Memberships</h1>
          <Separator />
          <div className="flex-1 w-full mt-5"></div>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetails;
