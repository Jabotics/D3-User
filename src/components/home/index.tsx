
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
      <SliderSection />
      <Category />
      <HowitWorks />
      <Slots />
      <Academy />
      <Testimonials />
      <Events />
      <Faqs />

      <Chat />
    </div>
  );
};
export default HomePage;
