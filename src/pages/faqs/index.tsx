
import { useEffect, useMemo, useRef, useState } from "react";
import FaqPlayComponent from "./components/faq_play";
import FaqAcademyComponent from "./components/faq_academy";
import FaqMembershipComponent from "./components/faq_membership";
import FaqOthersComponent from "./components/faq_others";
// import { Link } from "react-router-dom";

const FAQsPage = () => {
  const playRef = useRef<HTMLDivElement | null>(null);
  const academyRef = useRef<HTMLDivElement | null>(null);
  const membershipRef = useRef<HTMLDivElement | null>(null);
  const othersRef = useRef<HTMLDivElement | null>(null);

  const [activeTab, setActiveTab] = useState<string>("Booking");

  const sectionRefs: {
    [key: string]: React.MutableRefObject<HTMLDivElement | null>;
  } = useMemo(
    () => ({
      Booking: playRef,
      Academy: academyRef,
      Membership: membershipRef,
      Others: othersRef,
    }),
    [playRef, academyRef, membershipRef, othersRef]
  );

  const scrollToSection = (
    item: "Booking" | "Academy" | "Membership" | "Others"
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="px-40">
      <h1 className="text-4xl mt-10 mb-16">Frequently Asked Questions</h1>
      {/* <div className="w-full h-px bg-gray-300 mb-10"></div> */}

      <div className="w-full min-h-screen h-full flex flex-row gap-5">
        <div className="w-full lg:w-[65%] flex flex-col h-full mr-0 lg:mr-24">
          <div className="mt-0 text-xs lg:text-base">
            <FaqPlayComponent play={playRef} />
            <FaqAcademyComponent academy={academyRef} />
            <FaqMembershipComponent membership={membershipRef} />
            <FaqOthersComponent others={othersRef} />
          </div>
        </div>
        <div className="sticky top-44 hidden flex-1 lg:flex flex-col h-fit border-l-2 border-[#d2ffc7a8] gap-3 mt-20">
          {["Booking", "Academy", "Membership", "Others"].map((item, index) => {
            return (
              <div
                key={index}
                className={`pl-5 text-lg ${
                  activeTab === item
                    ? "text-[#54a63f] font-semibold tracking-wide border-l-2 border-[#54a63f]"
                    : "text-[#85d870] cursor-pointer"
                }`}
                onClick={() => {
                  if (
                    item === "Booking" ||
                    item === "Academy" ||
                    item === "Membership" ||
                    item === "Others"
                  ) {
                    setActiveTab(item);
                    scrollToSection(item);
                  }
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
