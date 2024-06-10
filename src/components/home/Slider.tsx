import slider1 from '../../../public/images/slider1.webp'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '../ui/button';

  export const SliderSection = () => {
    return (
      <Carousel 
        opts={{
          loop: true,
        }}
        className="w-full main-slider"
      >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
              <div className="car-image relative">
              <div className="car-caption absolute bottom-0 left-0 w-full z-10 p-8">
                <span>PLAY SPORTS</span>
                <h1>World’s Biggest Sports Community</h1>
                <Button>Book Now</Button>
                <small>No credit card required</small>
              </div>
              <img src={slider1} alt='login-banner' className='' />
            </div>
          </CarouselItem>

        ))}
      </CarouselContent>
      <CarouselPrevious className='previous' />
      <CarouselNext  className='next'/>
    </Carousel>
    )
  
  };
export default SliderSection;  