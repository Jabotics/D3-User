import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import icon from "../../../public/images/category-icon1.svg";
import iconBg from "../../../public/images/icon-bg.svg";
import { useEffect, useState } from "react";

// const categorydata = [
//   {
//     title: "Cricket",
//     icon: "/images/category-icon1.svg",
//   },
//   {
//     title: "Football",
//     icon: "/images/footbal.svg",
//     popular: "Popular",
//   },
//   {
//     title: "Badminton",
//     icon: "/images/batminton.svg",
//   },
//   {
//     title: "Swimming",
//     icon: "/images/swmming.svg",
//     new: "New",
//   },
//   {
//     title: "Tennis",
//     icon: "/images/tennis.svg",
//   },
//   {
//     title: "Badminton",
//     icon: "/images/batminton.svg",
//   },
// ];

export const Category = () => {
  const [sports, setSports] = useState([]);
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

  const fetchSports = async () => {
    try {
      const response = await fetch(
        "http://192.168.29.16:5050/api/fetch-sports"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      console.log(data);
      setSports(data.data.sports);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(sports);
  useEffect(() => {
    fetchSports();
  }, []);
  return (
    <div className="category-section py-14">
      <div className="container">
        <div className=" mb-12 text-center">
          <h2>Book A Sports Venue Near You</h2>
          <p>
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
          >
            {sports.map(
              (
                sport: {
                  id: string;
                  name: string;
                  icon: string;
                  is_active: boolean;
                },
                index
              ) => (
                <div className="category-box" key={index}>
                  <div className="category-icon relative">
                    <img
                      src={sport.icon}
                      className=" absolute top-0 left-0 w-full h-full iconbg"
                      alt="icon-bg"
                    />
                  </div>
                  <h5>{sport.name}</h5>
                </div>
              )
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
export default Category;
