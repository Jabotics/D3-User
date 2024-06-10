import { CiHeart, CiShare2 } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";

const RightPanel = () => {
    return (
        <div className="w-96 h-80 md:w-[680px] md:h-[523px] mx-1">
            <div className="flex justify-between">
                <span className="text-lg tracking-widest">Box Cricket, Football</span>
                <div className="flex gap-1">
                    <div className="bg-[#DBE9D9] items-center flex rounded-md p-1">
                        <CiHeart className="text-[#53A53F] cursor-pointer" size={24} />
                    </div>
                    <div className="bg-[#DBE9D9] items-center flex rounded-md p-1">
                        <CiShare2 className="text-[#53A53F] cursor-pointer" size={24} />
                    </div>
                </div>
            </div>
            <h2 className="text-3xl font-bold">The Legends Turf XL</h2>
            <div className="mt-2">
                <span className="font-light text-sm">New Ground 70ft x 110ft</span>
            </div>
            <div className="mt-6">
                <span className="font-light text-sm">The Legends Turf XL is a premium synthetic grass product designed for sports fields and recreational areas. </span>
            </div>
            <div className="mt-6">
                <h2 className="text-lg font-bold">Timing</h2>
                <span className="text-sm font-light">6 AM- 9 AM & 3 PM - 11 PM On Weekday, 6 AM - 11 PM On Weekends</span>
            </div>
            <div className="flex justify-between mt-6 mb-4 mr-1 md:mr-0">
                <span className="text-lg">Location</span>
                <div className="flex items-center gap-1 cursor-pointer">
                    <IoIosSend className="text-[#53A53F]" />
                    <span className="text-xs font-medium">Navigate</span>
                </div>
            </div>
            <span className="text-sm">15, Cambridge Road, Near Sri Sai Mandir, Deena Bandu Nagar, Jeevan Kendra Layout, Ulsoor, Domlur, Bengaluru, Karnataka - 560008</span>
            <div className="mt-14 mr-2 md:mr-0">
                <button className="w-full bg-gray-900 p-3 rounded-3xl text-white">Book Now</button>
            </div>
        </div>
    )
}

export default RightPanel