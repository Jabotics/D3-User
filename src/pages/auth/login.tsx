import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Phone } from "lucide-react";

// import loginBanner from '../../../public/images/login-bg.webp';
import loginBanner from "/images/login-bg.webp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { usePostRequestMutation } from "@/store/RequestHandler";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { APIEndPoints } from "@/APIEndpoint";
import { setAuth } from "@/store/actions/slices/authSlice";
import { toast } from "sonner";

const formSchema = z.object({
  number: z.string().regex(/^[6-9]\d{9}$/, {
    message:
      "Invalid phone number format. An Indian phone number must start with 6-9 and be 10 digits long.",
  }),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [postRequest] = usePostRequestMutation();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res: any = await postRequest({
        mobile: data.number,
        url: APIEndPoints.customer_login,
      }).unwrap();
      console.log(res)

      dispatch(setAuth({
        userData: {
          id: res?.data?.id
        }
      }))
      navigate('/otp')
      form.reset();
      toast(res?.message);
    } catch (error: any) {
      toast(error?.data?.message);
      return void({})
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit the length to 10
    if (/^\d{0,10}$/.test(value)) {
      form.setValue("number", value);
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {isLoading ? (
        <div>Thora ruk ja</div>
      ) : (
        <div className=" w-full grid grid-cols-12 gap-4 items-center pt-7">
          <div className="left-panel col-span-6 flex items-start  justify-around flex-col h-screen px-24">
            <div className="flex flex-col w-full pt-28">
              <h2>Log in</h2>
              <p>Enter credentials below to login</p>
              <div className="form-section flex flex-col gap-3 mt-8">
                <div className="input-box relative flex flex-row items-center">
                  <div className="_icon absolute left-4">
                    <Phone size={20} />
                  </div>
                  <Input
                    type="text"
                    placeholder="Mobile"
                    className="w-full p-2 rounded-3xl pl-10 border "
                    value={form.watch("number")}
                    onChange={handleInputChange}
                  />
                </div>
                <Button
                  className="submit-buttn w-full text-white bg-black  rounded-3xl p-3 font-medium mt-4"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Sign In
                </Button>
                {/* <div className="copy-wight-link">
              <p className='mt-7'>
                Don’t  Have Any Account?  <a href='/register' className=' underline-offset-4 font-medium'>Sign Up</a>
              </p>
            </div> */}
              </div>
            </div>
            <p>
              Copyright © 2024<a href="#"> D3 Sports Arena</a> All Rights
              Reserved.
            </p>
          </div>
          <div className="right-panel col-span-6 pl-0 pr-24 ">
            <Carousel responsive={responsive}>
              <div className="car-image relative">
                <div className="car-caption absolute bottom-0 left-0 w-full  z-10 p-8">
                  <h1>Your Nearest Sports Community.</h1>
                  <p>
                    Welcome to our D3 Sports Arena registration page! Are you
                    ready to join with sports community.
                  </p>
                </div>
                <img src={loginBanner} alt="login-banner" />
              </div>
              <div className="car-image relative">
                <div className="car-caption absolute bottom-0 left-0 w-full z-10 p-8">
                  <h1>Your Nearest Sports Community.</h1>
                  <p>
                    Welcome to our D3 Sports Arena registration page! Are you
                    ready to join with sports community.
                  </p>
                </div>
                <img src={loginBanner} alt="login-banner" className="" />
              </div>
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
};
