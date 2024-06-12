import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import iconBg from "../../../public/images/icon-bg.svg";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import '../../assets/styles/arrow.css'

const categorydata = [
  {
    title: "Cricket",
    icon: "/images/category-icon1.svg",
  },
  {
    title: "Football",
    icon: "/images/footbal.svg",
    popular: "Popular",
  },
  {
    title: "Badminton",
    icon: "/images/batminton.svg",
  },
  {
    title: "Swimming",
    icon: "/images/swmming.svg",
    new: "New",
  },
  {
    title: "Tennis",
    icon: "/images/tennis.svg",
  },
  {
    title: "Badminton",
    icon: "/images/batminton.svg",
  },
];

interface ArrowProps {
  onClick: () => void;
}

const CustomLeftArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="custom-arrow left-arrow"
      aria-label="Previous slide"
    >
      <IoIosArrowBack />
    </button>
  );
};

const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="custom-arrow right-arrow"
      aria-label="Next slide"
    >
      <IoIosArrowForward />
    </button>
  );
};

export const Category = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="w-screen overflow-hidden py-14">
      <div className="container">
        <div className="mb-12 w-full flex flex-col items-center justify-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-5">
            Book A Sports Venue Near You
          </h2>
          <p className="text-[11px] md:text-xs w-[20rem] sm:w-[30rem] md:w-[35rem] text-center">
            Join the community of 2+ million users - find games, book with a few
            taps, and be a part of the amateur sports revolution!
          </p>
        </div>
        <div className="categori-slider">
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            autoPlay={false}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
            customLeftArrow={<CustomLeftArrow onClick={() => {}} />}
            customRightArrow={<CustomRightArrow onClick={() => {}} />}
          >
            {categorydata.map((category, index) => (
              <div className="category-box" key={index}>
                <div className="category-icon relative">
                  {category.popular && (
                    <span className="text-xs lg:text-[16px] absolute top-0 bg-orange-500 z-10 rounded-3xl px-4">
                      {category.popular}
                    </span>
                  )}
                  {category.new && (
                    <span className="text-xs lg:text-[16px] absolute top-0 bg-lime-500 z-10 rounded-3xl px-4">
                      {category.new}
                    </span>
                  )}
                  {category.icon && (
                    <img
                      src={category.icon}
                      className="relative z-10 cat-icon"
                      alt="icon"
                    />
                  )}
                  <img
                    src={iconBg}
                    className="absolute top-0 left-0 w-full h-full iconbg"
                    alt="icon-bg"
                  />
                </div>
                <h5>{category.title}</h5>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Category;
