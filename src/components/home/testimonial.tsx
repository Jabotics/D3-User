import { useGetHappyCustomersQuery } from "@/store/actions/slices/happyCustomerSlice";
import TestimonialCard from "../testimonial-card/card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import React from "react";

export const Testimonials = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      partialVisibilityGutter: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 10,
      infinite: true,
    },
  };

  useGetHappyCustomersQuery();
  const { happyCustomers } = useAppSelector(
    (state: RootState) => state.happyCustomers
  );

  return (
    <div className="-mt-12 py-24 text-center relative">
      <img
        src="/images/icons-bg/batter.svg"
        alt=""
        className="absolute hidden sm:block top-8 lg:top-5 left-20 lg:left-40 xl:left-[20rem] 2xl:left-[35rem] h-28 w-28 lg:h-32 lg:w-32 2xl:h-40 2xl:w-40"
      />
      <img
        src="/images/icons-bg/baller.svg"
        alt=""
        className="absolute hidden sm:block top-8 lg:top-5 right-20 lg:right-40 xl:right-[20rem] 2xl:right-[35rem] h-28 w-28 lg:h-32 lg:w-32 2xl:h-40 2xl:w-40"
      />
      <div className="container">
        <h2 className="text-xl md:text-3xl font-medium tracking-wide">
          Our Happy Customers
        </h2>
        <p className="mt-4 tracking-wide font-normal text-xs md:text-sm">
          What customers are saying about our safety standards
        </p>

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
            {/* <> */}
              {/* {!x.isLoading || happyCustomers?.length > 0 ? ( */}
                {/* <div className="flex flex-row gap-2"> */}
                  {happyCustomers.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <TestimonialCard data={item} />
                      </React.Fragment>
                    )
                  })}
                {/* </div> */}
              {/* ) : (
                <>
                  <TestimonialCard />
                  <TestimonialCard />
                  <TestimonialCard />
                  <TestimonialCard />
                  <TestimonialCard />
                </>
              )} */}
            {/* </> */}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
export default Testimonials;
