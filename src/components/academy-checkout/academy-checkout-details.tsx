import { Separator } from "@/components/ui/separator";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CiEdit } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  setSelectedSlots,
  setSubscriptionType,
} from "@/store/actions/slices/academySlice";
import { useState } from "react";

interface AcademyCheckoutDetailsProps {
  registrationFormDetails: {
    first_name: string;
    last_name: string;
    guardian_name: string;
    guardian_mobile: string;
    email: string;
    address: string;
    academy: string;
    sport: string;
    slot?: string;
    customer: string;
    ground: string;
    city: string;
    venue: string;
    academy_fee: number;
    subscription_type?: "Monthly" | "Quarterly" | "Half_Yearly" | "Yearly" | null;
    admission_fee?: number;
    profile?: File | null;
    doc?: File | null;
    mobile: string;
  };
}
const AcademyCheckoutDetails: React.FC<AcademyCheckoutDetailsProps> = ({
  registrationFormDetails,
}) => {
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const detailsPageId = searchParams[0].get("id");

  const { academies } = useAppSelector((state: RootState) => state.academy);
  const selectedAcademy = academies.find((i) => i.id === detailsPageId);

  const [hasSlotChanged, setHasSlotChanged] = useState(false);

  return (
    <section className="w-full h-fit lg:h-full flex flex-col gap-2">
      <div className="w-full lg:h-40 flex flex-col lg:flex-row gap-5">
        {/* Subscription type */}
        <div className="w-full lg:w-1/2 h-full rounded-md flex flex-col gap-1">
          <div className="h-1/6 w-full font-medium tracking-wide">
            <span>Tenure</span>
            <Separator />
          </div>
          <div className="flex-1 w-full flex items-start py-5 justify-start">
            <RadioGroup
              value={registrationFormDetails.subscription_type ? registrationFormDetails.subscription_type : undefined}
              className="grid grid-cols-2"
            >
              {selectedAcademy ? (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Monthly"
                    id="r1"
                    onClick={() => {
                      const fee = Number(selectedAcademy?.monthly_fee);
                      dispatch(setSubscriptionType({ type: "Monthly", fee }));
                    }}
                  />
                  <Label className="text-sm lg:text-lg cursor-pointer" htmlFor="r1">
                    Monthly
                  </Label>
                </div>
              ) : null}
              {selectedAcademy ? (
                <div className="flex items-center space-x-2 ml-10">
                  <RadioGroupItem
                    value="Quarterly"
                    id="r2"
                    onClick={() => {
                      const fee = selectedAcademy?.quarterly_fee;
                      dispatch(setSubscriptionType({ type: "Quarterly", fee }));
                    }}
                  />
                  <Label className="text-sm lg:text-lg cursor-pointer" htmlFor="r2">
                    Quarterly
                  </Label>
                </div>
              ) : null}
              {selectedAcademy ? (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Half_Yearly"
                    id="r3"
                    onClick={() => {
                      const fee = selectedAcademy?.half_yearly_fee;
                      dispatch(
                        setSubscriptionType({ type: "Half_Yearly", fee })
                      );
                    }}
                  />
                  <Label className="text-sm lg:text-lg cursor-pointer" htmlFor="r3">
                    Half Yearly
                  </Label>
                </div>
              ) : null}
              {selectedAcademy ? (
                <div className="flex items-center space-x-2 ml-10">
                  <RadioGroupItem
                    value="Yearly"
                    id="r4"
                    onClick={() => {
                      const fee = selectedAcademy?.yearly_fee;
                      dispatch(setSubscriptionType({ type: "Yearly", fee }));
                    }}
                  />
                  <Label className="text-sm lg:text-lg cursor-pointer" htmlFor="r4">
                    Yearly
                  </Label>
                </div>
              ) : null}
            </RadioGroup>
          </div>
        </div>

        {/* Slots */}
        <div className="w-full lg:w-1/2 h-full rounded-md flex flex-col gap-1">
          <div className="h-1/6 w-full font-medium tracking-wide">
            <span>Selected Slot</span>
            <Separator />
          </div>
          <div className="flex-1 w-full flex flex-col items-start pt-5">
            <div className="flex items-center gap-2">
              <span className="border border-[#53A53F] px-3 rounded-full ">
                {registrationFormDetails.slot}
              </span>
              {selectedAcademy ? (
                <Dialog>
                  <DialogTrigger className="cursor-pointer">
                    <CiEdit />
                  </DialogTrigger>
                  <DialogContent aria-describedby="academy slots">
                    <DialogDescription className="sr-only">
                      Slots Details
                    </DialogDescription>
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
                                registrationFormDetails.slot &&
                                registrationFormDetails.slot === item.slot
                                  ? "bg-[#53a53f] text-gray-50"
                                  : "text-[#53a53f] border border-[#53a53f] bg-gray-100"
                              } border-gray-300 px-2 py-1 rounded-xl cursor-pointer`}
                              onClick={() => {
                                if (
                                  registrationFormDetails.slot !== item.slot
                                ) {
                                  dispatch(setSelectedSlots(item.slot));
                                  setHasSlotChanged(true);
                                } else {
                                  setHasSlotChanged(false);
                                }
                              }}
                            >
                              {item.slot}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <DialogClose className="h-8 rounded-md bg-[#53a53f] text-xs text-gray-100 ">
                      {hasSlotChanged ? "Continue" : "Close"}
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              ) : null}
            </div>
            {selectedAcademy ? (
              <div className="flex flex-col items-start mt-3">
                <span className="text-xs font-semibold text-gray-500 tracking-wide">
                  Other Slots
                </span>
                <span className="flex items-center gap-3 overflow-y-hidden overflow-x-auto text-xs mt-3">
                  {selectedAcademy.slotTimes
                    .filter((i) => i.slot !== registrationFormDetails.slot)
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="px-3 bg-gray-300 rounded-full py-1 text-gray-600"
                        >
                          {item.slot}
                        </div>
                      );
                    })}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-md flex flex-col gap-1">
        <div className="h-8 w-full font-medium tracking-wide flex items-end">
          <span>Details</span>
          {/* <Separator /> */}
        </div>
        <div className="flex-1 w-full border border-[#53a53f44] rounded-md flex flex-col items-start py-5 px-5">
          <div className="h-6 lg:h-10 w-full mb-2">
            <div className="h-full w-full ">
              {selectedAcademy && (
                <span className="text-base lg:text-xl">{selectedAcademy.name}</span>
              )}
              <Separator />
            </div>
          </div>
          <div className="h-8 w-full flex items-center gap-3 text-sm">
            <div className="flex items-center gap-3 w-1/2 lg:w-fit">
              <span>First <span className="hidden lg:inline-block">Name</span>: </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.first_name}
              </span>
            </div>
            <div className="flex items-center gap-3 w-1/2 lg:w-fit">
              <span>Last <span className="hidden lg:inline-block">Name</span>: </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.last_name}
              </span>
            </div>
          </div>
          <div className="lg:h-8 w-full flex flex-col lg:flex-row items-start lg:items-center gap-3 text-sm mb-3 lg:mb-0">
            <div className="flex items-center gap-3">
              <span>Mobile: </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.mobile}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>Email: </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.email}
              </span>
            </div>
          </div>
          <div className="lg:h-8 w-full flex flex-col lg:flex-row items-start lg:items-center gap-3 text-sm mb-3 lg:mb-0">
            <div className="flex items-center gap-3">
              <span>Guardian's Name: </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.guardian_name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>Guardian's Mobile: </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.guardian_mobile}
              </span>
            </div>
          </div>
          <div className="lg:h-8 w-full flex flex-col lg:flex-row items-start lg:items-center gap-3 text-sm mb-3 lg:my-5">
            <div className="flex items-center gap-5">
              <span>Slot: </span>
              <span className="font-semibold tracking-wide px-3 py-1 rounded-full bg-[#53a53f] text-gray-100">
                {registrationFormDetails.slot}
              </span>
            </div>
          </div>
          <div className="lg:h-8 w-full flex flex-col lg:flex-row items-start lg:items-center gap-3 text-sm mb-3 lg:my-1">
            <div className="flex items-center gap-3">
              <span>Subscription Type: </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.subscription_type === "Half_Yearly"
                  ? "Half Yearly"
                  : registrationFormDetails.subscription_type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyCheckoutDetails;
