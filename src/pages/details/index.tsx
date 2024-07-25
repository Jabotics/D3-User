import "react-multi-carousel/lib/styles.css";
import LeftPanel from "@/components/details/LeftPanel";
import RightPanel from "@/components/details/RightPanel";
import Accordion from "@/components/details/DetailsAccordion";
import RelatedGrounds from "@/components/details/RelatedGrounds";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { IGround } from "@/interface/data";
import { useGetGroundQuery } from "@/store/actions/slices/groundSlice";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

const items = [
  {
    title: "Sports Available",
    content: ["Cricket", "Football"],
  },
];

const Details = () => {
  const navigate = useNavigate();

  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const selectedCity = useAppSelector(
    (state: RootState) => state.city.selectedCity
  );
  const getGround = useGetGroundQuery({ id: id, city: selectedCity });
  const { grounds: groundDetails, locationArr } = useAppSelector(
    (state: RootState) => state.ground
  );

  useEffect(() => {
    getGround.refetch();
  }, [id, selectedCity]);
  return (
    <section className="flex flex-col px-5 lg:px-20 2xl:px-36 w-full overflow-hidden">
      <span className="h-4 lg:h-8 flex items-center mt-20 lg:mt-8 gap-1 text-[10px] md:text-xs lg:text-sm lg:-ml-8">
        {locationArr.map((item, index) => (
          <div key={index}>
            <span
              className={`${
                (
                  locationArr.length === 2
                    ? item === "Home"
                    : item === "Home" || item === "Play"
                )
                  ? "text-[#54a63f] cursor-pointer hover:underline font-semibold"
                  : "text-[#a7d19d] font-medium"
              }`}
              onClick={() => {
                if (item === "Home") {
                  navigate("/");
                } else if (item === "Play") {
                  navigate("/play");
                }
              }}
            >
              {item}
            </span>
            {(locationArr.length === 2
              ? item === "Home"
              : item === "Home" || item === "Play") && (
              <span className="text-[#a7d19d] ml-1">{"/"}</span>
            )}
          </div>
        ))}
      </span>

      <div className="flex flex-col mt-20 gap-16">
        <div className="flex justify-center items-center xl:gap-16 lg:gap-6 gap-5 flex-col lg:flex-row md:items-center">
          <div className="">
            <LeftPanel groundDetails={groundDetails[0] as IGround} />
          </div>
          <div>
            <RightPanel groundDetails={groundDetails[0] as IGround} />
          </div>
        </div>
        <div className="flex justify-center flex-col items-center gap-4 mt-44 md:mt-16 lg:mt-2">
          <div>
            <Accordion items={items} />
          </div>
          <div>
            <Accordion items={items} />
          </div>
          <div>
            <Accordion items={items} />
          </div>
          <div>
            <Accordion items={items} />
          </div>
          <div>
            <Accordion items={items} />
          </div>
        </div>
        <hr />
        <div className="mb-10">
          <RelatedGrounds />
        </div>
      </div>
    </section>
  );
};

export default Details;
