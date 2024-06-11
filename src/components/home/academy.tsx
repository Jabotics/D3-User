import video from "../../../public/images/video.mp4";
import { Button } from "../ui/button";
import academyBg from "../../../public/images/academy-bg.webp";
import { useState } from "react";

import { BsPlayCircle } from "react-icons/bs";

export const Academy = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const videoElement = document.getElementById(
      "academyVideo"
    ) as HTMLVideoElement;
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="h-[60vh] overflow-hidden grid grid-cols-2 items-center mt-32 mb-24 relative">
      <div className="h-full flex flex-col gap-4 relative">
        <video
          src={video}
          controls={false}
          muted
          loop
          autoPlay
          id="academyVideo"
          className="object-cover w-full h-full"
          onClick={togglePlay}
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <BsPlayCircle
              onClick={togglePlay}
              size={55}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="h-full flex flex-col gap-4 relative items-center justify-center">
        <div className="z-10 w-[75%] text-green-50">
          <h2 className="text-3xl font-semibold -mt-8">Join Sports Academy </h2>
          <h5 className="mt-3">List Your Academy With Us</h5>
          <p className="mt-5 text-sm w-[75%]">
            Welcome to Ports Academy, where the tide of knowledge meets the
            currents of innovation. Our demo content provides a glimpse into the
            dynamic world of maritime studies, where students navigate through
            courses on port management, logistics, and global trade. Dive into
            our virtual harbor, where simulations and case studies prepare
            future leaders to navigate the complexities of international
            shipping and harbor operations. Join us as we chart a course towards
            excellence in maritime education.
          </p>
          <div className="button-wrapper flex gap-4 mt-7">
            <Button variant={'outline'} className="bg-transparent border-2 rounded-full">Join Our Academy</Button>
            <Button variant={'default'} className="bg-zinc-100 text-zinc-900 rounded-full hover:bg-zinc-300">Read More</Button>
          </div>
        </div>
        <img src={academyBg} alt="" className="absolute top-0 left-0 h-full object-cover" />
      </div>
    </div>
  );
};

export default Academy;
