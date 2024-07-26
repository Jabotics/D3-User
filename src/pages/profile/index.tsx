import Loader from "@/components/loader";
import LeftPanel from "@/components/profile/LeftPanel";
import RightPanel from "@/components/profile/RightPanel";
import { RootState } from "@/store";
import { useVerifySessionQuery } from "@/store/actions/slices/authSlice";
import { useAppSelector } from "@/store/hooks";
import { 
  useEffect, 
  // useState 
} from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  const toFetch = useVerifySessionQuery({});
  const { hasToken } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!hasToken) {
      navigate("/login");
    }
  }, 
  [
    hasToken, 
    navigate // ---> check
  ])

  if (toFetch.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen mb-10">
        <Loader />
      </div>
    );
  }
  return (
    <div className="bg-[#f3f4f5] w-screen h-fit lg:h-screen">
      <div className="flex w-full h-full flex-col lg:flex-row items-start justify-center gap-8 mt-16 lg:mt-20 mb-16 px-2 lg:pl-40 lg:pr-60">
        <div className="w-full lg:w-80 h-fit lg:h-full">
          <LeftPanel />
        </div>
        <div className="w-full lg:flex-1 h-fit lg:h-screen flex flex-col gap-0 lg:gap-12">
          <RightPanel />
          
          <div className="flex-1 flex items-start justify-center mt-5 lg:mt-0">
            <div className="w-full h-28 lg:h-36 rounded-2xl flex items-center">
              <div className="h-full w-2/3 bg-[#53A53F] rounded-l-2xl flex items-center ">
                <div className="flex-1 h-full flex flex-col items-start justify-center ml-5 lg:ml-32">
                  <h4 className="w-fit text-[9px] lg:text-xs text-gray-200">
                    {"Pay & Play"}
                  </h4>
                  <h1 className="w-24 lg:w-40 text-sm lg:text-xl text-gray-50">
                    Choose Cricket Or Football
                  </h1>
                  <div className="w-20 lg:w-32 mt-1 lg:mt-3 flex items-center justify-center rounded-xl bg-gray-900 text-gray-200 text-xs py-2 cursor-pointer">
                    Contact Us
                  </div>
                </div>
                <div className="w-32 lg:w-60 h-full flex items-center justify-center">
                  <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-full bg-amber-400 mr-0 lg:mr-20 flex flex-col items-center justify-center">
                    <h5 className="text-xs lg:text-sm text-gray-50">Swimming</h5>
                    <p className="text-[8px] lg:text-sm">Now Available</p>
                  </div>
                </div>
              </div>
              <div className="h-full w-1/3 rounded-r-2xl overflow-hidden">
                <img
                  src="/images/profile-img-banner.jpeg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
