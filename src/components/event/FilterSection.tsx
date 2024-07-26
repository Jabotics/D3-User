import FilterByPrice from "../pay&play/filter/FilterByPrice"
import FilterByDate from "./FilterByDate"


const FilterSection = () => {
    return (
        <div className="w-[20%] bg-[#f3f4f6] flex flex-col gap-2 p-2">
            <div className="w-[100%]">
                <span className="inline-block text-[20px] font-bold">Filter</span>
            </div>
            <FilterByDate />
            <FilterByPrice />
        </div>
    )
}

export default FilterSection