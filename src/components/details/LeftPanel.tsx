import { responsive } from '@/lib/utils';
import leftBanner from '/images/login-bg.webp';
import Carousel from "react-multi-carousel";

const LeftPanel = () => {
    return (
        <div className="w-[19rem] h-80 md:w-[680px] md:h-[523px] border overflow-hidden bg-cover bg-center">
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