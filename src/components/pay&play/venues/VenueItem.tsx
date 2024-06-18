import { MouseEvent } from 'react';
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosHeartEmpty } from 'react-icons/io'
import { useNavigate } from "react-router-dom"
import { IGround } from '@/interface/data'
import venueImg from '../../../assets/venueImg.jpg'

const VenueItem = ({ item }: { item: IGround }) => {
  const navigate = useNavigate()
  const handleBooking = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate('/booking');
  };

  const openDetailsPage = (id: string) => {
    navigate(`/details/?id=${id}`)
  }

  return (
    <div className='flex flex-col sm:flex-row w-full border rounded-md gap-2 sm:gap-4 bg-[#FFFFFF] max-h-[480px] cursor-pointer' onClick={() => openDetailsPage(item?.id)}>
      <div className='w-[100%] sm:w-[40%] '>
        <img src={item?.images.length > 0 ? `http://192.168.29.16:5050/${item?.images[0]}` : `${venueImg}`} alt='venueImg' className='h-[160px] sm:h-[240px]   w-full rounded-md' />
      </div>
      <div className='w-[100%] sm:w-[60%]  flex flex-row gap-4 border-r-2 border-[#E0E2E4] py-2 sm:py-2 px-4 sm:px-2'>
        <div className='flex flex-col gap-2 w-[100%] sm:w-[70%] md:w-[80%] lg:w-[90%]'>
          <span className='inline-block text-[14px] sm:text-[16px] md:text-[20px] font-bold'>{item?.name}</span>
          <span className='inline-block text-[12px] sm:text-[14px] md:text-[16px] font-semibold text-[#676767]'>{item?.supported_sports[0]?.name},{item?.supported_sports[1]?.name}</span>
          <div className='flex flex-row items-center gap-2 self-start'>
            <FaLocationDot size={24} color='#D0D0D0' />
            <p className='p-0 m-0 text-[12px] sm:text-[14px] md:text-[16px]  text-[#676767]'>{item?.venue?.name}, {item?.venue?.address}</p>
          </div>
          <button className='bg-[#252525] text-[12px] sm:text-[14px] md:text-[16px] text-white py-[6px] md:py-[8px] px:[6px] md:px-[12px] w-[80px] sm:w-[120px] border rounded-3xl mt:[0px] sm:mt-[20px]' onClick={(e: MouseEvent<HTMLButtonElement>) => handleBooking(e)}>Book Now</button>
        </div>
        <div className='h-[22px] w-[22px] p-1  bg-[#54a63fb3] rounded-lg flex items-center justify-center'>
          <IoIosHeartEmpty className='font-bold ' size={20} color='white' />
        </div>
      </div>
      {/* <div className='w-[35%] sm:w-[33%]  flex flex-col justify-center items-center gap-2'>
           <div className='flex flex-row gap-1'>
           <IoIosStar size={24} color='#FBBC05'/>
           <IoIosStar size={24} color='#FBBC05'/>
           <IoIosStar size={24} color='#FBBC05'/>
           <IoIosStar size={24} color='#FBBC05'/>
           <IoIosStarHalf size={24} color='#FBBC05' />
           <span className='inline-block font-bold ms-2 text-[#252525]'>4.5</span>
           </div>
          <span className='inline-block font-bold underline text-[#252525]'>12 Review</span>
          <button className='bg-[#252525] text-white py-[12px] px-[20px] border rounded-3xl'>Book Now</button>
         </div> */}
    </div>
  )
}

export default VenueItem