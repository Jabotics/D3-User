import TestimonialCard from "../testimonial-card/card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Testimonials = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
      infinite: true,
    },
  };
  return (
    <div className="-mt-12 py-24 text-center ">
      <div className="container">
        <h2 className="text-xl md:text-3xl font-medium tracking-wide">Our Happy Customers</h2>
        <p className="mt-4 tracking-wide font-normal text-xs md:text-sm">What customers are saying about our safety standards</p>

        <div
          className="hiw-slider mt-10"
          style={{
            background:
              "linear-gradient(to top, transparent, rgba(0, 0, 0, 0.1), transparent, transparent",
          }}
        >
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            arrows={false}
            showDots={true}
            infinite={true}
            autoPlay={false}
            containerClass="carousel-testimonial-container"
            itemClass="carousel-item-padding-40-px py-10"
            dotListClass="carousel-testimonial-dots"
            partialVisible={true}
          >
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
export default Testimonials;
