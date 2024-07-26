import { Separator } from "@/components/ui/separator";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { CiEdit } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import {
  // setSelectedSlots,
  setSubscriptionType,
} from "@/store/actions/slices/academySlice";
// import { useState } from "react";
import { WiDirectionLeft } from "react-icons/wi";

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
    shift?: "morning" | "evening";
    customer: string;
    ground: string;
    city: string;
    venue: string;
    academy_fee: number;
    subscription_type?:
      | "Monthly"
      | "Quarterly"
      | "Half_Yearly"
      | "Yearly"
      | null;
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

  // const [hasSlotChanged, setHasSlotChanged] = useState(false);

  return (
    <section className="w-full h-fit lg:h-full flex flex-col gap-2">
      <div className="w-full lg:h-40 flex flex-col lg:flex-row gap-5">
        {/* Subscription type */}
        <div className="w-full lg:w-1/2 h-full rounded-md flex flex-col gap-1">
          <div className="h-1/6 w-full font-medium tracking-wide">
            <span className="flex items-center gap-2">
              <p>Tenure</p>
              {!registrationFormDetails.subscription_type && (
                <WiDirectionLeft
                  size={20}
                  className="animate-pulse text-[#53A53F]"
                />
              )}
            </span>
            <Separator />
          </div>
          <div className="flex-1 w-full flex items-start py-5 justify-start">
            <RadioGroup
              value={
                registrationFormDetails.subscription_type
                  ? registrationFormDetails.subscription_type
                  : undefined
              }
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
                  <Label
                    className="text-sm lg:text-base tracking-wider cursor-pointer"
                    htmlFor="r1"
                  >
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
                  <Label
                    className="text-sm lg:text-base tracking-wider cursor-pointer"
                    htmlFor="r2"
                  >
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
                  <Label
                    className="text-sm lg:text-base tracking-wider cursor-pointer"
                    htmlFor="r3"
                  >
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
                  <Label
                    className="text-sm lg:text-base tracking-wider cursor-pointer"
                    htmlFor="r4"
                  >
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
              <span className="border text-xs border-[#53A53F] px-5 py-1 tracking-wider rounded-full font-medium">
                {registrationFormDetails.shift}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="flex-1 rounded-md flex flex-col gap-1">
        <div className="h-8 w-full font-medium tracking-wide flex items-end">
          <span>Details</span>
          {/* <Separator /> */}
        </div>
        <div className="flex-1 w-full border border-[#53a53f44] rounded-md flex flex-col items-start py-5 px-5">
          <div className="h-6 lg:h-10 w-full mb-2">
            <div className="h-full w-full ">
              {selectedAcademy && (
                <span className="text-base font-semibold tracking-wider">
                  {selectedAcademy.name}
                </span>
              )}
              <Separator />
            </div>
          </div>
          <div className="h-8 w-full lg:w-1/2 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-3 w-1/2">
              <span>
                First <span className="hidden lg:inline-block">Name</span>:{" "}
              </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.first_name}
              </span>
            </div>
            <div className="flex items-center gap-3 w-1/2">
              <span>
                Last <span className="hidden lg:inline-block">Name</span>:{" "}
              </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.last_name}
              </span>
            </div>
          </div>
          <div className="lg:h-8 w-full lg:w-1/2 flex flex-col lg:flex-row items-start lg:items-center gap-3 text-sm mb-3 lg:mb-0">
            <div className="flex items-center gap-3 w-full lg:w-1/2">
              <span>Mobile: </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.mobile}
              </span>
            </div>
            <div className="flex items-center gap-3 w-full lg:w-1/2">
              <span>Email: </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.email}
              </span>
            </div>
          </div>
          <div className="lg:h-8 w-full lg:w-1/2 flex flex-col lg:flex-row items-start lg:items-center gap-3 text-sm mb-3 lg:mb-0">
            <div className="flex items-center gap-3 w-full lg:w-1/2">
              <span>Guardian's Name: </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.guardian_name}
              </span>
            </div>
            <div className="flex items-center gap-3 w-full lg:w-1/2">
              <span>Guardian's Mobile: </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.guardian_mobile}
              </span>
            </div>
          </div>
          <div className="lg:h-8 w-full flex flex-col lg:flex-row items-start lg:items-center gap-3 text-sm mb-3 lg:my-5">
            <div className="flex items-center gap-5">
              <span>Batch: </span>
              <span className="font-semibold tracking-wide px-3 py-1 rounded-full bg-[#53a53f] text-gray-100">
                {registrationFormDetails.shift}
              </span>
            </div>
          </div>
          <div className="lg:h-8 w-full flex flex-col lg:flex-row items-start lg:items-center gap-3 text-sm mb-3 lg:my-1">
            <div className="flex items-center gap-3">
              <span>Subscription Type: </span>
              <span className="font-semibold tracking-wide">
                {registrationFormDetails.subscription_type ? (
                  registrationFormDetails.subscription_type ===
                  "Half_Yearly" ? (
                    "Half Yearly"
                  ) : (
                    registrationFormDetails.subscription_type
                  )
                ) : (
                  <div className="font-normal bg-[#d9f7d5] px-3 py-1 rounded-xl text-[#53a53f] animate-fade-in-out">
                    Select Subscription type
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademyCheckoutDetails;
