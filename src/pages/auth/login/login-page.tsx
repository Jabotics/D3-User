import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import "react-multi-carousel/lib/styles.css";
import { Phone } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePostRequestMutation } from "@/store/RequestHandler";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { APIEndPoints } from "@/APIEndpoint";
import { login, setAuth } from "@/store/actions/slices/authSlice";
import { toast } from "sonner";

import logo from "/images/Logo.svg";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import {
  setRemainingTime,
  setRequestTime,
  setStartTimer,
} from "@/store/actions/slices/otpSlice";
import { RootState } from "@/store";
import EmblaCarousel from "./EmbraCarousel";
import { InputOTP, InputOTPSlot } from "@/components/ui/otp";

const formSchema = z.object({
  number: z.string().regex(/^[6-9]\d{9}$/, {
    message:
      "Invalid phone number format. An Indian phone number must start with 6-9 and be 10 digits long.",
  }),
});

const otpFormSchema = z.object({
  otp: z.string().regex(/^\d{4}$/, {
    message: "Invalid OTP format. The OTP must be exactly 4 digits.",
  }),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [postRequest] = usePostRequestMutation();

  const [isLoading, setIsLoading] = useState(false);
  const duration = 30;

  const { userData, hasToken, token } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { startTimer, remainingTime } = useAppSelector(
    (state: RootState) => state.otp
  );

  const [toSendOtp, setToSendOtp] = useState<boolean>(false);
  const [otpError, setOtpError] = useState({
    value: false,
    message: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res: any = await postRequest({
        mobile: data.number,
        url: APIEndPoints.customer_login,
      }).unwrap();
      console.log(res);

      dispatch(
        setAuth({
          userData: {
            id: res?.Response?.data?.id,
            mobile: data.number,
          },
        })
      );
      form.reset();
      console.log(res?.Response?.message);
      toast(res?.Response?.message);

      dispatch(setRemainingTime({ time: 30 }));
      dispatch(setStartTimer(true));

      setToSendOtp(true);
    } catch (error: any) {
      toast(error?.data?.message);
      return void {};
    } finally {
      setIsLoading(false);
    }
  }
  async function onOtpSubmit(data: z.infer<typeof otpFormSchema>) {
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
        dispatch(
          setAuth({
            userData: {
              id: res?.Response?.data?.payload?.id,
              mobile: res?.Response?.data?.payload?.mobile,
            },
          })
        );
        dispatch(setRemainingTime({ time: duration }));

        navigate("/");
        form.reset();

        dispatch(setStartTimer(true));
      }
    } catch (error: any) {
      console.log(error);
      setOtpError({
        value: true,
        message: `${error?.data?.message} - ${
          error?.data?.error?.attempt || 0
        } attempt${error?.data?.error?.attempt > 1 ? "s" : ""} left`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit the length to 10
    if (/^\d{0,10}$/.test(value)) {
      form.setValue("number", value);
    }
  };

  async function handleResendOtp() {
    setStartTimer(true);
    dispatch(setRemainingTime({ time: duration }));

    setOtpError({
      message: "",
      value: false,
    });
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

  const isLarge = window.innerWidth > 1024

  useLayoutEffect(() => {
    if (hasToken || token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden grid grid-cols-12 gap-4 items-center">
        {isLarge && <div className="absolute top-0 right-0 h-full w-[25vw] bg-theme max-lg:hidden" />}
        <div className="left-panel relative col-span-12 lg:col-span-6 flex items-start  justify-around flex-col h-screen px-10 sm:px-40 lg:pl-52 lg:pr-10 xl:pr-40 min-[1500]:pr-60">
          <div className="absolute top-6 left-12">
            <img src={logo} alt="logo" className="max-lg:h-8 h-10" />
          </div>
          <div className="flex flex-col w-full h-4/5 justify-center mt-20">
            <h2 className="text-3xl font-semibold tracking-wide whitespace-nowrap">
              {toSendOtp ? "Verify your account" : "Log in"}
            </h2>
            <p className="mb-6 text-sm">
              {toSendOtp
                ? "Enter 4 digit OTP sent to your mobile number"
                : "Enter credentials below to login"}
            </p>
            <div className="form-section flex flex-col gap-3 mt-8">
              {toSendOtp ? (
                <InputOTP
                  maxLength={4}
                  className="otp flex justify-content-center gap-3"
                  onChange={(e) => {
                    otpForm.setValue("otp", e);
                  }}
                >
                  <InputOTPSlot index={0} className="w-24 h-12 rounded-3xl" />
                  <InputOTPSlot index={1} className="w-24 h-12 rounded-3xl" />
                  <InputOTPSlot index={2} className="w-24 h-12 rounded-3xl" />
                  <InputOTPSlot index={3} className="w-24 h-12 rounded-3xl" />
                </InputOTP>
              ) : (
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
              )}
              <Button
                className="submit-buttn w-full text-white bg-black  rounded-3xl p-3 font-medium mt-4"
                onClick={
                  toSendOtp
                    ? otpForm.handleSubmit(onOtpSubmit)
                    : form.handleSubmit(onSubmit)
                }
                disabled={isLoading}
              >
                {toSendOtp ? "Verify & Proceed" : "Sign In"}
              </Button>
              {!toSendOtp && (
                <p className="text-xs text-gray-400">
                  Otp will be sent to this number.
                </p>
              )}
              {otpError.value && (
                <div className="w-full text-rose-900 text-[11px]">{otpError.message}</div>
              )}
              {toSendOtp && (
                <div className="copy-wight-link -mt-2 text-xs">
                  <p className=" flex items-center gap-2">
                    Didn't receive OTP Code?{" "}
                    <Button
                      variant={"link"}
                      className="underline-offset-4 font-medium cursor-pointer"
                      onClick={handleResendOtp}
                      disabled={startTimer || isLoading}
                    >
                      Resend Code
                    </Button>
                  </p>
                </div>
              )}
            </div>
          </div>
          <p className="h-1/5 text-xs tracking-wide text-gray-700">
            Copyright © 2024
            <span className="text-theme"> D3 Sports Arena</span> All Rights
            Reserved.
          </p>

          {toSendOtp && (
            <div className="flex items-center justify-center w-full h-28 absolute bottom-52 left-0">
              {startTimer && (
                <CountdownCircleTimer
                  isPlaying
                  duration={duration}
                  initialRemainingTime={remainingTime}
                  colors={["#53A53F", "#F7B801"]}
                  colorsTime={[17, 0]}
                  onUpdate={(time) => {
                    dispatch(setRemainingTime({ time }));
                  }}
                  onComplete={handleComplete}
                  size={80}
                  strokeWidth={5}
                >
                  {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
              )}
            </div>
          )}
        </div>
        <div className="right-panel max-lg:hidden lg:col-span-6 pl-0 ml-20 pr-24 flex items-center justify-center">
          <EmblaCarousel />
        </div>
      </div>
    </>
  );
}
