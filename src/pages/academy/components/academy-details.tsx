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
import { setSelectedSlots } from "@/store/actions/slices/academySlice";

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

  const selectedAcademy = academies.find((i) => i.id === academyId);
  return (
    <div className="h-screen flex items-start gap-10">
      <div className="h-full flex-1">
        {!!selectedAcademy ? (
          <div className="w-full h-full overflow-hidden flex flex-col">
            <div className="w-full h-20 text-3xl flex items-center justify-between">
              <span>{selectedAcademy.name}</span>
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
                  className="text-sm bg-[#53a53fd7] flex items-center gap-2 px-5 py-2 rounded-full font-medium text-gray-50 cursor-pointer"
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
            <Separator />

            <div className="flex-1 w-full flex gap-5">
              {/* IMAGE */}
              <div className="flex-1 h-full flex items-center justify-start rounded-md">
                <div className="h-[88%] w-full rounded-md overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/purnesh/image/upload/w_1080,f_auto/west-delhi-cricket-academy0.jpg"
                    alt=""
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="w-80 h-full flex flex-col">
                {/* SLOTS */}
                <div className="h-3/5 w-full flex items-center justify-center">
                  <span className="w-full h-4/5 bg-gray-100 rounded-md py-2 px-5 flex flex-col gap-3 border border-[#53a53f]">
                    <h2 className="font-medium tracking-wider">Slots</h2>
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
                    <div className="h-[55%] w-full bg-[#53a53f] rounded-xl py-2 px-5 flex gap-1 text-gray-100">
                      <div className="flex-1 flex flex-col gap-2 items-start justify-center">
                        <div className="flex items-center gap-1">
                          <RiMoneyRupeeCircleLine color="white" size={24} />
                          <p className="text-xl font-medium tracking-wide">
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
                      <div className="mt-5 text-xl text-[#53a53f] font-semibold tracking-wide">
                        Fees
                      </div>
                      <Separator className="bg-[#53a53f] mt-3 mb-5" />
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
                              <div className="w-32 text-[#53a53f]">
                                {item.name}
                              </div>
                              <div className="text-[#53a53f]">
                                {" "}
                                :&nbsp;&nbsp;&#x20B9;{item.fee}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <DialogClose className="h-8 rounded-md bg-[#53a53f] text-xs text-gray-100 ">
                      Close
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* DESCRIPTION */}
            <section className="h-72 w-full flex flex-col">
              <h1 className="font-semibold tracking-wide h-10">
                About Academy
              </h1>
              <div className="flex-1 w-full"></div>
              <div className="h-20 w-full flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">Venue:</span>
                    <span className="font-semibold tracking-wider">
                      {selectedAcademy.ground.venue.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">Ground:</span>
                    <span className="font-semibold tracking-wider">
                      {selectedAcademy.ground.name}
                    </span>
                  </div>
                </div>
                <span className="italic text-sm text-gray-700">
                  {`@${selectedAcademy.name}`}
                </span>
              </div>
            </section>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="h-full w-80 flex flex-col gap-3">
        <div className="h-20 flex flex-col items-start justify-end gap-1 font-medium text-lg text-[#3fa56aaf]">
          <span>More Academies</span>
          {/* <Separator /> */}
        </div>
        <div className="flex-1 overflow-x-hidden overflow-y-auto ">
          {academies
            .filter((i) => i.id !== academyId)
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className="h-24 w-full rounded-md bg-gray-50"
                ></div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AcademyDetails;
