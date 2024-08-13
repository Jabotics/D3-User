import ContactForm from "@/components/contact/contact-form";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type SectionRefs = {
  [key: string]: React.MutableRefObject<HTMLDivElement | null>;
};

const Contact = () => {
  const navigate = useNavigate();

  const overviewRef = useRef<HTMLDivElement | null>(null);
  const allVenuesRef = useRef<HTMLDivElement | null>(null);
  const reviewRef = useRef<HTMLDivElement | null>(null);

  const [hasScrollSticky, setHasScrollSticky] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("Overview");

  const sectionRefs: SectionRefs = useMemo(
    () => ({
      Overview: overviewRef,
      "All Venues": allVenuesRef,
      "Customer Review": reviewRef,
    }),
    [overviewRef, allVenuesRef, reviewRef]
  );

  const scrollToOverview = (
    item: "Overview" | "All Venues" | "Customer Review"
  ) => {
    if (overviewRef.current) {
      const nextIndex = Object.entries(sectionRefs).findIndex(
        (i) => i[0] === item
      );
      const currentIndex = Object.entries(sectionRefs).findIndex(
        (i) => i[0] === activeTab
      );

      const element = sectionRefs[item]?.current;
      if (element) {
        window.scrollTo({
          top:
            nextIndex > currentIndex
              ? element.offsetTop - 100
              : element.offsetTop - 150,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setHasScrollSticky(true);
      } else {
        setHasScrollSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            { title: "Overview" },
            { title: "All Venues" },
            { title: "Customer Review" },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (
                  item.title === "Overview" ||
                  item.title === "All Venues" ||
                  item.title === "Customer Review"
                ) {
                  setActiveTab(item.title);
                  scrollToOverview(item.title);
                }
              }}
              className="cursor-pointer"
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
      {hasScrollSticky && (
        <div className="fixed top-16 bg-gray-800 text-gray-50 text-lg flex items-center gap-10 pt-5 pb-4 px-40 w-full z-20">
          {[
            { title: "Overview" },
            { title: "All Venues" },
            { title: "Customer Review" },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (
                  item.title === "Overview" ||
                  item.title === "All Venues" ||
                  item.title === "Customer Review"
                ) {
                  setActiveTab(item.title);
                  scrollToOverview(item.title);
                }
              }}
              className="cursor-pointer"
            >
              {item.title}
            </div>
          ))}
        </div>
      )}

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

        <div className="flex-1">
          <h1 className="text-[3.5rem] font-light -mt-8">
            Please provide your details.
          </h1>
          <p className="mt-4 text-lg font-light">
            Asterisk (*) indicates required field.
          </p>

          {/* Form */}
          <div className="w-full h-[80vh]">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* VENUES */}
      <div
        className="min-h-[30vh] mb-12 bg-gray-900 px-40 text-white flex items-center justify-center py-10"
        ref={allVenuesRef}
      >
        <Accordion type="multiple">
          <AccordionItem
            value={"hey"}
            className="w-[80vw] border border-gray-800"
          >
            <AccordionTrigger
              state={"open"}
              className={`bg-white text-gray-800 rounded-lg px-5`}
            >
              Howrah
            </AccordionTrigger>
            <AccordionContent className="bg-transparent h-96">
              hey
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value={"hey2"}
            className="w-[80vw] border border-gray-800"
          >
            <AccordionTrigger
              state={"open"}
              className={`bg-white text-gray-800 rounded-lg px-5`}
            >
              Kolkata
            </AccordionTrigger>
            <AccordionContent className="bg-transparent h-96">
              hey
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Feedback */}
      <div className="h-[100vh] px-40 pt-10 mb-36" ref={reviewRef}>
        <h2 className="text-[2.5rem] font-light">Customer Reviews</h2>

        <div
          className="w-1/2 h-[65vh] bg-black my-5 rounded-md overflow-hidden cursor-pointer hover:opacity-50 group transition-all duration-700"
          onClick={() => {
            navigate("/contact/customer-review");
          }}
        >
          <img
            src="/images/feedback.jpg"
            alt="feedback image"
            className="w-full h-full object-cover object-center group-hover:scale-[1.1]"
          />
        </div>

        <h4 className="font-normal text-2xl mb-5">
          Customer Review: Help us improve
        </h4>
        <p className="mb-5">
          Our customers matter to us! Please share your needs or concerns so
          that we will able to improve.
        </p>

        <p
          className="text-[#53a53f] font-medium tracking-wide"
          onClick={() => {
            navigate("/contact/customer-review");
          }}
        >
          (Please share your feedback with us)
        </p>
      </div>
    </div>
  );
};

export default Contact;
