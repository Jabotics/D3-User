import { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Story from "./components/story";
import VissionMission from "./components/vission-mission";
import GlobalExpansion from "./components/global-expansion";
import JoinUs from "./components/join-us";
import Facilities from "./components/facilities";
import Services from "./components/services";
import Commitment from "./components/commitment";
import { Button } from "@/components/ui/button";

const Index = () => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (!isScrollable) {
        event.preventDefault();
        controls1.start({
          y: -70,
          transition: {
            duration: 1,
            ease: "easeOut",
          },
        });
        controls2.start({
          y: 0,
          opacity: 1,
          transition: {
            duration: 1,
            ease: "easeOut",
            delay: 0.5,
          },
        });
        setIsScrollable(true);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [controls1, controls2, isScrollable]);

  return (
    <div className="h-fit min-w-screen overflow-hidden">
      <div
        className="h-[65vh] w-full flex items-center justify-start relative"
        style={{
          backgroundImage: "url('/images/contact.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-full w-full bg-gradient-to-b from-teal-900 to-gray-900 opacity-65" />
        <AnimatePresence>
          <motion.div
            initial={{ y: 0 }}
            animate={controls1}
            className="absolute text-gray-50 pl-40 text-[3rem]"
          >
            About Us
          </motion.div>
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={controls2}
            className="absolute px-40 text-gray-300 w-[65%] bottom-40"
          >
            Welcome to D3 Sports Arena, a place where passion and purpose
            converge and dreams come true. At D3, we're more than just a sports
            facility; we're a center of the community that encourages, supports,
            and commemorates athletic achievement. Our tale is based on
            friendship, foresight, and a steadfast dedication to provide sports
            fans of all ages and abilities a great venue.
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-full h-fit px-40">
        <Story />
        <VissionMission />
        <GlobalExpansion />
        <Facilities />
        <Services />
        <Commitment />
        <JoinUs />

        <div className="flex items-center justify-center w-full h-24">
          <div className="w-1/2 h-full bg-[#53A53F] rounded-l-xl hidden md:flex flex-col items-start justify-center pl-5 lg:pl-20">
            <div className="text-lg font-semibold text-gray-50">
              Host Your Events
            </div>
            <div className="w-[340px] text-xs text-gray-50">
              Engage with the Largest Sports Community and Network
            </div>
            <Button variant={"default"} className="rounded-md mt-2 h-6">
              Get In Touch
            </Button>
          </div>
          <div
            className={`w-full md:w-1/2 h-full rounded-r-xl overflow-hidden relative`}
          >
            <img
              src="/images/academy.jpeg"
              alt="academy"
              className="w-full h-full object-cover object-top "
            />

            <div className="absolute top-4 left-4 md:hidden text-xl font-semibold text-gray-200 bg-gray-500/25">
              Host Your Events
            </div>
            <div className="absolute top-12 left-4 md:hidden max-w-[340px] text-xs text-gray-100 bg-gray-500/25">
              Engage with the Largest Sports Community and Network
            </div>
            <Button
              variant={"default"}
              className="absolute bottom-4 left-4 md:hidden rounded-md mt-3 h-5 text-xs"
            >
              Get In Touch
            </Button>
          </div>
        </div>

        <div className="h-20 mb-4 flex items-center justify-center">
          <div className="flex items-center justify-around w-full">
            <div>Pay & Play</div>
            <div>Academy</div>
            <div>Membership</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
