import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  InformationCollect,
  InformationDisclosure,
  InformationUse,
  DataSecurity,
  YourRights,
  PrivacyOfChildren,
  ContactUs,
} from "./components";

const PrivacyNoticePage = () => {
  const informationCollectionRef = useRef<HTMLDivElement | null>(null);
  const informationUseRef = useRef<HTMLDivElement | null>(null);
  const disclosureUseRef = useRef<HTMLDivElement | null>(null);
  const dataSecurityRef = useRef<HTMLDivElement | null>(null);
  const yourRightsRef = useRef<HTMLDivElement | null>(null);
  const childPrivacyRef = useRef<HTMLDivElement | null>(null);
  const contactUsRef = useRef<HTMLDivElement | null>(null);

  const [activeTab, setActiveTab] = useState<string>("Information we Collect");

  const sectionRefs: {
    [key: string]: React.MutableRefObject<HTMLDivElement | null>;
  } = useMemo(
    () => ({
      "Information we Collect": informationCollectionRef,
      "How we Use your Information - In Many App Processes": informationUseRef,
      "Data Sharing and Disclosure": disclosureUseRef,
      "Data Security": dataSecurityRef,
      "Your Rights": yourRightsRef,
      "Children's Privacy": childPrivacyRef,
      "Contact Us": contactUsRef,
    }),
    [
      informationCollectionRef,
      informationUseRef,
      disclosureUseRef,
      dataSecurityRef,
      yourRightsRef,
      childPrivacyRef,
      contactUsRef,
    ]
  );

  const scrollToSection = (
    item:
      | "Information we Collect"
      | "How we Use your Information - In Many App Processes"
      | "Data Sharing and Disclosure"
      | "Data Security"
      | "Your Rights"
      | "Children's Privacy"
      | "Contact Us"
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

      for (const [key, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const { offsetTop, clientHeight } = ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition <= offsetTop + clientHeight
          ) {
            setActiveTab(key);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  return (
    <div className="min-h-[300vh] w-screen px-5 lg:px-20 xl:px-40 mt-8 lg:mt-0">
      <div className="h-4 lg:h-8 flex items-center mt-4 lg:mt-[10px] gap-1 text-[10px] md:text-xs lg:text-sm">
        {["Home", "D3 Privacy Notice"].map((item, index) => (
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

      <h1 className="text-2xl lg:text-4xl mt-10 mb-4">D3 Privacy Notice</h1>
      <div className="w-full lg:w-[65%] h-[1px] bg-gray-300 mb-4 lg:mb-16"></div>

      <div className="w-full h-full flex flex-row gap-5">
        <div className="w-full lg:w-[65%] flex flex-col h-full mr-0 lg:mr-24">
          <div className="w-full h-fit flex flex-col">
            <p className="text-sm lg:text-lg">Updated: July 28, 2024</p>
            <p className="text-xs underline text-[#54a63f] font-bold tracking-widest">{`नोटिस हिंदी में पढ़ें`}</p>
          </div>

          <div className="mt-16 text-xs lg:text-base">
            <p>
              Welcome to the D3 Sports Arena website. Your privacy is very
              important to us. This Privacy Policy Notice explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website{" "}
              <Link
                to={"/"}
                target="_blank"
                rel="norefferer noopener"
                className="text-[#54a63f] underline"
              >
                https://d3.com
              </Link>
              , use our online booking services, and interact with our platform.
              By accessing or using our services, you agree to the collection
              and use of information in accordance with this policy.
            </p>

            <p className="mt-5">
              This policy applies to all users of our website and app, including
              those booking sports grounds, registering for academies,
              purchasing memberships, and attending events
            </p>

            <InformationCollect collection={informationCollectionRef} />
            <InformationUse information={informationUseRef} />
            <InformationDisclosure disclosure={disclosureUseRef} />
            <DataSecurity security={dataSecurityRef} />
            <YourRights rights={yourRightsRef} />
            <PrivacyOfChildren childPrivacy={childPrivacyRef} />
            <ContactUs contact={contactUsRef} />
          </div>
        </div>
        <div className="sticky top-32 hidden flex-1 lg:flex flex-col h-fit border-l-2 border-[#d2ffc7a8] gap-3">
          {[
            "Information we Collect",
            "How we Use your Information - In Many App Processes",
            "Data Sharing and Disclosure",
            "Data Security",
            "Your Rights",
            "Children's Privacy",
            "Contact Us",
          ].map((item, index) => {
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
                    item === "Information we Collect" ||
                    item ===
                      "How we Use your Information - In Many App Processes" ||
                    item === "Data Sharing and Disclosure" ||
                    item === "Data Security" ||
                    item === "Your Rights" ||
                    item === "Children's Privacy" ||
                    item === "Contact Us"
                  ) {
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

export default PrivacyNoticePage;
