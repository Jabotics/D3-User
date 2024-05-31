import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./login-page";

const Login = () => {
  const navigate = useNavigate();
  const { token, hasToken } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  return <>{hasToken ? <>...loading</> : <LoginPage />}</>;
};

export default Login;
