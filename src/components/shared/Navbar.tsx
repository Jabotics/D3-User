import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectOption";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

import { ModeToggle } from "../mode-toggle";
// import logo from "../../../public/images/Logo.svg"
import logo from "/images/Logo.svg";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [cities, setCities] = useState([]);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        "http://192.168.29.16:5050/api/fetch-cities"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      console.log(data);
      setCities(data.data.cities);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(cities);
  useEffect(() => {
    fetchCities();
  }, []);
  return (
    <div className=" fixed top-0 left-0 w-full border-b border-slate-200 border-solid bg-white py-4 z-20">
      <div className="container">
        <div className="grid-container grid grid-cols-12 gap-7 items-center">
          <div className="col-span-12 lg:col-span-2 gap-4">
            <div className="logo text-center flex items-center justify-center">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="col-span-5 sm:col-span-3 lg:col-span-2 gap-4 custome-break">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Select City </SelectLabel> */}
                  {cities.map((city: { id: string; name: string }, index) => {
                    return (
                      <SelectItem value={city.id} key={index}>
                        {city.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-4 sm:col-span-8 lg:col-span-7 gap-4 flex flex-row justify-end  items-center custome-break">
            <div className="navigation">
              <ul className="flex flex-row gap-4">
                <li>
                  <a href="./pay_play">Pay & Play</a>
                </li>
                <li>
                  <a href="#">Academy</a>
                </li>
                <li>
                  <a href="#"> Membership</a>
                </li>
              </ul>
            </div>
            <div className="cta flex align-center gap-4">
              <Button onClick={() => window.open("/login", "_self")}>
                <LogIn />
                Login
              </Button>

              <Button onClick={() => window.open("/", "_self")}>
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
  );
};
