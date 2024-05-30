
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectOption"
import { Button } from "@/components/ui/button";
import { LogIn } from 'lucide-react';

import { ModeToggle } from "../mode-toggle";
// import logo from "../../../public/images/Logo.svg"
import logo from '/images/Logo.svg'

export const Navbar = () => {
  return (
    <div className=" fixed top-0 left-0 w-full border-b border-slate-200 border-solid bg-white">
      <div className='container'>
        <div className='grid-container grid grid-cols-12 gap-7 items-center'>
          <div className="col-span-12 lg:col-span-2 gap-4">
            <div className="logo text-center flex items-center justify-center">
              <img src={logo} alt='logo' />
            </div>
          </div>
          <div className="col-span-5 sm:col-span-3 lg:col-span-2 gap-4 custome-break">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Location 1 </SelectLabel>
                  <SelectItem value="apple">Location 2</SelectItem>
                  <SelectItem value="banana">Location 3</SelectItem>
                  <SelectItem value="blueberry">Location 4</SelectItem>
                  <SelectItem value="grapes">Location 5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-4 sm:col-span-8 lg:col-span-7 gap-4 flex flex-row justify-end  items-center custome-break">
            <div className="navigation">
              menu
            </div>
            <div className="cta">
              <Button onClick={() => window.open('/login', '_self')}>
                <LogIn />
                Login
              </Button>

              <Button onClick={() => window.open('/', '_self')}>
                Book Now
              </Button>
            </div>
          </div>
          <div className="col-span-3 sm:col-span-1 flex flex-row  items-center justify-end  gap-4 custome-break">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  )

};
