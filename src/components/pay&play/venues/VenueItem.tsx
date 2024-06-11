
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosHeartEmpty } from 'react-icons/io'
import venueImg from '../../../assets/venueImg.jpg'
import { useNavigate } from "react-router-dom"
const VenueItem = () => {
  const navigate = useNavigate()
  const handleBooking=()=>{
        navigate('/booking')
  }
  return (
    <div className='flex flex-row w-full border rounded-md gap-8 bg-[#FFFFFF] max-h-[240px]'>
         <div className='w-[40%] sm:w-[25%] '>
            <img src={venueImg} alt='venueImg' className='h-[240px]   w-full rounded-md'/>
         </div>
         <div className='w-[60%] sm:w-[75%]  flex flex-row gap-4 border-r-2 border-[#E0E2E4] py-2 pe-2'>
         
          <div className='flex flex-col w-full gap-2'>
            <span className='inline-block text-[14px] sm:text-[16px] md:text-[20px] font-bold'>The Legends Turf XL</span>
            <span className='inline-block text-[12px] sm:text-[14px] md:text-[16px] font-semibold text-[#676767]'>Box Cricket, Football</span>
            <div className='flex flex-row items-center gap-2 self-start'>
            <FaLocationDot size={24} color='#D0D0D0'/>
            <p className='p-0 m-0 text-[12px] sm:text-[14px] md:text-[16px]  text-[#676767]'>256, Picnic Garden Rd,Nator Park,Near Bondel Gate Flyover,Siliguri-700039</p>
            </div>
            <button className='bg-[#252525] text-[12px] sm:text-[14px] md:text-[16px] text-white py-[6px] md:py-[8px] px:[6px] md:px-[12px] w-[80px] sm:w-[120px] border rounded-3xl mt:[0px] sm:mt-[20px]' onClick={handleBooking}>Book Now</button>
          </div>
          <div className='h-[28px] w-[28px] p-1  bg-[#54a63fb3] rounded-lg flex items-center justify-center'>
             <IoIosHeartEmpty className='font-bold ' size={22} color='white'/>
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