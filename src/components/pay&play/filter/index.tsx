// import FilterByAmenities from "./FilterByAmenities"
import FilterByPrice from "./FilterByPrice"
// import FilterBySize from "./FilterBySize"
import FilterBySports from "./FilterBySports"
import FilterBySurface from "./FilterBySurface"
import FilterByVenue from "./FilterByVenue"
// import FilterByTime from "./FilterByTime"
import FilterHead from "./FilterHead"

const FilterByCategory = () => {
   return (
      <div className="hidden sm:flex sm:w-[40%] md:w-[40%] lg:w-[20%] flex-col gap-4  ">
         <FilterHead />
         <FilterBySports />
         <FilterByVenue />
         <FilterBySurface />
         {/* <FilterByTime/> */}
         <FilterByPrice />
         {/* <FilterBySize/> */}
         {/* <FilterByAmenities/> */}
      </div>
   )
}

export default FilterByCategory