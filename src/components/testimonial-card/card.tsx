import Quote from "../../../public/images/quote.svg";
import viewers from "../../../public/images/viewers.webp";

export const TestimonialCard = () => {
  return (
    <div className="px-4">
      <div className="feedback-card relative p-5 bg-background2 rounded-xl py-12 text-left border-2 border-gray-50 shadow-lg shadow-zinc-400">
        <img
          src={Quote}
          className="testi-icon absolute -top-4 left-5"
          alt="icon"
        />
        <p className="text-zinc-700 mt-4 mb-16">
          Have been using this app to book cricket turfs and it's the best I
          have come across. The turf options are great and their customer
          support team is also very helpful and quick to revert. I regularly get
          offers and coupons also which gives a good discount for my turf
          booking.
        </p>
        <div className="viewer flex justify-end w-full gap-4 align-center mt-6">
          <img src={viewers} className="rounded-full w-14 h-14" alt="viewer" />
          <div className="flex flex-col items-end justify-start">
            <p className="font-semibold">Chirag Chedda</p>
            <small className="text-xs font-medium text-zinc-600">pAY n pLAY uSER</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
