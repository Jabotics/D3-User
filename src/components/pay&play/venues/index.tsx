import { useEffect, useState } from "react";
import Sort from "./Sort";
import VenueItem from "./VenueItem";

const Venues = () => {
  const [groundData, setGroundData] = useState([]);
  const [count, setCount] = useState(0);
  const fetchGrounds = async () => {
    try {
      const response = await fetch("http://192.168.29.16:5050/api/grounds");
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      setGroundData(data.data.grounds);
      setCount(data.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchGrounds();
  }, []);
  return (
    <div className="flex flex-col gap-8 w-[100%] sm:w-[70%] md:w-[70%] lg:w-[80%] xl:w-[60%] px-0 sm:px-8">
      <div className="flex flex-row border-b-2 pb-8 items-center">
        <span className="inline-block me-auto text-[16px] sm:text-[20px]">
          <b className="text-[#53A53F]">Total {count}</b> results found
        </span>
        <Sort />
      </div>
      {groundData.map((item, index) => {
        return <VenueItem key={index} item={item} />;
      })}

      <div className="self-end flex flex-row gap-4">
        <span className="inline-block text-[14px] font-semibold cursor-pointer">
          Page :
        </span>
        <button className="inline-block text-[12px] w-[20px] h-[20px] font-semibold cursor-pointer bg-[#53A53F] text-white rounded-md">
          1
        </button>
        <button className="inline-block text-[12px]  w-[20px] h-[20px] font-semibold cursor-pointer bg-[#53A53F] text-white rounded-md">
          2
        </button>
        <button className="inline-block text-[12px]  w-[20px] h-[20px] font-semibold cursor-pointer bg-[#53A53F] text-white rounded-md">
          3
        </button>
        <button className="inline-block text-[12px]  w-[20px] h-[20px] font-semibold cursor-pointer bg-[#53A53F] text-white rounded-md">
          4
        </button>
      </div>
    </div>
  );
};

export default Venues;
