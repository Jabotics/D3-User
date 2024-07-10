import { Separator } from "@/components/ui/separator";
import { FaArrowLeftLong, FaLocationDot } from "react-icons/fa6";

const Kabaddi = () => {
  return (
    <div className="w-full h-full">
      <div className="absolute -top-10 left-0 flex items-center justify-start gap-2">
        <FaArrowLeftLong
          className="rounded-full bg-gray-800/35 p-1 text-gray-200 h-4 sm:h-5 w-4 sm:w-5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <span className="font-medium text-sm text-gray-400">Scoreboard</span>{" "}
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-5 w-full h-full">
        <div className="h-fit sm:h-full w-full sm:w-1/2 flex flex-col gap-5">
          <div className="h-28 sm:h-60 w-full bg-gray-100 rounded-2xl flex overflow-hidden items-center relative">
            <div
              className="w-full h-full flex items-center justify-evenly py-5 grayscale-[25%]"
              style={{
                backgroundImage: "url(/images/kabaddi.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="absolute h-full w-full left-0 top-0 bg-gray-600/35" />

            <div className="absolute h-full w-full flex justify-evenly items-center">
              <div className="text-white text-3xl sm:text-5xl flex flex-col gap-2 sm:gap-5 items-center justify-center">
                <div className="font-light text-2xl sm:text-6xl">Team A</div>
                <div className="font-semibold">6</div>
              </div>

              <div className="bg-gray-300/75 w-[2px] h-5/6" />

              <div className="text-white text-3xl sm:text-5xl flex flex-col gap-2 sm:gap-5 items-center justify-center">
                <div className="font-light text-2xl sm:text-6xl">Team B</div>
                <div className="font-semibold">5</div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full hidden sm:flex flex-col">
            <div className="h-fit w-full flex items-center justify-start gap-2 underline">
              <span className="font-medium text-sm text-gray-400">
                Raids
              </span>{" "}
            </div>

            <div className="w-full flex-1 flex items-start justify-between px-10">
              <div className="h-fit mt-10 text-sm flex flex-col gap-2">
                <span className="flex items-center gap-5">
                  <p className="text-gray-400">First</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center">+1 Points</p>{" "}
                </span>

                <span className="flex items-center gap-5">
                  <p className="text-gray-400">Second</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center gap-2 text-gray-700">
                    Penalty
                  </p>{" "}
                </span>

                <span className="flex items-center gap-5">
                  <p className="text-gray-400">Third</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center">+1 Points</p>{" "}
                </span>

                <span className="flex items-center gap-5">
                  <p className="text-gray-400">Fourth</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center">+1 Points</p>{" "}
                </span>

                <span className="flex items-center gap-5">
                  <p className="text-gray-400">Fifth</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center">+1 Points</p>{" "}
                </span>

                <span className="flex items-center gap-5">
                  <p className="text-gray-400">Sixth</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center">+1 Points</p>{" "}
                </span>

                <span className="flex items-center gap-5">
                  <p className="text-gray-400">Seventh</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center">+1 Points</p>{" "}
                </span>
              </div>
              <div className="w-[2px] h-full bg-gray-200" />
              <div className="h-fit mt-10 text-sm flex flex-col gap-2">
                <span className="flex items-center gap-5">
                  <p className="text-gray-400">First</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center">+1 Points</p>{" "}
                </span>

                <span className="flex items-center gap-5">
                  <p className="text-gray-400">Second</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center gap-2 text-gray-700">
                    Penalty
                  </p>{" "}
                </span>

                <span className="flex items-center gap-5">
                  <p className="text-gray-400">Third</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center">+1 Points</p>{" "}
                </span>

                <span className="flex items-center gap-5">
                  <p className="text-gray-400">Fourth</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center">+1 Points</p>{" "}
                </span>

                <span className="flex items-center gap-5">
                  <p className="text-gray-400">Fifth</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center">+1 Points</p>{" "}
                </span>

                <span className="flex items-center gap-5">
                  <p className="text-gray-400">Sixth</p>{" "}
                  <p className="h-px w-20 bg-gray-500" />{" "}
                  <p className="flex items-center">+1 Points</p>{" "}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 h-full flex flex-col">
          <span className="w-full h-8 text-center text-gray-600">
            <div className="flex items-center gap-4 justify-center">
              <p className="tracking-wide">Time :</p>
              <p className="font-mono">20:10</p>
            </div>
            <Separator />
            <div className="flex items-center justify-center text-[9px] sm:text-xs mt-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-4 justify-center">
                <p className="tracking-wide">Venue :</p>
                <p className="font-mono">Gulmohar</p>
              </div>
              <div className="flex items-center gap-1 sm:gap-4 justify-center">
                <p className="tracking-wide">Ground :</p>
                <p className="font-mono">Turf 1</p>
              </div>
              <div className="ml-3 flex items-center gap-1 sm:gap-2 justify-center">
                <FaLocationDot size={12} color="#D0D0D0" />
                <p className="tracking-wide">Near Kazipara</p>
              </div>
            </div>
          </span>

          <div className="w-full h-60 flex items-center justify-evenly mt-10">
            <div className="flex flex-col items-center justify-evenly gap-3">
              <div className="flex flex-col items-center justify-center h-20 w-20 border border-gray-200 rounded-md -space-y-3 text-2xl">
                <span>A</span>
                <p className="text-[10px]">Team</p>
              </div>
              {/* <div className="flex items-center justify-center gap-5">
                <div
                  className={`h-12 w-12 bg-red-100 rounded-full text-xs flex items-center justify-center text-gray-700 border-2 border-red-400 cursor-pointer`}
                >
                  Red
                </div>
                <div
                  className={`h-12 w-12 bg-amber-100 rounded-full text-xs flex items-center justify-center text-gray-700 border-2 border-amber-400 cursor-pointer`}
                >
                  Yellow
                </div>
              </div> */}
            </div>

            <div className="flex flex-col items-center justify-evenly gap-3">
              <div className="flex flex-col items-center justify-center h-20 w-20 border border-gray-200 rounded-md -space-y-3 text-2xl">
                <span>B</span>
                <p className="text-[10px]">Team</p>
              </div>
              {/* <div className="flex items-center justify-center gap-5">
                <div
                  className={`h-12 w-12 bg-red-100 rounded-full text-xs flex items-center justify-center text-gray-700 border-2 border-red-400 cursor-pointer`}
                >
                  Red
                </div>
                <div
                  className={`h-12 w-12 bg-amber-100 rounded-full text-xs flex items-center justify-center text-gray-700 border-2 border-amber-400 cursor-pointer`}
                >
                  Yellow
                </div>
              </div> */}
            </div>
          </div>

          <div className="w-full flex-1 ">
            <div className="w-full h-40 flex items-start justify-evenly text-2xl sm:text-4xl">
              <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
                <div className="px-1 py-1 sm:px-3 sm:py-3 border border-gray-200 rounded-md flex flex-col items-center justify-center">
                  <span className="text-gray-800">{"+1"}</span>
                  <span className="text-sm text-gray-500">Point</span>
                </div>
                <div className="px-1 py-1 sm:px-3 sm:py-3 border border-gray-200 rounded-md flex flex-col items-center justify-center">
                  <span className="text-gray-800">{"+2"}</span>
                  <span className="text-sm text-gray-500">Points</span>
                </div>
                {/* <div className="px-1 py-1 sm:px-3 sm:py-3 border border-gray-200 rounded-md flex flex-col items-center justify-center">
                  <span className="text-gray-800">{"+3"}</span>
                  <span className="text-sm text-gray-500">Points</span>
                </div> */}
                <div className="px-1 py-1 sm:px-3 sm:py-3 border border-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-xl sm:text-3xl text-gray-500">Pen</span>
                </div>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
                <div className="px-1 py-1 sm:px-3 sm:py-3 border border-gray-200 rounded-md flex flex-col items-center justify-center">
                  <span className="text-gray-800">{"+1"}</span>
                  <span className="text-sm text-gray-500">Point</span>
                </div>
                <div className="px-1 py-1 sm:px-3 sm:py-3 border border-gray-200 rounded-md flex flex-col items-center justify-center">
                  <span className="text-gray-800">{"+2"}</span>
                  <span className="text-sm text-gray-500">Points</span>
                </div>
                {/* <div className="px-1 py-1 sm:px-3 sm:py-3 border border-gray-200 rounded-md flex flex-col items-center justify-center">
                  <span className="text-gray-800">{"+3"}</span>
                  <span className="text-sm text-gray-500">Points</span>
                </div> */}
                <div className="px-1 py-1 sm:px-3 sm:py-3 border border-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-xl sm:text-3xl text-gray-500">Pen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Kabaddi