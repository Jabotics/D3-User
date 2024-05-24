import React, { useState, useEffect } from 'react';
import { InputText } from "primereact/inputtext";
import { UserRound, Phone,Mail } from 'lucide-react';
import { Button } from 'primereact/button';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import loginBanner from '../../public/images/login-bg.webp';
const LoginPage = () => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className=' w-full grid grid-cols-12 gap-4 items-center pt-7'>
      <div className="left-panel col-span-6 flex items-start  justify-around flex-col h-screen px-24">
        <div className="flex flex-col w-full pt-28">
          <h2>Log in</h2>
          <p>Enter credentials below to login</p>
          <div className="form-section flex flex-col gap-3 mt-8">
            <div className="input-box relative flex flex-row items-center">
              <div className="_icon absolute left-4">
                < Phone size={20} />
              </div>
              <InputText id="mail" aria-describedby="mail" placeholder='Phone' className='w-full p-2 rounded-3xl pl-10 border '/>
            </div>
            <Button label="Sign In" className='submit-buttn w-full text-white bg-black  rounded-3xl p-3 font-medium mt-4' />
            <div className="copy-wight-link">
              <p className='mt-7'>
                Don’t  Have Any Account?  <a href='/register' className=' underline-offset-4 font-medium'>Sign Up</a>
              </p>
            </div>
          </div>
        </div>
        <p>Copyright © 2023<a href='#'> D3 Sports Arena</a> All Rights Reserved.</p>  
      </div>
      <div className="right-panel col-span-6 pl-0 pr-24 ">
        <Carousel responsive={responsive}>
          <div className="car-image relative">
            <div className="car-caption absolute bottom-0 left-0 w-full  z-10 p-8">
              <h1>Your Nearest Sports Community.</h1>
              <p>Welcome to our D3 Sports Arena registration page! Are you ready to join with sports community.</p>
            </div>
            <img src={loginBanner} alt='login-banner'/>
          </div>
          <div className="car-image relative">
            <div className="car-caption absolute bottom-0 left-0 w-full z-10 p-8">
              <h1>Your Nearest Sports Community.</h1>
              <p>Welcome to our D3 Sports Arena registration page! Are you ready to join with sports community.</p>
            </div>
            <img src={loginBanner} alt='login-banner' className=''/>
          </div>
        </Carousel>
      </div>
    </div>
  )
}

export default LoginPage