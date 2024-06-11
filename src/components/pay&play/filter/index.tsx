import FilterByAmenities from "./FilterByAmenities"
import FilterByPrice from "./FilterByPrice"
import FilterBySize from "./FilterBySize"
import FilterBySports from "./FilterBySports"
import FilterBySurface from "./FilterBySurface"
import FilterByTime from "./FilterByTime"
import FilterHead from "./FilterHead"

const FilterByCategory =()=>{
 return (
    <div className="hidden sm:flex sm:w-[30%] md:w-[30%] lg:w-[20%] flex-col gap-4  ">
         <FilterHead/>
         <FilterBySports/>
         <FilterBySurface/>
         <FilterByTime/>
         <FilterByPrice/>
         <FilterBySize/>
         <FilterByAmenities/>
    </div>
 )
}

export default FilterByCategory