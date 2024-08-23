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
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
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
      <div className="w-[100vw] h-[50vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
        <SliderSection />
      </div>

      <section className="block px-5 py-3 lg:hidden w-full h-40">
        <div className="w-full h-full bg-black rounded-xl overflow-hidden flex items-center justify-start relative">
          <img
            src="/images/hockey_olympics.webp"
            alt=""
            className="w-full h-full object-cover object-top z-0"
          />
          <div className="absolute pl-5">
            <h1 className="text-white text-2xl font-bold">D3 Blogs</h1>
            <p className="text-xs text-white">
              Read all out blogs and stay updated about various sports events
              across nation.
            </p>

            <Link to={"/blogs"} target="_blank" rel="noreferrer noopener">
              <Button className="mt-5 h-8 px-10 bg-white text-black">
                Blogs
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
