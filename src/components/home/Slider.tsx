import { useCallback, useEffect, useState } from "react";
import slider1 from "../../../public/images/slider1.webp";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../custom/slider-home/EmblaCarouselArrowButton";
import {
  DotButton,
  useDotButton,
} from "../custom/slider-home/EmblaCarouselDotButton";
import { LazyLoadImage } from "../custom/slider-home/EmblaCarouselLazyLoadImage";
import { Button } from "../ui/button";

import "../../assets/styles/slider.css";
import { useFetchBannersQuery } from "@/store/actions/slices/bannerSlice";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
// import { APIEndPoints } from "@/APIEndpoint";
import { useNavigate } from "react-router-dom";

const options: EmblaOptionsType = {};
const SLIDE_COUNT = 1;
const slides = Array.from(Array(SLIDE_COUNT).keys());

const SliderSection = () => {
  const navigate = useNavigate();

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  useFetchBannersQuery({});
  const { banners } = useAppSelector((state: RootState) => state.banner);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off("slidesInView", updateSlidesInView);
      }
      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateSlidesInView(emblaApi);
    emblaApi.on("slidesInView", updateSlidesInView);
    emblaApi.on("reInit", updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  return (
    <div className="embla-slider">
      <div className="embla-slider__viewport" ref={emblaRef}>
        <div className="embla-slider__container">
          {slides.map((index) => (
            <div className="embla-slider__slide" key={index}>
              <LazyLoadImage
                key={index}
                index={index}
                imgSrc={slider1}
                inView={slidesInView.indexOf(index) > -1}
              />
              <div className="embla-slider_container--content">
                <h4 className="text-xs md:text-[16px] font-medium">
                  PLAY SPORTS
                </h4>
                <h1 className=" text-2xl md:text-4xl font-bold">
                  World's Biggest Sports Community
                </h1>
                <Button
                  variant={"lowTheme"}
                  size={"lowTheme"}
                  className="mt-5 h-7 md:h-10 rounded-full"
                  onClick={() => {
                    navigate(`/play`);
                  }}
                >
                  Book Now
                </Button>
                <p className="text-[8px] md:text-xs mt-2">
                  No credit card required
                </p>
              </div>
            </div>
          ))}
          {banners.map((item, index) => (
            <div className="embla-slider__slide" key={index}>
              <LazyLoadImage
                key={index}
                index={index}
                imgSrc={`${item.image}`}
                inView={slidesInView.indexOf(index) > -1}
              />
              <div className="embla-slider_container--content">
                <h4 className="text-xs md:text-[16px] font-medium">
                  PLAY SPORTS
                </h4>
                <h1 className=" text-2xl md:text-4xl font-bold">
                  World's Biggest Sports Community
                </h1>
                <Button
                  variant={"lowTheme"}
                  size={"lowTheme"}
                  className="mt-5 h-7 md:h-10 rounded-full"
                  onClick={() => {
                    navigate(`${item.type}`);
                  }}
                >
                  {item.type === "academy" ? "Join Now" : "Book Now"}
                </Button>
                <p className="text-[8px] md:text-xs mt-2">
                  No credit card required
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-slider__controls">
        <div className="embla-slider__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla-slider__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla-slider__dot".concat(
                index === selectedIndex ? " embla-slider__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderSection;
