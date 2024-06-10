import { responsive } from '@/lib/utils';
import leftBanner from '/images/login-bg.webp';
import Carousel from "react-multi-carousel";

const LeftPanel = () => {
    return (
        <div className="w-[19rem] xs:w-[21rem] sm:w-[36rem] md:w-[44rem] lg:w-[28rem] xl:w-[680px] md:h-[44rem] sm:h-[36rem] lg:h-[28rem] h-80 xl:h-[523px] overflow-hidden bg-cover bg-center">
            <Carousel
                responsive={responsive}
            >
                <img
                    src={leftBanner}
                    alt='left panel image'
                />
                <img
                    src={leftBanner}
                    alt='left panel image'
                />
            </Carousel>
        </div>
    )
}

export default LeftPanel