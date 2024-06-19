
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

export const HomePage = () => {
  return (
    <div className="relative">
      <div className="w-full h-[65vh] overflow-hidden"><SliderSection /></div>
      <Category />
      <img src="/images/icons-bg/basketthrow.svg" alt="" className="absolute z-10 top-[105vh] left-12 h-52 w-52" />
      <HowitWorks />
      <img src="/images/icons-bg/basketnet.svg" alt="" className="absolute z-10 top-[155vh] right-52 h-24 w-24" />
      <Slots />
      {/* <img src="/images/icons-bg/sub.gif" alt="" className="absolute z-10 top-[215vh] left-20 h-56 w-72" />
      <img src="/images/icons-bg/click.gif" alt="" className="absolute z-10 top-[230vh] left-10 h-20 w-20" /> */}
      <Academy />
      <Testimonials />
      <img src="/images/icons-bg/batter.svg" alt="" className="absolute top-[300.7vh] left-[25.58%] h-40 w-40" />
      <img src="/images/icons-bg/baller.svg" alt="" className="absolute top-[300.7vh] right-[25.58%] h-40 w-40" />
      <Events />
      {/* <img src="/images/icons-bg/track.svg" alt="" className="absolute top-[370.7vh] left-[34.58%] h-72 w-72" /> */}
      <Faqs />

      {/* <img src="/images/icons-bg/runner.svg" alt="" className="absolute z-10 -bottom-5 right-40 h-40 w-40" /> */}
      <Chat />
    </div>
  );
};
export default HomePage;
