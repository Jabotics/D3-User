import { useEffect } from "react";
import FeedbackForm from "./feedback-form";

const ContactFeedback = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-fit min-w-screen overflow-hidden">
      <div className="h-[35vh] w-full flex items-center justify-start bg-[#53a53f] relative">
        <span className="absolute text-gray-50 translate-x-40 text-[3rem]">
          Share your Feedback
        </span>
      </div>

      <div className="px-40 mt-40">
      <h1 className="text-4xl font-light mt-8">
        Help us to Improve.
      </h1>
      <p className="mt-4 text-lg font-light">
        Asterisk (*) indicates required field.
      </p>

      <div className="h-screen">
        <FeedbackForm />
      </div>
      </div>
    </div>
  );
};

export default ContactFeedback;
