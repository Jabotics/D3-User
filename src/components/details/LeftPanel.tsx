import { APIEndPoints } from "@/APIEndpoint";
import { IGround } from "@/interface/data";
import { responsive } from "@/lib/utils";

import Carousel from "react-multi-carousel";

const LeftPanel = ({ groundDetails }: { groundDetails: IGround }) => {
  return (
    <div className="w-[19rem] xs:w-[21rem] sm:w-[36rem] md:w-[44rem] lg:w-[28rem] xl:w-[680px] md:h-[44rem] sm:h-[36rem] lg:h-[28rem] h-80 xl:h-[523px] overflow-hidden bg-cover bg-center">
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={false}
        autoPlay={true}
      >
        {groundDetails?.images !== undefined &&
          groundDetails?.images?.map((image, index) => {
            return (
              <div key={index}>
                <img
                  src={`${APIEndPoints.BackendURL}/${image}`}
                  alt="left panel image"
                />
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};

export default LeftPanel;
