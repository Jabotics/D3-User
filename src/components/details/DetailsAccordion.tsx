// Accordion.js
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface items {
    title: string;
    content: string[];
}

interface AccordionProps {
    items: items[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number | null) => {
        setActiveIndex(activeIndex == index ? null : index);
    };

    return (
        <div className="w-[19rem] xs:w-[21rem] sm:w-[36rem] md:w-[44rem] lg:w-[56rem] xl:w-[1435px] flex flex-col gap-6">
            {items.map((item, index) => (
                <div key={index} className="border rounded-xl">
                    <button
                        className="w-full p-3 px-6 flex justify-between items-center text-left transition-all duration-500 ease-in-out"
                        onClick={() => handleToggle(index)}
                    >
                        <span className="text-md font-medium">{item.title}</span>
                        <span className="text-lg text-[#53A53F]">
                            {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                    </button>
                    {activeIndex === index && (
                        <div className={`p-2 px-6 ${activeIndex === index ? 'block' : 'hidden'
                            } transition-all duration-500 ease-in-out flex gap-2`}>
                            {item.content.map((contentName: string) => (
                                <div className='p-2 border rounded-3xl w-32 text-center'>
                                    <span className='font-light'>{contentName}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
