import { useAppSelector } from "@/store/hooks";
import { Button } from "../ui/button";
import { RootState } from "@/store";
import { useSearchParams } from "react-router-dom";

const AcademyCheckoutSummary = () => {
  const searchParams = useSearchParams();
  const academyId = searchParams[0].get("id");

  const { academies, registrationFormDetails } = useAppSelector(
    (state: RootState) => state.academy
  );

  const selectedAcademy = academies.find((i) => i.id === academyId);

  return (
    <div className="flex flex-col bg-[#FFFFFF] border rounded-lg p-4 gap-4">
      <span className="inline-block text-[16px] font-semibold">
        Academy Subscription
      </span>
      {selectedAcademy ? (
        <div className="flex flex-row justify-between">
          <span className="inline-block text-[12px]">Academy</span>
          <span className="inline-block text-[12px] text-[#000000] font-semibold">
            {selectedAcademy.name}
          </span>
        </div>
      ) : null}
      <div className="flex flex-row justify-between">
        <span className="inline-block text-[12px]">Slot</span>
        <span className="inline-block text-[12px] text-[#000000] font-semibold">
          {" "}
          {registrationFormDetails.slot}
        </span>
      </div>
      {registrationFormDetails.subscription_type && (
        <div className="flex flex-row justify-between">
          <span className="inline-block text-[12px]">Subscription Type</span>
          <span className="inline-block text-[12px] text-[#000000] font-semibold">
            {registrationFormDetails.subscription_type === "Half_Yearly"
              ? "Half Yearly"
              : registrationFormDetails.subscription_type}
          </span>
        </div>
      )}

      <div className="flex flex-row justify-between">
        <span className="inline-block text-[12px]">Admission Fee</span>
        <span className="inline-block text-[12px] text-[#000000] font-semibold">
          {`₹ ${registrationFormDetails.admission_fee}`}
        </span>
      </div>

      {registrationFormDetails.subscription_type && (
        <div className="flex flex-row justify-between">
          <span className="inline-block text-[12px]">
            {registrationFormDetails.subscription_type === "Half_Yearly"
              ? "Half Yearly"
              : registrationFormDetails.subscription_type}{" "}
            Subscription Fee
          </span>
          <span className="inline-block text-[12px] text-[#000000] font-semibold">
            {`₹ ${registrationFormDetails.academy_fee}`}
          </span>
        </div>
      )}

      {registrationFormDetails.subscription_type && (
        <Button className="bg-[#252525]">
          Proceed INR{" "}
          {registrationFormDetails.academy_fee +
            registrationFormDetails.admission_fee}
        </Button>
      )}
    </div>
  );
};

export default AcademyCheckoutSummary;
