import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ToggleOptions() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(false)}>
        {" "}
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="mx-1 h-6 lg:h-8 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <GiHamburgerMenu className="h-8 w-[1.2rem] transition-all text-gray-500" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel
            className="text-xs font-light sm:font-normal sm:text-sm cursor-pointer"
            onClick={() => handleOptionClick("/pay_play")}
          >
            Pay & Play
          </DropdownMenuLabel>
          <span className="flex w-full items-center justify-center">
            <DropdownMenuSeparator className="w-[90%]" />
          </span>
          <DropdownMenuLabel className="text-xs font-light sm:font-normal sm:text-sm cursor-pointer">
            Academic
          </DropdownMenuLabel>
          <span className="flex w-full items-center justify-center">
            <DropdownMenuSeparator className="w-[90%]" />
          </span>
          <DropdownMenuLabel className="text-xs font-light sm:font-normal sm:text-sm cursor-pointer">
            Membership
          </DropdownMenuLabel>
          <span className="flex w-full items-center justify-center">
            <DropdownMenuSeparator className="w-[90%]" />
          </span>
          <DropdownMenuLabel className="text-xs font-light sm:font-normal sm:text-sm cursor-pointer">
            Terms Of Use
          </DropdownMenuLabel>
          <span className="flex w-full items-center justify-center">
            <DropdownMenuSeparator className="w-[90%]" />
          </span>
          <DropdownMenuLabel className="text-xs font-light sm:font-normal sm:text-sm cursor-pointer">
            Privacy Policy
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
