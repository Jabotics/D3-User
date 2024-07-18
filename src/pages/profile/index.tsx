import Loader from "@/components/loader";
import LeftPanel from "@/components/profile/LeftPanel";
import RightPanel from "@/components/profile/RightPanel";
import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [toFetch, setToFetch] = useState(false);
  
  const { hasToken } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchHandler = setTimeout(() => {
      setToFetch(true);
    }, 5000);

    return () => clearTimeout(fetchHandler);
  }, []);
  useEffect(() => {
    if (!hasToken) {
      navigate("/login");
    }
  }, [hasToken])

  if (!toFetch) {
    return (
      <div className="flex items-center justify-center h-screen mb-10">
        <Loader />
      </div>
    );
  }
  return (
    <div className="bg-[#f3f4f5] w-screen h-screen">
      <div className="flex w-full h-full flex-col sm:flex-row items-start justify-center gap-8 mt-20 mb-16 pl-40 pr-60">
        <div className="w-80 h-full">
          <LeftPanel />
        </div>
        <div className="flex-1 h-screen flex flex-col gap-12">
          <RightPanel />
          
          <div className="flex-1 flex items-start justify-center">
            <div className="w-full h-36 rounded-2xl flex items-center">
              <div className="h-full w-2/3 bg-[#53A53F] rounded-l-2xl flex items-center ">
                <div className="flex-1 h-full flex flex-col items-start justify-center ml-32">
                  <h4 className="w-fit text-xs text-gray-200">
                    {"Pay & Play"}
                  </h4>
                  <h1 className="w-40 text-xl text-gray-50">
                    Choose Cricket Or Football
                  </h1>
                  <div className="w-32 mt-3 flex items-center justify-center rounded-xl bg-gray-900 text-gray-200 text-xs py-2 cursor-pointer">
                    Contact Us
                  </div>
                </div>
                <div className="w-60 h-full flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-amber-400 mr-20 flex flex-col items-center justify-center">
                    <h5 className="text-sm text-gray-50">Swimming</h5>
                    <p className="text-sm">Now Available</p>
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
