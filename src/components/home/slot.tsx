import SlotCard from "../slot-card/card";
import { Button } from "../ui/button";
import React, { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useGetGroundQuery } from "@/store/actions/slices/groundSlice";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

const Slots = () => {
  const navigate = useNavigate();
  const carouselRef = useRef<Carousel>(null);

  const [fetchNew, setFetchNew] = useState(false);
  const [fetchPopular, setFetchPopular] = useState(true);

  useGetGroundQuery({
    new: fetchNew ? fetchNew : null,
    is_popular: fetchPopular ? fetchPopular : null,
  }, { refetchOnMountOrArgChange: true });
  const { grounds } = useAppSelector((state: RootState) => state.ground);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next(1);
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.previous(1);
    }
  };

  const responsive = {
    superLargeDesktop: {
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
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <div className="w-screen overflow-hidden mt-20">
      {grounds &&
      grounds.length > 0 &&
      !grounds.some(
        (item) => typeof item === "object" && Object.keys(item).length === 0
      ) ? (
        <div className="container">
          <div className="flex items-start justify-between">
            <div className="slot-header flex flex-row align-center justify-start gap-8 mb-12">
              <div className="heading">
                <h2 className="text-2xl font-medium ml-4">All Grounds</h2>
              </div>
              <div className="btn-grup hidden lg:flex gap-2 items-center justify-center">
                <Button
                  variant={"default"}
                  className={`rounded-full h-7 px-4 text-xs ${
                    !fetchNew
                      ? "bg-amber-600 hover:bg-amber-100 hover:text-zinc-900"
                      : "bg-amber-50 hover:bg-amber-600 text-zinc-900 hover:text-amber-50 border border-zinc-400"
                  }`}
                  style={{
                    boxShadow: 'none',
                    outline: 'none'
                  }}
                  onClick={() => {
                    setFetchNew(!fetchNew);
                    setFetchPopular(!fetchPopular);
                  }}
                >
                  Popular
                </Button>
                <Button
                  variant={"default"}
                  className={`rounded-full h-7 px-4 text-xs ${
                    fetchNew
                      ? "bg-amber-600 hover:bg-amber-100 hover:text-zinc-900"
                      : "bg-amber-50 hover:bg-amber-600 text-zinc-900 hover:text-amber-50 border border-zinc-400"
                  }`}
                  style={{
                    boxShadow: 'none',
                    outline: 'none'
                  }}
                  onClick={() => {
                    setFetchNew(!fetchNew);
                    setFetchPopular(!fetchPopular);
                  }}
                >
                  New
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex items-center">
              <Button
                variant={"link"}
                className="tracking-tight font-semibold underline decoration-gray-300 hover:decoration-gray-950"
                onClick={() => {
                  navigate("/play");
                }}
              >
                VIEW ALL
              </Button>
              <IoIosArrowBack onClick={handlePrev} className="cursor-pointer" />
              <IoIosArrowForward
                onClick={handleNext}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="flex lg:hidden items-center justify-between mb-12 -mt-10 px-4">
            <div className="btn-grup flex lg:hidden gap-2 items-center justify-center">
              <Button
                variant={"default"}
                className="rounded-full h-5 px-4 text-xs bg-amber-600 hover:bg-amber-100 hover:text-zinc-900"
              >
                Popular
              </Button>
              <Button
                variant={"default"}
                className="rounded-full h-5 px-4 text-xs bg-amber-50 text-zinc-900 border border-zinc-400 hover:bg-amber-600 hover:text-amber-50"
              >
                New
              </Button>
            </div>
            <div className="lg:hidden flex items-center">
              <Button
                variant={"link"}
                className="tracking-tight h-5 text-xs font-semibold underline decoration-gray-300 hover:decoration-gray-950"
              >
                VIEW ALL
              </Button>
              <IoIosArrowBack onClick={handlePrev} className="cursor-pointer" />
              <IoIosArrowForward
                onClick={handleNext}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="-mt-5">
            <Carousel
              ref={carouselRef}
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
              {grounds.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <SlotCard data={item} />
                  </React.Fragment>
                );
              })}
            </Carousel>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Slots;
