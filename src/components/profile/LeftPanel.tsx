import { FaRegHeart } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { LiaExpeditedssl } from "react-icons/lia";
import { IoLogOutOutline } from "react-icons/io5";
import { RiEditCircleFill } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdCardMembership } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineAcademicCap } from "react-icons/hi2";

interface SideMenu {
    title: string;
    icon: IconType;
}

const sideMenu: SideMenu[] = [
    {
        title: 'My Booking',
        icon: AiOutlineFileDone
    },
    {
        title: 'Academy',
        icon: HiOutlineAcademicCap
    },
    {
        title: 'Memberships',
        icon: MdCardMembership
    },
    {
        title: 'Favorite',
        icon: FaRegHeart
    },
    {
        title: 'Terms & Conditions',
        icon: LiaExpeditedssl
    },
    {
        title: 'Logout',
        icon: IoLogOutOutline
    }
]

const LeftPanel = () => {
    return (
        <div className='w-[318px] mt-20 h-[554px]'>
            <div className='flex justify-between'>
                <div className="flex gap-2">
                    <div className="w-9 h-9">
                        <img src="/images/male.png" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">John Doe</span>
                        <span className="text-xs font-light text-[#53A53F]">+91 8596554477</span>
                    </div>
                </div>
                <div className="flex items-center bg-[#53A53F] px-2 rounded text-center gap-1 justify-center text-white text-sm font-light py-1 h-8 cursor-pointer">
                    <span>Edit</span>
                    <RiEditCircleFill />
                </div>
            </div>

            <div className="w-[318px] h-[400px] bg-white mt-4 rounded-md">
                <div className="pt-6">
                    {
                        sideMenu.map((menu, index) => {
                            const IconComponent = menu.icon;
                            return (
                                <div className="px-5 mt-4 pb-4 flex justify-between items-center border-b-2" key={index}>
                                    <div className="flex items-center text-sm gap-2 cursor-pointer">
                                        <IconComponent className="text-[#53A53F] text-xl" />
                                        <span className={`font-light ${menu.title === 'My Booking' && 'text-[#53A53F] font-medium'}`}>{menu.title}</span>
                                    </div>
                                    <IoIosArrowForward className="text-[#53A53F] cursor-pointer" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default LeftPanel