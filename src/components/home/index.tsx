
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
// import D3App from "./d3-app";

export const HomePage = () => {
  return (
    <div className="relative">
      <div className="w-[100vw] h-[65vh] overflow-hidden"><SliderSection /></div>
      <Category />
      <HowitWorks />
      <Slots />
      <Academy />
      <Testimonials />
      <Events />
      <Faqs />
      {/* <D3App /> */}

      <Chat />
    </div>
  );
};
export default HomePage;
