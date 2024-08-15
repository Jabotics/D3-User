// Accordion.js
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface AccordionProps {
  items: string[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [active, setActive] = useState<boolean>(false);

  // const handleToggle = (index: number | null) => {
  //   setActiveIndex(activeIndex == index ? null : index);
  // };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* {items.map((item, index) => ( */}
      <div className="border rounded-xl">
        <button
          className="w-full p-3 px-6 flex justify-between items-center text-left transition-all duration-500 ease-in-out"
          onClick={() => setActive(!active)}
        >
          <span className="text-md font-medium">{`Sports Available`}</span>
          <span className="text-lg text-[#53A53F]">
            {active ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </button>
        {active && (
          <div
            className={`p-2 px-6 ${
              active ? "block" : "hidden"
            } transition-all duration-500 ease-in-out flex gap-2`}
          >
            {items.map((contentName: string, index) => (
              <div className="p-2 border rounded-3xl w-32 text-center" key={index}>
                <span className="font-light">{contentName}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* ))} */}
    </div>
  );
};

export default Accordion;
