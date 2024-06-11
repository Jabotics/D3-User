import React, { useCallback, useEffect, useState } from "react";
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
import "../../assets/styles/slider.css";
import { Button } from "../ui/button";

const options: EmblaOptionsType = {};
const SLIDE_COUNT = 5;
const slides = Array.from(Array(SLIDE_COUNT).keys());

const SliderSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

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
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <LazyLoadImage
                key={index}
                index={index}
                imgSrc={slider1}
                inView={slidesInView.indexOf(index) > -1}
              />
              <div className="embla_container--content">
                <h4 className="font-medium">PLAY SPORTS</h4>
                <h1 className="text-4xl font-bold">
                  World's Biggest Sports Community
                </h1>
                <Button variant={"lowTheme"} size={'lowTheme'} className="mt-5 rounded-full">
                  Book Now
                </Button>
                <p className="text-xs mt-2">No credit card required</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderSection;
