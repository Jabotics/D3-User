import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AcademyRegistration from "./components/academy-registration";

const AcademyPage = () => {
  const navigate = useNavigate();
  const [academyName, _setAcademyName] = useState("");

  const [locationArr, setLocationArr] = useState<string[]>(["Home", "Academy"]);

  useEffect(() => {
    if (academyName) {
      setLocationArr((p) => [...p, academyName]);
    } else {
      setLocationArr(["Home", "Academy"]);
    }
  }, [academyName]);

  return (
    <div>
      <div className="flex flex-col px-5 lg:px-40 mt-8 lg:mt-0">
        <span className="h-8 flex items-center my-4 gap-1 text-sm">
          {locationArr.map((item, index) => (
            <div key={index}>
              <span
                className={`${item === "Home"
                  ? "text-gray-900 cursor-pointer hover:underline"
                  : "text-gray-500"
                  }`}
                onClick={() => navigate("/")}
              >
                {item}
              </span>
              {item === "Home" && (
                <span className="text-gray-500 ml-1">{"/"}</span>
              )}
            </div>
          ))}
        </span>

        <div className="h-fit lg:h-[125vh] w-full flex flex-col gap-2 mb-20">
          <div className="flex items-center justify-center w-full h-24">
            <div className="w-1/2 h-full bg-[#53A53F] rounded-l-xl hidden md:flex flex-col items-start justify-center pl-5 lg:pl-20">
              <div className="text-lg font-semibold text-gray-50">
                Host Your Events
              </div>
              <div className="w-[340px] text-xs text-gray-50">
                Engage with the Largest Sports Community and Network
              </div>
              <Button variant={"default"} className="rounded-md mt-2 h-6">
                Get In Touch
              </Button>
            </div>
            <div
              className={`w-full md:w-1/2 h-full rounded-r-xl overflow-hidden relative`}
            >
              <img
                src="/images/academy.jpeg"
                alt="academy"
                className="w-full h-full object-cover object-top "
              />

              <div className="absolute top-4 left-4 md:hidden text-xl font-semibold text-gray-200 bg-gray-500/25">
                Host Your Events
              </div>
              <div className="absolute top-12 left-4 md:hidden max-w-[340px] text-xs text-gray-100 bg-gray-500/25">
                Engage with the Largest Sports Community and Network
              </div>
              <Button
                variant={"default"}
                className="absolute bottom-4 left-4 md:hidden rounded-md mt-3 h-5 text-xs"
              >
                Get In Touch
              </Button>
            </div>
          </div>

          <div>
            <AcademyRegistration />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyPage;
