
import { Button } from '@/components/ui/button'
import { setParams, useGetGroundQuery } from '@/store/actions/slices/groundSlice'
import { setSelectedSports } from '@/store/actions/slices/sportSlice'
import { setSelectedVenue } from '@/store/actions/slices/venueSlice'
import { useEffect, useState } from 'react'
import { GrPowerReset } from 'react-icons/gr'
import { RiFilterLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'

const FilterHead = () => {
  const dispatch = useDispatch()
  const [isReset, setIsReset] = useState(false)
  const handleReset = () => {
    setIsReset(true)
    dispatch(setSelectedSports({ sportId: '' }))
    dispatch(setSelectedVenue({ venueId: '' }))
    dispatch(setParams({ key: 'supported_sports', data: [] }));
    dispatch(setParams({ key: 'venue', data: [] }));
  }
  const { refetch } = useGetGroundQuery({});
  useEffect(() => {
    if (isReset) {
      refetch();
      setIsReset(false);
    }
  }, [isReset, refetch]);
  return (
    <div className='flex flex-row items-center gap-2'>
      <RiFilterLine size={24} color='black' />
      <span className='inline-block text-[12px] md:text-[16px] font-bold'>
        Filter by Category
      </span>
      <Button className='ms-auto bg-[#53A53F] hover:bg-[#53A53F] text-[14px] md:text-[16px] w-[100px] border rounded-3xl flex flex-row justify-center items-center gap-2 p-2 text-white' onClick={handleReset}>Reset <GrPowerReset /></Button>
    </div>
  )
}

export default FilterHead