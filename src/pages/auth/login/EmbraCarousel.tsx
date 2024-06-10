import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import loginBanner from "/images/login-bg.webp"; 

const options: EmblaOptionsType = {
  loop: false,
  skipSnaps: false,
};

const slides = [
  {
    title: "Your Nearest Sports Community.",
    description:
      "Welcome to our D3 Sports Arena registration page! Are you ready to join with sports community.",
    image: loginBanner,
  },
  {
    title: "Your Nearest Sports Community.",
    description:
      "Welcome to our D3 Sports Arena registration page! Are you ready to join with sports community.",
    image: loginBanner,
  },
];

const EmblaCarousel = () => {
  const [viewportRef, embla] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(embla);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              <img
                src={item.image}
                alt="banner"
                className="object-cover w-full h-full"
              />
              <div className="embla__slide__content">
                <h2 className="text-3xl font-semibold pl-8">{item.title}</h2>
                <p className="mb-16 pl-8 text-xs xl:text-sm w-[85%]">
                  {item.description}
                </p>
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
      </div>
    </section>
  );
};

export default EmblaCarousel;
