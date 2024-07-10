import { Separator } from "@/components/ui/separator";
import { FaArrowLeftLong, FaLocationDot } from "react-icons/fa6";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

const Cricket = () => {
  return (
    <>
      <div className="absolute -top-10 left-0 flex items-center justify-start gap-2">
        <FaArrowLeftLong
          className="rounded-full bg-gray-800/35 p-1 text-gray-200 h-4 sm:h-5 w-4 sm:w-5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <span className="font-medium text-sm text-gray-400">Scoreboard</span>{" "}
      </div>

      <div className="h-40 bg-gray-100 rounded-2xl flex items-center">
        <div className="w-full sm:w-[25vw] h-full flex flex-col justify-center py-5 sm:py-0 gap-2 sm:gap-5 ml-12">
          <div className="flex items-center gap-5">
            <div className="text-lg sm:text-2xl">Team A :</div>
            <div>12 / 1 &nbsp;&nbsp;(1.1)</div>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-lg sm:text-2xl">Team B :</div>
            <div>Yet to Bat</div>
          </div>
        </div>
        <div className="w-[5px] h-full bg-white sm:block hidden" />
        <div className="flex-1 h-full sm:flex flex-col justify-center gap-5 pl-12 hidden">
          <div className="flex items-center gap-5">
            {[
              "3",
              "8",
              "1",
              "Dnb",
              "Dnb",
              "Dnb",
              "Dnb",
              "Dnb",
              "Dnb",
              "Dnb",
              "Dnb",
            ].map((item, index) => {
              return (
                <div
                  key={index}
                  className="px-5 py-1 border border-gray-300 rounded-md"
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-5 text-gray-400">
            <HiOutlineArrowLongLeft size={20} />
            <span>2nd Ininngs not started</span>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 hidden sm:flex items-center">
        <div className="w-[27.5vw] h-full">
          <div className="text-5xl mt-5 flex items-center">
            <span className="bg-gray-900 px-5 py-1 text-gray-100 rounded-lg">
              2nd Wkt
            </span>
            <span className="ml-5 px-1 py-1 border border-gray-300 flex flex-col items-center justify-center rounded-md text-5xl text-gray-300 cursor-pointer">
              Out
            </span>
          </div>
          <div className="mt-5 text-gray-400">
            <span>Last 10 ball</span>
            <span className="flex items-center gap-2">
              {["1", "2", "6", "W", "1", "2", "0"].map((item, index) => {
                return (
                  <p
                    className={`w-10 h-10 flex items-center justify-center shrink-0 rounded-full text-xl text-gray-800 ${
                      item === "W"
                        ? "bg-red-300 text-white"
                        : item === "6"
                        ? "bg-amber-200"
                        : "bg-teal-100"
                    }`}
                    key={index}
                  >
                    {item}
                  </p>
                );
              })}
            </span>
          </div>
          <div className="text-2xl mt-5">Total 20 Over</div>
          <div className="">
            <span className="underline text-gray-500">Current Over :</span>
            <span className="ml-3">2nd Ovr</span>
          </div>

          <div className="mt-10 text-sm flex items-center gap-2">
            <div className="text-gray-500">Venue :</div>
            <div>Mumbai</div>
          </div>

          <div className="text-sm flex items-center gap-2">
            <div className="text-gray-500">Ground :</div>
            <div>Wankhede</div>
          </div>

          <div className="text-sm flex items-center gap-2">
            <FaLocationDot size={12} color="#D0D0D0" />
            <p className="p-0 m-0 text-[12px] sm:text-[14px] md:text-xs text-[#676767]">
              Somewhere
            </p>
          </div>
        </div>
        <div className="w-[3px] h-full bg-gray-100 hidden sm:flex items-center justify-center" />
        <div className="flex-1 h-full ml-10">
          <div className="text-gray-500">Score</div>
          <Separator className="mb-5" />
          <div className="w-4/5 flex flex-wrap items-center justify-start gap-5">
            {["0", "+1", "+2", "+3", "+4", "+5", "+6", "No", "Wd", "B"].map(
              (item, index) => {
                return (
                  <div
                    className="px-5 py-4 border border-gray-300 flex flex-col items-center justify-center rounded-md text-7xl text-gray-300 cursor-pointer"
                    key={index}
                  >
                    <span>{item}</span>
                    <span className="text-sm text-gray-500">
                      {item === "No" || item === "Wd" ? "Ball" : "Run"}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      <div className="sm:hidden flex flex-col w-full">
        <div className="text-lg mt-5 flex items-center w-full">
          <span className="bg-gray-900 px-5 py-1 text-gray-100 rounded-lg w-1/2">
            2nd Wkt :
          </span>
          <span className="ml-5 px-1 py-1 border border-gray-300 w-1/2 flex flex-col items-center justify-center rounded-md text-lg text-gray-300 cursor-pointer">
            Out
          </span>
        </div>
        <div className="mt-5 text-gray-400">
          <span className="text-xs">Last 10 ball</span>
          <span className="flex items-center gap-2">
            {["1", "2", "6", "W", "1", "2", "0"].map((item, index) => {
              return (
                <p
                  className={`w-8 h-8 flex items-center justify-center shrink-0 rounded-full text-sm text-gray-800 ${
                    item === "W"
                      ? "bg-red-300 text-white"
                      : item === "6"
                      ? "bg-amber-200"
                      : "bg-teal-100"
                  }`}
                  key={index}
                >
                  {item}
                </p>
              );
            })}
          </span>
        </div>

        <div className="flex-1 h-full w-full mt-5">
          <div className="text-gray-500 text-sm">Score</div>
          <Separator className="mb-5" />
          <div className="flex flex-wrap items-center justify-start gap-5">
            {["0", "+1", "+2", "+3", "+4", "+5", "+6", "No", "Wd", "B"].map(
              (item, index) => {
                return (
                  <div
                    className="px-5 border border-gray-300 flex flex-col items-center justify-center rounded-md text-lg text-gray-300 cursor-pointer"
                    key={index}
                  >
                    <span>{item}</span>
                    <span className="text-[10px] -mt-2 text-gray-500">
                      {item === "No" || item === "Wd" ? "Ball" : "Run"}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cricket;
