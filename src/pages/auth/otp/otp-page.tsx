import { InputOTP, InputOTPSlot } from "@/components/ui/otp";
import { Button } from "@/components/ui/button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import loginBanner from "/images/login-bg.webp";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { usePostRequestMutation } from "@/store/RequestHandler";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIEndPoints } from "@/APIEndpoint";
import { toast } from "sonner";
import { login, setAuth } from "@/store/actions/slices/authSlice";
import { RootState } from "@/store";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  setRemainingTime,
  setRequestTime,
  setStartTimer,
} from "@/store/actions/slices/otpSlice";

// Schema for form validation
const formSchema = z.object({
  otp: z.string().regex(/^\d{4}$/, {
    message: "Invalid OTP format. The OTP must be exactly 4 digits.",
  }),
});

const OtpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [postRequest] = usePostRequestMutation();

  const [isLoading, setIsLoading] = useState(false);
  const duration = 30;

  const { token, userData } = useAppSelector((state: RootState) => state.auth);
  const { startTimer, remainingTime } = useAppSelector(
    (state: RootState) => state.otp
  );

  const [error, setError] = useState({
    value: false,
    message: "",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const responsive = {
    superLargeDesktop: {
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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (userData) {
        const res: any = await postRequest({
          id: userData?.id || "",
          otp: data.otp,
          url: APIEndPoints.validate_otp,
        }).unwrap();

        const token = res.meta?.response?.headers
          .get("authorization")
          ?.split(" ")[1];

        dispatch(login({ status: true, token }));
        dispatch(setAuth({
          userData: {
            id: res?.Response?.data?.payload?.id,
            mobile: res?.Response?.data?.payload?.mobile,
          }
        }))
        dispatch(setRemainingTime({ time: duration }));

        navigate("/");
        form.reset();

        dispatch(setStartTimer(true));
      }
    } catch (error: any) {
      console.log(error)
      setError({
        value: true,
        message: `${error?.data?.message} - ${error?.data?.error?.attempt || 0} attempt${error?.data?.error?.attempt > 1 ? 's' : ''} left`,
      })
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendOtp() {
    setStartTimer(true);
    dispatch(setRemainingTime({ time: duration }));

    setError({
      message: '',
      value: false,
    })
    try {
      if (userData) {
        const res: any = await postRequest({
          mobile: userData.mobile,
          url: APIEndPoints.customer_login,
        }).unwrap();

        toast(res?.message);
        const currentTime = Date.now();
        dispatch(setRequestTime({ time: currentTime.toString() }));
        dispatch(setStartTimer(true));
      }
    } catch (error: any) {
      toast(error?.data?.message);
      navigate("/login");
    }
  }

  const handleComplete = () => {
    dispatch(setStartTimer(false));
    dispatch(setRequestTime({ time: null }));
    dispatch(setRemainingTime({ time: 0 }));
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {!isLoading && (
        <div className="w-full grid grid-cols-12 gap-4 items-center pt-7">
          <div className="left-panel col-span-6 flex items-start justify-around flex-col h-screen px-24">
            <div className="flex flex-col w-full pt-14">
              <h2>Verify your account</h2>
              <p>Enter 4 digit OTP sent to your mobile number</p>
              <div className="form-section flex flex-col gap-3 mt-8">
                <InputOTP
                  maxLength={4}
                  className="otp flex justify-content-center gap-3"
                  onChange={(e) => {
                    form.setValue("otp", e);
                  }}
                >
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTP>

                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  className="submit-buttn w-full text-white bg-black rounded-3xl p-3 font-medium mt-4"
                  disabled={isLoading} // Disable button while loading
                >
                  Verify & Proceed
                </Button>
                {error.value && <div className="mt-1 w-full">{error.message}</div>}

                <div className="copy-wight-link">
                  <p className="mt-7 flex items-center gap-2">
                    Didn't receive OTP Code?{" "}
                    <Button
                      className="underline-offset-4 font-medium cursor-pointer"
                      onClick={handleResendOtp}
                      disabled={startTimer || isLoading} // Disable button while timer is running or loading
                    >
                      Resend Code
                    </Button>
                  </p>
                </div>
                <div className="flex items-center justify-center w-full h-40">
                  {startTimer && (
                    <CountdownCircleTimer
                      isPlaying
                      duration={duration}
                      initialRemainingTime={remainingTime}
                      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                      colorsTime={[7, 5, 2, 0]}
                      onUpdate={(time) => {
                        dispatch(setRemainingTime({ time }));
                      }}
                      onComplete={handleComplete}
                    >
                      {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                  )}
                </div>
              </div>
            </div>
            <p>
              Copyright © 2023<a href="#"> D3 Sports Arena</a> All Rights
              Reserved.
            </p>
          </div>
          <div className="right-panel col-span-6 pl-0 pr-24">
            <Carousel responsive={responsive}>
              <div className="car-image relative">
                <div className="car-caption absolute bottom-0 left-0 w-full z-10 p-8">
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

export default OtpPage;
