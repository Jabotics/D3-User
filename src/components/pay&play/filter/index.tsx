// import FilterByAmenities from "./FilterByAmenities"
import FilterByPrice from "./FilterByPrice";
// import FilterBySize from "./FilterBySize"
import FilterBySports from "./FilterBySports";
import FilterBySurface from "./FilterBySurface";
import FilterByVenue from "./FilterByVenue";
// import FilterByTime from "./FilterByTime"
import FilterHead from "./FilterHead";

const FilterByCategory = () => {
  return (
    <div className="flex flex-col">
      <FilterHead />
      <div className="flex flex-col gap-6 pb-5 overflow-x-hidden overflow-y-auto h-[60vh] scroll-nobg-l">
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
