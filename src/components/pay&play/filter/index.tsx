// import FilterByAmenities from "./FilterByAmenities"
import { useAppDispatch } from "@/store/hooks";
import FilterByPrice from "./FilterByPrice";
// import FilterBySize from "./FilterBySize"
import FilterBySports from "./FilterBySports";
import FilterBySurface from "./FilterBySurface";
import FilterByVenue from "./FilterByVenue";
// import FilterByTime from "./FilterByTime"
import FilterHead from "./FilterHead";

import {
  resetFilters,
  setParams,
  // useGetGroundQuery,
} from "@/store/actions/slices/groundSlice";
import { setSelectedSports } from "@/store/actions/slices/sportSlice";
import { setSelectedVenue } from "@/store/actions/slices/venueSlice";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GrPowerReset } from "react-icons/gr";

const FilterByCategory = () => {
  const dispatch = useAppDispatch();
  const [isResetMobile, setIsResetMobile] = useState(false);
  const handleReset = () => {
    dispatch(resetFilters());
    setIsResetMobile(true);
    dispatch(setSelectedSports({ sportId: "" }));
    dispatch(setSelectedVenue({ venueId: "" }));
    dispatch(setParams({ key: "supported_sports", data: [] }));
    dispatch(setParams({ key: "venue", data: [] }));
  };
  // const { refetch } = useGetGroundQuery({});
  useEffect(() => {
    if (isResetMobile) {
      // refetch();
      setIsResetMobile(false);
    }
  }, [
    isResetMobile,
    // refetch
  ]);
  return (
    <div className="flex flex-col mt-5 lg:mt-0">
      <Button
        onClick={handleReset}
        className="ms-auto mb-5 lg:hidden bg-black hover:bg-[#333] text-[10px] xl:text-xs w-[100px] border rounded-3xl flex flex-row justify-center h-8 uppercase items-center gap-2 px-1 xl:px-2 text-white"
      >
        Reset <GrPowerReset />
      </Button>
      <FilterHead />
      <div className="flex flex-col gap-6 pb-5 overflow-x-hidden overflow-y-auto h-[65vh] sm:h-[80vh] lg:h-[65vh] scroll-nobg-l">
        <FilterBySports />
        <FilterByVenue />
        <FilterBySurface />
        {/* <FilterByTime/> */}
        <FilterByPrice />
        {/* <FilterBySize/> */}
        {/* <FilterByAmenities/> */}
      </div>
    </div>
  );
};

export default FilterByCategory;
