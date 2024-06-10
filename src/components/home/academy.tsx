import video from '../../../public/images/video.mp4'
import { Button } from "../ui/button";
import academyBg from "../../../public/images/academy-bg.webp"

export const Academy = () => {
    return (
      <div className="academy-sec grid grid-cols-2">
        <div className="academy-left-col flex flex-col gap-4">
          <video src={video}  controls={true} autoPlay={true} />
        </div>
        <div className="academy-right-col flex flex-col gap-4 relative justify-center">
          <div className='right-content relative'>
              <h2>Join Sports Academy </h2>
              <h5>List Your Academy With Us</h5>
              <p>Welcome to Ports Academy, where the tide of knowledge meets the currents of innovation. Our demo content provides a glimpse into the dynamic world of maritime studies, where students navigate through courses on port management, logistics, and global trade. Dive into our virtual harbor, where simulations and case studies prepare future leaders to navigate the complexities of international shipping and harbor operations. Join us as we chart a course towards excellence in maritime education.</p>
              <div className="button-wrapper flex gap-4">
                <Button>Join Our Academy</Button>
                <Button>Read More</Button>
              </div>
          </div>
          <img src={academyBg} alt="" className=" absolute top-0 left-0 " />
        </div>
      </div>
    )
  
  };
export default Academy;  