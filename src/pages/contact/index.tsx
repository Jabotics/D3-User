import { useRef } from "react";

const Contact = () => {
  const overviewRef = useRef<HTMLDivElement>(null);

  const scrollToOverview = () => {
    if (overviewRef.current) {
      overviewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <div className="h-fit min-w-screen overflow-hidden">
      <div
        className="h-[65vh] w-full flex items-center justify-start relative"
        style={{
          backgroundImage: "url('/images/contact.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-full w-full bg-gradient-to-b from-teal-900 to-gray-900 opacity-65" />
        <span className="absolute text-gray-50 translate-x-40 text-[3rem]">
          Contact Us
        </span>
        <div className="absolute bottom-4 left-40 text-gray-50 text-lg flex items-center gap-10">
          {[
            {
              title: "Overview",
            },
            {
              title: "All Venues",
            },
            {
              title: "Customer Feedback",
            },
            {
              title: "Press Contacts",
            },
          ].map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => scrollToOverview()}
                className="cursor-pointer"
              >
                {item.title}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="flex items-start justify-start gap-40 px-40 mt-40"
        ref={overviewRef}
        id="overview"
      >
        <div className="w-[20vw] flex flex-col">
          <h2 className="text-[2.5rem] font-light">Office</h2>
          <h4 className="font-medium text-lg mt-12">Howrah</h4>
          <p className="text-lg font-light">625 Maryville Centre Drive</p>
          <p className="text-lg font-light">Suite 200</p>
          <p className="text-lg font-light">Saint Louis, MO</p>
          <p className="text-lg font-light">63141 USA</p>
          <p className="text-lg font-light">+1 314 212 7000 phone</p>
          <p className="text-lg font-light">+1 314 212 7500 fax</p>
          <span className="text-teal-600 underline mt-7 text-lg">{"map>"}</span>
        </div>

        <div>
          <h1 className="text-[3.5rem] font-light -mt-8">
            Please provide your details.
          </h1>
          <p className="mt-4 text-lg font-light">
            Asterisk (*) indicates required field.
          </p>

          {/* Form */}
          <div className="w-full h-[80vh]"></div>
        </div>
      </div>

      {/* VENUES */}
      <div className="h-[30vh] mb-12 bg-stone-900"></div>

      {/* Feedback */}
      <div className="h-[100vh]"></div>

      {/* Contacts */}
      <div className="h-[100vh]"></div>
    </div>
  );
};

export default Contact;
