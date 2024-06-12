import FilterByCategory from '@/components/pay&play/filter'
import Venues from '@/components/pay&play/venues'


const PayPlay = () => {
  return (
    <div className='flex flex-row gap-8 bg-[#F3F4F5] min-h-screen p-4 sm:p-8'>
      <FilterByCategory/>
      <Venues/>
    </div>
  )
}

export default PayPlay