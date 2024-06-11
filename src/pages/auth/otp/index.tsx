import { useEffect } from "react";
import OtpPage from "./otp-page";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

const OTP = () => {
  const navigate = useNavigate();
  const { token, hasToken } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return <>{hasToken ? <>...loading</> : <OtpPage />}</>;
};

export default OTP;
