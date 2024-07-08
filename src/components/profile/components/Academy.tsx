import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isDueDatePassed } from "@/lib/utils";
import { RootState } from "@/store";
import { useMyAcademiesQuery } from "@/store/actions/slices/academySlice";
import { useAppSelector } from "@/store/hooks";
import { TooltipContent } from "@radix-ui/react-tooltip";

import { IoCalendarOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";

import { FaExclamation } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Loader from "@/components/loader";
import { useNavigate } from "react-router-dom";

const Academy = () => {
  const navigate = useNavigate();

  const { isLoading } = useMyAcademiesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { joinedAcademies } = useAppSelector(
    (state: RootState) => state.academy
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <TooltipProvider>
      {joinedAcademies && joinedAcademies.length >= 0 ? (
        <div className="hidden flex-col gap-4 w-full sm:flex">
          <span className="inline-block text-sm font-base">My Academy</span>
          <div id="bookings" className="w-full flex flex-col gap-4">
            <div className="bg-white/90 flex flex-row justify-between p-4 rounded-lg">
              <div className="text-sm w-1/6 flex justify-center font-light tracking-wide">
                Academy
              </div>
              <div className="text-sm w-1/3 flex justify-center font-light tracking-wide">
                Ground Name
              </div>
              <div className="text-sm w-1/6 flex justify-center font-light tracking-wide">
                Joined On
              </div>
              <div className="text-sm w-1/6 flex justify-center font-light tracking-wide">
                Timing
              </div>
              <div className="text-sm w-1/6 flex justify-center font-light tracking-wide">
                Status
              </div>
            </div>
            <div className="w-full h-[45vh] overflow-x-hidden overflow-y-auto flex flex-col gap-2">
              {joinedAcademies.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row justify-between p-4 bg-white rounded-lg h-20"
                  >
                    <div className="text-sm w-1/6 flex items-center justify-center font-medium tracking-wide">
                      {item.academy}
                    </div>
                    <div className="text-sm w-1/3 flex flex-col items-center justify-center tracking-wide">
                      <span className="text-xl font-base">{item.ground}</span>
                      <span className="text-xs font-light">{item.venue}</span>
                    </div>

                    <div className="text-sm w-1/6 flex items-center justify-center font-medium tracking-wide gap-2">
                      <IoCalendarOutline size={20} className="text-gray-500" />
                      <span className="text-gray-500">{item.joined_date}</span>
                    </div>
                    <div className="text-sm w-1/6 flex items-center justify-center font-medium tracking-wide ">
                      <span className="bg-[#69b456] px-3 py-1 rounded-lg text-gray-100">
                        {item.slot}
                      </span>
                    </div>
                    <div className="text-sm w-1/6 flex items-center justify-center gap-3 tracking-wide">
                      {item["re-admission_required"] ? (
                        <>
                          <Tooltip>
                            <TooltipTrigger>
                              <RxCrossCircled
                                size={25}
                                className="text-rose-800"
                              />
                            </TooltipTrigger>
                            <TooltipContent className="text-[10px] text-gray-600">
                              Fee Payment Is Not Allowed, Apply Again.
                            </TooltipContent>
                          </Tooltip>
                          <span className="text-xs font-base bg-gray-900 text-gray-100 px-3 py-1 rounded-md cursor-pointer">
                            Join Again
                          </span>
                        </>
                      ) : !isDueDatePassed(item.payment_due_date) ? (
                        <>
                          <Dialog>
                            <DialogTrigger className="p-1 rounded-full text-teal-100 bg-[#69b456]">
                              <TiTick size={25} />
                            </DialogTrigger>
                            <DialogContent>Hey</DialogContent>
                          </Dialog>
                        </>
                      ) : (
                        <>
                          <Dialog>
                            <DialogTrigger className="p-3 rounded-full text-amber-500 bg-amber-100">
                              <FaExclamation />
                            </DialogTrigger>
                            <DialogContent>Hey</DialogContent>
                          </Dialog>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex items-center justify-center">
              <div
                className="px-16 py-3 rounded-full text-sm bg-gray-900 text-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/academy");
                }}
              >
                Browse All Academies
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </TooltipProvider>
  );
};

export default Academy;
