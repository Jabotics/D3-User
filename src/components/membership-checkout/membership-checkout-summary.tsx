import { useAppSelector } from "@/store/hooks";
import { Button } from "../ui/button";
import { RootState } from "@/store";
import { useSearchParams } from "react-router-dom";
import { useJoinMembershipMutation } from "@/store/actions/slices/membershipSlice";

const MembershipCheckoutSummary = ({ hasSubmit }: { hasSubmit: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const searchParams = useSearchParams();
  const academyId = searchParams[0].get("id");

  const [joinMembership] = useJoinMembershipMutation()

  const { memberships, registrationFormDetails } = useAppSelector(
    (state: RootState) => state.membership
  );
  const selectedPromo = useAppSelector((state: RootState) => state.promocode.selectedPromo)
  const { newPrice } = useAppSelector((state: RootState) => state.promocode);
  const selectedMembership = memberships.find((i) => i.id === academyId);
  const handleSubmitRegistration = async () => {
    try {
      const formData = new FormData()
      const { membership, membership_fee, address, joining_fee, city, customer, email, first_name, ground, guardian_mobile, guardian_name, last_name, sport, venue, doc, profile, slot, subscription_type } = registrationFormDetails;

      let slotId;
      if (slot) {
        slotId = selectedMembership?.slotTimes.find(i => i.slot === slot)?._id
      }

      formData.append('membership', membership)
      formData.append('membership_fee', String(membership_fee))
      formData.append('address', address)
      formData.append('joining_fee', String(joining_fee))
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

      joinMembership({
        formData
      });

      hasSubmit(true);

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex flex-col bg-[#FFFFFF] border rounded-lg p-4 gap-4">
      <span className="inline-block text-[16px] font-semibold">
        Membership Subscription
      </span>
      {/* {selectedAcademy ? (
        <div className="flex flex-row justify-between">
          <span className="inline-block text-[12px]">Academy</span>
          <span className="inline-block text-[12px] text-[#000000] font-semibold">
            {selectedAcademy.name}
          </span>
        </div>
      ) : null} */}
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
          {`₹ ${registrationFormDetails.joining_fee}`}
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
            {`₹ ${registrationFormDetails.membership_fee}`}
          </span>
        </div>
      )}

      {registrationFormDetails.subscription_type && (
        <Button className="bg-[#252525]" onClick={handleSubmitRegistration}>
          Proceed INR{" "}
          {(newPrice.discount > 0 && selectedPromo !== null) ? (registrationFormDetails.membership_fee +
            registrationFormDetails.joining_fee - newPrice.discount) : (registrationFormDetails.membership_fee +
              registrationFormDetails.joining_fee)}

        </Button>
      )}
    </div>
  );
};

export default MembershipCheckoutSummary;
