import { useEffect } from "react";
import ReviewForm from "./review-form";

const ContactFeedback = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-fit min-w-screen overflow-hidden">
      <div className="h-[35vh] w-full flex items-center justify-start bg-[#53a53f] relative">
        <span className="absolute text-gray-50 translate-x-40 text-[3rem]">
          Share your Review
        </span>
      </div>

      <div className="px-40 mt-40">
      <h1 className="text-4xl font-light mt-8">
        Share your Review with us.
      </h1>
      <p className=" font-light">
        Help us to improve by sharing your review with us.
      </p>
      <p className="mt-4 text-lg font-light">
        Asterisk (*) indicates required field.
      </p>

      <div className="h-screen">
        <ReviewForm />
      </div>
      </div>
    </div>
  );
};

export default ContactFeedback;
