import SliderSection from "./Slider";
import Category from "./category";
import HowitWorks from "./hiw";
import Slots from "./slot";
import Academy from "./academy";
import Testimonials from "./testimonial";
import Events from "./event";
import Faqs from "./faq";
export const HomePage = () => {
    return (
      <div className="homepage">
            <SliderSection/>
            <Category/>
            <HowitWorks/>
            <Slots/>
            <Academy/>
            <Testimonials/>
            <Events/>
            <Faqs/>
      </div>
    )
  
  };
export default HomePage; 