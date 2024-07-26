import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MdOutlinePayments,
  MdOutlineCardMembership,
  MdOutlinePrivacyTip,
} from "react-icons/md";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { VscDebugBreakpointConditional } from "react-icons/vsc";

import logo from "/images/Logo.svg";
import logoIcon from "/images/Logo-icon.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiHome } from "react-icons/hi2";

export function ToggleOptions({
  mobile,
  setMobile,
}: {
  mobile: boolean;
  setMobile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (path: string) => {
    setMobile(false);
    navigate(path);
    setIsOpen(false);
  };
  // console.log(isOpen)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      {" "}
      <DropdownMenuTrigger>
        <span className="flex items-center">
          {mobile ? (
            <img
              src={logoIcon}
              alt="logo"
              className="h-8 md:h-9 cursor-pointer"
              onClick={() => navigate("/")}
            />
          ) : (
            <img
              src={logo}
              alt="logo"
              className="h-8 md:h-9 cursor-pointer"
              onClick={() => navigate("/")}
            />
          )}
          <RiArrowDropDownLine size={20} className={`${mobile ? 'text-gray-300' : 'text-gray-800'}`} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 rounded-2xl bg-[#ffffffd5]"
      >
        <DropdownMenuLabel
          className="text-sm font-medium sm:font-semibold sm:text-sm cursor-pointer flex items-center justify-between"
          onClick={() => handleOptionClick("/")}
        >
          <span>Home</span>
          <HiHome size={20} />
        </DropdownMenuLabel>
        <span className="flex w-full items-center justify-center">
          <DropdownMenuSeparator className="w-[90%]" />
        </span>
        <DropdownMenuLabel
          className="text-sm font-medium sm:font-semibold sm:text-sm cursor-pointer flex items-center justify-between"
          onClick={() => handleOptionClick("/play")}
        >
          <span>Pay & Play</span>
          <MdOutlinePayments size={20} />
        </DropdownMenuLabel>
        <span className="flex w-full items-center justify-center">
          <DropdownMenuSeparator className="w-[90%]" />
        </span>
        <DropdownMenuLabel
          className="text-sm font-medium sm:font-semibold sm:text-sm cursor-pointer flex items-center justify-between"
          onClick={() => handleOptionClick("/academy")}
        >
          <span>Academy</span>
          <HiMiniAcademicCap size={20} />
        </DropdownMenuLabel>
        <span className="flex w-full items-center justify-center">
          <DropdownMenuSeparator className="w-[90%]" />
        </span>
        <DropdownMenuLabel
          className="text-sm font-medium sm:font-semibold sm:text-sm cursor-pointer flex items-center justify-between"
          onClick={() => handleOptionClick("/membership")}
        >
          <span>Membership</span>
          <MdOutlineCardMembership size={20} />
        </DropdownMenuLabel>
        <span className="flex w-full items-center justify-center">
          <DropdownMenuSeparator className="w-[90%]" />
        </span>
        <DropdownMenuLabel className="text-sm font-medium sm:font-semibold sm:text-sm cursor-pointer flex items-center justify-between">
          <span>Privacy Policy</span>
          <MdOutlinePrivacyTip size={20} />
        </DropdownMenuLabel>
        <span className="flex w-full items-center justify-center">
          <DropdownMenuSeparator className="w-[90%]" />
        </span>
        <DropdownMenuLabel className="text-sm font-medium sm:font-semibold sm:text-sm cursor-pointer flex items-center justify-between">
          <span>Terms Of Use</span>
          <VscDebugBreakpointConditional size={22} />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
