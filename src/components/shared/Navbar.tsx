import React, { useState } from "react";
import logo from'../../public/images/Logo.svg'
import Logodark from'../../public/images/Logo-dark.svg'
import { Dropdown } from 'primereact/dropdown';

import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

import { Sidebar } from 'primereact/sidebar';
import { Moon,LogIn ,Menu } from 'lucide-react';
import { ThemeToggle } from "../ui-lib/theme-toggler";
import LoginPage from "../../pages/auth/login";



const Navbar = () => {
  const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const items = [
      {
          label: 'Pay & Play',
          url:'/home'
      },
      {
          label: 'Academy',
      },
      {
        label: 'Membership',
    },
  ];

  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleTop, setVisibleTop] = useState(false);
  const [visibleBottom, setVisibleBottom] = useState(false);
  


  return (
    <div className="navbar fixed top-0 left-0 w-full bg-white">
        <div className='container'>
          <div className='grid-container grid grid-cols-12 gap-7 items-center'>

            <div className="col-span-12 lg:col-span-2 gap-4">
              <div className="logo text-center flex items-center justify-center">
                <img src={logo} alt='logo'/>
                {/* {theme=='dark' ?  (<img src={logo} alt='logo' className="light-logo"/>) : (<img src={Logodark} alt='logo' className="dark-logo"/>)} */}
              </div>
            </div>

            <div className="col-span-5 sm:col-span-3 lg:col-span-2 gap-4 custome-break">
              <div className="location">
                <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="Select a City" className="w-full md:w-14rem" />
              </div>
            </div>

            <div className="col-span-4 sm:col-span-8 lg:col-span-7 gap-4 flex flex-row justify-end  items-center custome-break">
              <div className="navigation">
                <Menubar model={items} className=" hidden md:flex"/>
              </div>
              <div className="cta">
                <Button onClick={() =>  window.open('/login','_self')}>
                  <LogIn />
                  Login
                </Button>

                <Button label="Submit" />
              </div>
            </div>

            <div className="col-span-3 sm:col-span-1 flex flex-row  items-center justify-end  gap-4 custome-break">
              <div className="theme-button">
                <Button>
                  <ThemeToggle/>
                </Button>
              </div>
              <div className="togel-menu">
                <Button onClick={() => setVisibleRight(true)}>
                  <Menu />
                </Button>
                <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                    <h2>Right Sidebar</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <Menubar model={items} className=" flex md:hidden" />
                </Sidebar>
              </div>
            </div>
          </div>
        </div>
    </div>
    
  )
}

export default Navbar