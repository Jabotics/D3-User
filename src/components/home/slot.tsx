import SlotCard from "../slot-card/card";
import { Button } from "../ui/button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Slots = () => {
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
      partialVisibilityGutter: 50,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    }
  };
    return (
      <div className="avilable-slot">
        <div className="container">
            <div className="slot-header flex flex-row align-center justify-start gap-8 mb-12">
                <div className="heading">
                    <h2>Available Slots</h2>
                </div>
                <div className="btn-grup flex gap-4">
                    <Button>Popular</Button>
                    <Button>New</Button>
                </div>
            </div>
            <div className="slot-slider">
                <Carousel 
                  responsive={responsive}
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  infinite={true}
                  autoPlay={false}
                  containerClass="carousel-container"
                  itemClass="carousel-item-padding-40-px"
                  partialVisible={true}
                >
                  <SlotCard/>
                  <SlotCard/>
                  <SlotCard/>
                  <SlotCard/>
                  <SlotCard/>
                  <SlotCard/>
                  <SlotCard/>
                  <SlotCard/>
                  <SlotCard/>
                </Carousel>
              </div>
        </div>
      </div>
    )
  
  };
export default Slots;  