// COMPONENTS
import SliderSection from "./Slider";
import Category from "./category";
import HowitWorks from "./hiw";
import Slots from "./slot";
import Academy from "./academy";
import Testimonials from "./testimonial";
import Events from "./event";
import Faqs from "./faq";
import Chat from "./chat";
import { useEffect, useState } from "react";
// import D3App from "./d3-app";

export const HomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isChatOpen]);
  return (
    <div className="relative">
      <div className="w-[100vw] h-[65vh] overflow-hidden">
        <SliderSection />
      </div>
      <Category />
      <HowitWorks />
      <Slots />
      <Academy />
      <Testimonials />
      <Events />
      <Faqs />
      {/* <D3App /> */}

      <Chat openChat={isChatOpen} setOpenChat={setIsChatOpen} />
    </div>
  );
};
export default HomePage;
