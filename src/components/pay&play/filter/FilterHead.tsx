
import { GrPowerReset } from 'react-icons/gr'
import { RiFilterLine } from 'react-icons/ri'

const FilterHead = () => {
  return (
    <div className='flex flex-row items-center gap-2'>
        <RiFilterLine size={24} color='black'/>
        <span className='inline-block text-[12px] md:text-[16px] font-bold'>
            Filter by Category
        </span>
        <button className='ms-auto bg-[#53A53F] text-[14px] md:text-[16px] w-[100px] border rounded-3xl flex flex-row justify-center items-center gap-2 p-2 text-white'>Reset <GrPowerReset /></button>
    </div>
  )
}

export default FilterHead