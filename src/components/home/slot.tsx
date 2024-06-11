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
    },
  };
  return (
    <div className="mt-20">
      <div className="container">
        <div className="flex items-start justify-between">
          <div className="slot-header flex flex-row align-center justify-start gap-8 mb-12">
            <div className="heading">
              <h2 className="text-2xl font-medium ml-4">Available Slots</h2>
            </div>
            <div className="btn-grup flex gap-2 items-center justify-center">
              <Button
                variant={"default"}
                className="rounded-full h-7 px-4 text-xs bg-amber-600 hover:bg-amber-100 hover:text-zinc-900"
              >
                Popular
              </Button>
              <Button
                variant={"default"}
                className="rounded-full h-7 px-4 text-xs bg-amber-50 text-zinc-900 border border-zinc-400 hover:bg-amber-600 hover:text-amber-50"
              >
                New
              </Button>
            </div>
          </div>
          <div>
            <Button
              variant={"link"}
              className="tracking-tight font-semibold underline decoration-gray-300 hover:decoration-gray-950"
            >
              VIEW ALL
            </Button>
          </div>
        </div>
        <div className="-mt-5">
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            autoPlay={false}
            arrows={false}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
            partialVisible={true}
          >
            <SlotCard />
            <SlotCard />
            <SlotCard />
            <SlotCard />
            <SlotCard />
            <SlotCard />
            <SlotCard />
            <SlotCard />
            <SlotCard />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
export default Slots;
