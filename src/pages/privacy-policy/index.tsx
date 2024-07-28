import { useState, useEffect, useRef, useMemo } from "react";
import PrivacyPolicyComponent from "@/components/privacy";
import { Button } from "@/components/ui/button";

type SectionRefs = {
  [key: string]: React.MutableRefObject<HTMLDivElement | null>;
};

const PrivacyPolicyPage = () => {
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
      "Cybersecurity Hygiene": cyberSecuritiesRef,
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
      | "Cybersecurity Hygiene"
      | "FAQs"
  ) => {
    const nextIndex = Object.entries(sectionRefs).findIndex(i => i[0] === item);
    const currentIndex = Object.entries(sectionRefs).findIndex(i => i[0] === activeTab);

    const element = sectionRefs[item]?.current;
    if (element) {
      window.scrollTo({
        top: nextIndex > currentIndex ? element.offsetTop - 250 : element.offsetTop - 500,
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
            >
              {item}
            </span>
            {item === "Home" ? (
              <span className="text-[#a7d19d] ml-1">/</span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="sticky top-16 bg-white z-10 flex items-center gap-5 whitespace-nowrap pt-10 lg:pt-12 pb-4 mb-4">
        {[
          "Privacy Policies",
          "Privacy Certifications",
          "Fraud Alerts",
          "Report Identity Theft",
          "Cybersecurity Hygiene",
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
                item === "Cybersecurity Hygiene" ||
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

      <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-4xl lg:text-[3rem]">
        Privacy Policy
      </div>

      <div className="flex items-center justify-center w-full h-36 mt-5">
          <div className="w-1/2 h-full bg-[#53A53F] rounded-l-xl hidden md:flex flex-col items-start justify-center pl-5 lg:pl-20">
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
            className={`w-full md:w-1/2 h-full rounded-r-xl overflow-hidden relative`}
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

        <div className="flex items-center justify-center w-full h-24 mt-5 mb-10">
          <div className="w-1/2 h-full bg-[#53A53F] rounded-l-xl hidden md:flex flex-col items-start justify-center pl-5 lg:pl-20">
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
            className={`w-full md:w-1/2 h-full rounded-r-xl overflow-hidden relative`}
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
