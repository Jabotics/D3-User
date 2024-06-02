import HowitworksCard from "../hiw-card/card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const hiwdata = [
  {
      count:1,
      title: 'Search Your Sports',
      description:'Are you looking to play after work, organize your Sunday Five match?',
      icon: '/images/hiw-icon1.svg',
  },
  {
    count:2,
    title: 'Reserve Your Slots',
    description:'Click Book Now Button to make online booking & secure payment',
    icon: '/images/reserv-slot.svg',
  },
  {
    count:3,
    title: 'Go & Play',
    description:'You’ve found a stunning turf or court, booked and now time to play.',
    icon: '/images/play.svg',
},
  
];

export const HowitWorks = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
      infinite:true,
    }
  };
    return (
      <div className="how-it-works py-24 text-center bg-lightGreen">
          <div className="container">
              <h2>How it Works</h2>
              <div className="hiw-slider mt-10">
                <Carousel 
                  responsive={responsive}
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  infinite={false}
                  autoPlay={false}
                  containerClass="carousel-container"
                  itemClass="carousel-item-padding-40-px"
                  partialVisible={true}
                >
                  {hiwdata.map((hiwdata, index) => (
                    <HowitworksCard
                     key={index} 
                     count={hiwdata.count} 
                     title={hiwdata.title} 
                     icon={hiwdata.icon} 
                     description={hiwdata.description}
                    />
                  ))} 

                </Carousel>
              </div>
              
          </div>
            
            
      </div>
    )
  
  };
export default HowitWorks;  