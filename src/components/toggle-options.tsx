
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GiHamburgerMenu } from "react-icons/gi";

export function ToggleOptions() {

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="mx-1 h-8 flex items-center justify-center">
            <GiHamburgerMenu className="h-8 w-[1.2rem] transition-all text-gray-500" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
