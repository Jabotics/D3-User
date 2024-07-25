import FilterByCategory from "@/components/pay&play/filter";
import Venues from "@/components/pay&play/venues";
import { RootState } from "@/store";
import { setSortByText } from "@/store/actions/slices/groundSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { HiOutlineSortDescending } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const locationArr = ["Home", "Play"];
const PayPlay = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [filtersArr, setFiltersArr] = useState<{
    sports: string[] | null;
    sortBy: string[] | null;
    venue: string[] | null;
    groundType: string[] | null;
  }>({
    sports: null,
    sortBy: null,
    venue: null,
    groundType: null,
  });

  const {
    grounds,
    sortByText,
    selectedGroundType,
    selectedVenue,
    selectedSportsStore,
  } = useAppSelector((state: RootState) => state.ground);

  useEffect(() => {
    setFiltersArr((p) => ({
      ...p,
      sortBy: sortByText.length === 0 ? null : sortByText,
    }));
  }, [sortByText]);

  useEffect(() => {
    setFiltersArr((p) => ({
      ...p,
      groundType: selectedGroundType.length === 0 ? null : selectedGroundType,
    }));
  }, [selectedGroundType]);

  useEffect(() => {
    setFiltersArr((p) => ({
      ...p,
      venue: selectedVenue.length === 0 ? null : selectedVenue,
    }));
  }, [selectedVenue]);

  useEffect(() => {
    setFiltersArr((p) => ({
      ...p,
      sports: selectedSportsStore.length === 0 ? null : selectedSportsStore,
    }));
  }, [selectedSportsStore]);

  return (
    <section className="flex flex-col px-5 lg:px-20 2xl:px-36 w-full h-screen lg:h-[85vh] overflow-hidden">
      <span className="h-4 lg:h-8 flex items-center mt-12 lg:mt-8 gap-1 text-[10px] md:text-xs lg:text-sm lg:-ml-8">
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

      <div className="w-full h-full mt-2 sm:mt-8 flex gap-8 items-start lg:-ml-10">
        <div className="hidden lg:block w-80">
          <FilterByCategory />
        </div>

        <div className="flex-1">
          <Venues filterArr={filtersArr} />
        </div>

        <div className="hidden lg:block w-56 xl:w-60 h-full">
          <div className="w-full h-12">
            <div className="w-full flex flex-wrap items-center h-full border-[1px] border-gray-100 p-2 rounded-md">
              <HiOutlineSortDescending
                size={20}
                color="black"
                className="mr-2"
              />
              <span className="inline-block text-xs xl:text-sm font-medium">
                Sort by
              </span>
            </div>
            {grounds && grounds.length > 0 ? (
              <div className="flex flex-wrap w-full gap-2 mt-5">
                {[
                  "Nearest",
                  "Newest Arrivals",
                  "Multisports",
                  // "Price: High to Low",
                  "Customer Reviews",
                ].map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`rounded-2xl border cursor-pointer ${
                        filtersArr.sortBy?.includes(item)
                          ? "bg-gray-700 text-gray-50 border-gray-100"
                          : "border-gray-400"
                      } px-2 text-xs xl:text-sm`}
                      onClick={() => {
                        dispatch(setSortByText(item));
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap w-full gap-2 mt-5">
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={`rounded-2xl border cursor-pointer bg-gray-100 px-2 h-5 w-16 text-sm`}
                    ></div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayPlay;
