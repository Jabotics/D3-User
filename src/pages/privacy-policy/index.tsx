import { useState, useEffect, useRef, useMemo } from "react";
import PrivacyPolicyComponent from "@/components/privacy";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type SectionRefs = {
  [key: string]: React.MutableRefObject<HTMLDivElement | null>;
};

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>("Privacy Policies");

  const policiesRef = useRef<HTMLDivElement | null>(null);
  const certificationsRef = useRef<HTMLDivElement | null>(null);
  const fraudsRef = useRef<HTMLDivElement | null>(null);
  const identityTheftsRef = useRef<HTMLDivElement | null>(null);
  const cyberSecuritiesRef = useRef<HTMLDivElement | null>(null);
  const faqsRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs: SectionRefs = useMemo(
    () => ({
      "Privacy Policies": policiesRef,
      "Privacy Certifications": certificationsRef,
      "Fraud Alerts": fraudsRef,
      "Report Identity Theft": identityTheftsRef,
      "Cybersecurity Guidelines": cyberSecuritiesRef,
      FAQs: faqsRef,
    }),
    [
      policiesRef,
      certificationsRef,
      fraudsRef,
      identityTheftsRef,
      cyberSecuritiesRef,
      faqsRef,
    ]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      // let currentTab = "Privacy Policies";

      for (const [key, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const { offsetTop, clientHeight } = ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition <= offsetTop + clientHeight
          ) {
            // currentTab = key;
            setActiveTab(key);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  const scrollToSection = (
    item:
      | "Privacy Policies"
      | "Privacy Certifications"
      | "Fraud Alerts"
      | "Report Identity Theft"
      | "Cybersecurity Guidelines"
      | "FAQs"
  ) => {
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
            ? element.offsetTop - 250
            : element.offsetTop - 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen w-screen px-5 lg:px-20 xl:px-40 mt-8 lg:mt-0">
      <div className="h-4 lg:h-8 flex items-center mt-4 lg:mt-[10px] gap-1 text-[10px] md:text-xs lg:text-sm">
        {["Home", "Privacy Policy"].map((item, index) => (
          <div key={index}>
            <span
              className={`${
                item === "Home"
                  ? "text-[#54a63f] cursor-pointer hover:underline font-semibold"
                  : "text-[#a7d19d] font-medium"
              }`}
              onClick={() => {
                if (item === "Home") {
                  navigate('/')
                }
              }}
            >
              {item}
            </span>
            {item === "Home" ? (
              <span className="text-[#a7d19d] ml-1">/</span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="sticky top-16 bg-white z-20 flex items-center gap-5 whitespace-nowrap pt-10 lg:pt-12 pb-4 mb-4">
        {[
          "Privacy Policies",
          "Privacy Certifications",
          "Fraud Alerts",
          "Report Identity Theft",
          "Cybersecurity Guidelines",
          "FAQs",
        ].map((item, index) => (
          <p
            key={index}
            className={`text-lg cursor-pointer relative ${
              activeTab === item
                ? "font-semibold text-[#54a63f]"
                : "text-[#a7d19d]"
            }`}
            onClick={() => {
              if (
                item === "Privacy Policies" ||
                item === "Privacy Certifications" ||
                item === "Fraud Alerts" ||
                item === "Report Identity Theft" ||
                item === "Cybersecurity Guidelines" ||
                item === "FAQs"
              )
                scrollToSection(item);
            }}
          >
            {item}
            {activeTab === item && (
              <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-[#54a63f]"></span>
            )}
          </p>
        ))}
      </div>

      <div className="flex items-center justify-center w-full h-24 mt-5">
        <div className="w-1/2 h-full bg-[#53A53F] rounded-l-md hidden md:flex flex-col items-start justify-center pl-5 lg:pl-20">
          <div className="text-lg font-semibold text-gray-50">
            Host Your Events
          </div>
          <div className="w-[340px] text-xs text-gray-50">
            Engage with the Largest Sports Community and Network
          </div>
          <Button variant={"default"} className="rounded-md mt-2 h-6">
            Get In Touch
          </Button>
        </div>
        <div
          className={`w-full md:w-1/2 h-full rounded-r-md overflow-hidden relative`}
        >
          <img
            src="/images/academy.jpeg"
            alt="academy"
            className="w-full h-full object-cover object-top "
          />

          <div className="absolute top-4 left-4 md:hidden text-xl font-semibold text-gray-200 bg-gray-500/25">
            Host Your Events
          </div>
          <div className="absolute top-12 left-4 md:hidden max-w-[340px] text-xs text-gray-100 bg-gray-500/25">
            Engage with the Largest Sports Community and Network
          </div>
          <Button
            variant={"default"}
            className="absolute bottom-4 left-4 md:hidden rounded-md mt-3 h-5 text-xs"
          >
            Get In Touch
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-48 mt-5 mb-5">
        <div className={`w-full h-full rounded-xl overflow-hidden relative`}>
          <img
            src="/images/browse-grounds.jpg"
            alt="academy"
            className="w-full h-full object-cover object-center "
          />

          <div className="absolute top-4 left-4 ml-16">
            <Button
              variant={"default"}
              className="rounded-md mt-3 h-10 text-base bg-gray-100 text-gray-900 hover:bg-gray-300 hover:text-gray-500"
              onClick={() => {
                navigate("/play");
              }}
            >
              Browse All Grounds
            </Button>

            <p className="text-lg tracking-wide font-semibold text-gray-200">{`Pay & Play / Academies / Memberships`}</p>
          </div>
        </div>
      </div>

      <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-4xl lg:text-[3rem] relative rounded-md overflow-hidden">
        <span className="z-10 text-gray-800 font-medium">Privacy Policy</span>
        {/* <img
          src={"/images/academy-bg.webp"}
          alt=""
          className="absolute top-0 left-0 h-full object-cover w-full opacity-95 -z-0"
        /> */}
      </div>

      <section>
        <PrivacyPolicyComponent
          policies={policiesRef}
          certifications={certificationsRef}
          frauds={fraudsRef}
          identityThefts={identityTheftsRef}
          cyberSecurities={cyberSecuritiesRef}
          faqs={faqsRef}
        />
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
