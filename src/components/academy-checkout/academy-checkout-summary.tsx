import { useAppSelector } from "@/store/hooks";
import { Button } from "../ui/button";
import { RootState } from "@/store";
import { useSearchParams } from "react-router-dom";
import { useJoinAcademyMutation } from "@/store/actions/slices/academySlice";
import React, { useState } from "react";
import { useVerifySessionQuery } from "@/store/actions/slices/authSlice";

const AcademyCheckoutSummary = ({ hasSubmit }: { hasSubmit: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const searchParams = useSearchParams();
  const academyId = searchParams[0].get("id");

  const [toRefetchUserData, setToRefetchUserData] = useState(false)
  useVerifySessionQuery({}, { skip: !toRefetchUserData })

  const [joinAcademy] = useJoinAcademyMutation()

  const { academies, registrationFormDetails } = useAppSelector(
    (state: RootState) => state.academy
  );
  const { newPrice } = useAppSelector((state: RootState) => state.promocode);
  const selectedAcademy = academies.find((i) => i.id === academyId);
  const selectedPromo = useAppSelector((state: RootState) => state.promocode.selectedPromo)
  const handleSubmitRegistration = async () => {

    try {
      const formData = new FormData()
      const { academy, academy_fee, address, admission_fee, city, customer, email, first_name, ground, guardian_mobile, guardian_name, last_name, sport, venue, doc, profile, slot, subscription_type } = registrationFormDetails;

      let slotId;
      if (slot) {
        slotId = selectedAcademy?.slotTimes.find(i => i.slot === slot)?._id
      }

      formData.append('academy', academy)
      formData.append('academy_fee', String(academy_fee))
      formData.append('address', address)
      formData.append('admission_fee', String(admission_fee))
      formData.append('city', city)
      formData.append('customer', customer)
      formData.append('email', email)
      formData.append('first_name', first_name)
      formData.append('ground', ground)
      formData.append(`guardian's_mobile`, guardian_mobile)
      formData.append(`guardian's_name`, guardian_name)
      formData.append('last_name', last_name)
      // formData.append('mobile', mobile)
      formData.append('sport', sport)
      formData.append('venue', venue)
      if (doc) {
        formData.append('doc', doc);
      }
      if (profile) {
        formData.append('profile', profile);
      }
      if (slotId) {
        formData.append('slot', slotId)
      }
      formData.append('subscription_type', String(subscription_type))

      joinAcademy({
        formData
      })

      hasSubmit(true)
      setToRefetchUserData(true);

    } catch (error) {
      console.log(error)
    }
  };

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
        <Button className="bg-[#252525]" onClick={handleSubmitRegistration}>
          Proceed INR{" "}
          {(newPrice.discount > 0 && selectedPromo !== null) ? (registrationFormDetails.academy_fee +
            registrationFormDetails.admission_fee - newPrice.discount) : (registrationFormDetails.academy_fee +
              registrationFormDetails.admission_fee)}

        </Button>
      )}
    </div>
  );
};

export default AcademyCheckoutSummary;
