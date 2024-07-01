import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GrPowerReset } from "react-icons/gr";
import { RiFilterLine } from "react-icons/ri";

import { HiOutlineSortDescending } from "react-icons/hi";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { AcademyPagination } from "./academy-pagination";
// import { AcademySportsSelect } from "./academy-drawer";
import AcademyFilter from "./academy-filter";

import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import {
  resetFilters,
  setSelectedGroundType,
  setSelectedSportsStore,
  setSelectedVenue,
  setSortByText,
} from "@/store/actions/slices/academySlice";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AcademyList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { sports } = useAppSelector((state: RootState) => state.sport);
  const { venues } = useAppSelector((state: RootState) => state.venue);
  const {
    academies,
    selectedSportsStore,
    count,
    sortByText,
    selectedVenue,
    selectedGroundType,
  } = useAppSelector((state: RootState) => state.academy);
  const [filtersArr, setFiltersArr] = useState<{
    sports: string | null;
    sortBy: string[] | null;
    venue: string[] | null;
    groundType: string[] | null;
  }>({
    sports: null,
    sortBy: null,
    venue: null,
    groundType: null,
  });

  const [hasAppliedFilters, setHasAppliedFilters] = useState<boolean>(false);

  useEffect(() => {
    if (Object.values(filtersArr).every((value) => value === null)) {
      setHasAppliedFilters(false);
    } else {
      setHasAppliedFilters(true);
    }
  }, [filtersArr]);

  useEffect(() => {
    setFiltersArr((p) => ({
      ...p,
      sortBy: sortByText.length === 0 ? null : sortByText,
    }));
  }, [sortByText]);

  useEffect(() => {
    setFiltersArr((p) => ({
      ...p,
      groundType: selectedGroundType.length === 0 ? null : selectedGroundType,
    }));
  }, [selectedGroundType]);

  useEffect(() => {
    setFiltersArr((p) => ({
      ...p,
      venue: selectedVenue.length === 0 ? null : selectedVenue,
    }));
  }, [selectedVenue]);

  useEffect(() => {
    setFiltersArr((p) => ({ ...p, sports: selectedSportsStore }));
  }, [selectedSportsStore]);

  return (
    <>
      {/* <AcademySportsSelect /> */}
      <div className="w-full h-full flex items-start gap-2">
        {/*  */}
        <div className="w-60 xl:w-80 h-full hidden lg:block">
          <div className="w-full h-12">
            <div className="w-full flex items-center h-full">
              <RiFilterLine
                size={window.innerWidth > 1280 ? 20 : 18}
                color="black"
                className="mr-2"
              />
              <span className="inline-block text-xs xl:text-sm font-medium">
                Filter by Category
              </span>
              <Button className="ms-auto bg-[#53A53F] hover:bg-[#53A53F] text-[10px] xl:text-xs w-[100px] border rounded-3xl flex flex-row justify-center h-5 items-center gap-2 px-1 xl:px-2 text-white">
                Reset <GrPowerReset />
              </Button>
            </div>
            <Separator />
          </div>

          <div>
            <AcademyFilter />
          </div>
        </div>

        {/*  */}
        <div className="flex-1 h-full ">
          <>
            {hasAppliedFilters ? (
              <>
                <div className="rounded-2xl bg-gray-200 max-w-full ml-10 h-12 px-4 flex items-center justify-start gap-3">
                  <FaArrowLeftLong
                    className="rounded-full bg-gray-800/35 p-1 text-gray-200 h-8 w-8 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(resetFilters());
                    }}
                  />
                  <div className="text-sm font-light text-gray-500 flex items-center">
                    <span className="text-[#53A53F] font-medium mr-1">
                      Total {count}
                    </span>
                    <span className="text-xs">Results found</span>
                  </div>
                </div>
                <div className="px-5 text-xs mt-5 flex items-center gap-3 h-10">
                  {filtersArr && (
                    <>
                      {sports ? (
                        sports &&
                        selectedSportsStore && (
                          <span className="bg-gray-700 text-gray-50 px-5 py-2 rounded-2xl flex items-center gap-3 cursor-pointer">
                            <RxCross2
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(setSelectedSportsStore(null));
                              }}
                            />
                            {
                              sports.find((i) => i.id === selectedSportsStore)
                                ?.name
                            }
                          </span>
                        )
                      ) : (
                        <>
                          <span className="bg-gray-100 px-5 py-2 rounded-2xl"></span>
                        </>
                      )}
                      {sortByText &&
                        sortByText.map((item, index) => {
                          return (
                            <span
                              className="bg-gray-700 text-gray-50 px-5 py-2 rounded-2xl flex items-center gap-3 cursor-pointer"
                              key={index}
                            >
                              <RxCross2
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(setSortByText(item));
                                }}
                              />
                              {item}
                            </span>
                          );
                        })}
                      {venues ? (
                        selectedVenue &&
                        selectedVenue.map((item, index) => {
                          return (
                            <span
                              className="bg-gray-700 text-gray-50 px-5 py-2 rounded-2xl flex items-center gap-3 cursor-pointer"
                              key={index}
                            >
                              <RxCross2
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(setSelectedVenue(item));
                                }}
                              />
                              {venues.find((i) => i.id === item)?.name}
                            </span>
                          );
                        })
                      ) : (
                        <>
                          <span className="bg-gray-100 px-5 py-2 rounded-2xl"></span>
                        </>
                      )}
                      {selectedGroundType &&
                        selectedGroundType.map((item, index) => {
                          return (
                            <span
                              className="bg-gray-700 text-gray-50 px-5 py-2 rounded-2xl flex items-center gap-3 cursor-pointer"
                              key={index}
                            >
                              <RxCross2
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(setSelectedGroundType(item));
                                }}
                              />
                              {item}
                            </span>
                          );
                        })}
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="ml-5 mt-5 text-lg xl:text-2xl font-medium tracking-wide">
                  All Academies
                </div>
                <Separator className="w-[90%] ml-5" />
              </>
            )}
          </>

          {/*  */}
          <div className="flex items-center justify-between lg:hidden w-full h-10 px-3 mt-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="px-2 h-6 flex items-center"
                >
                  <RiFilterLine
                    size={window.innerWidth > 1280 ? 20 : 18}
                    color="black"
                    className="mr-2"
                  />{" "}
                  Filter by
                </Button>
              </SheetTrigger>
              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="text-[#53A53F]">Filter by Category</SheetTitle>
                  <SheetDescription>
                    Filter your search based on given categories.
                  </SheetDescription>
                </SheetHeader>
                <AcademyFilter />
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-2 h-6">
                  <HiOutlineSortDescending
                    size={20}
                    color="black"
                    className="mr-2"
                  />{" "}
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup className="flex flex-col gap-1">
                  {[
                    "Nearest",
                    "Newest Arrivals",
                    // "Price: Low to High",
                    // "Price: High to Low",
                    "Customer Reviews",
                  ].map((item, index) => {
                    return (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => {
                          dispatch(setSortByText(item));
                        }}
                        className={`${
                          filtersArr.sortBy?.includes(item)
                            ? "bg-gray-700 text-gray-50 border-gray-100"
                            : "border-gray-400"
                        }`}
                      >
                        <span>{item}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/*  */}
          <div
            className={`max-w-full ${
              hasAppliedFilters ? "h-[23rem]" : "h-[26.25rem]"
            } ml-0 lg:ml-5 flex flex-col gap-5 scroll-nobg pr-3 mt-3 lg:mt-8 overflow-x-hidden overflow-y-auto mb-5`}
          >
            {academies && academies.length > 0 ? (
              <>
                {academies.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full h-16 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-between px-5 cursor-pointer"
                      onClick={() => {
                        navigate(`/academy?id=${item.id}`);
                      }}
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-md overflow-hidden">
                          <img
                            src="https://res.cloudinary.com/purnesh/image/upload/w_1080,f_auto/west-delhi-cricket-academy0.jpg"
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-sm sm:text-2xl font-light">{item.name}</div>
                          <div className="flex items-center gap-1">
                            <div className="text-[8px] sm:text-sm font-medium">
                              {item.ground.name}
                            </div>
                            <div className="text-[8px] sm:text-sm  text-gray-500">
                              ({item.ground.venue.name})
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <HiOutlineArrowLongRight
                          size={30}
                          className="text-gray-400"
                        />
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              [...Array.from({ length: 4 })].map((_, index) => {
                return (
                  <div
                    key={index}
                    className="w-full h-28 bg-gray-100 rounded-lg"
                  ></div>
                );
              })
            )}
          </div>

          <div className="w-full h-12 flex items-center justify-end">
            <AcademyPagination />
          </div>
        </div>

        {/*  */}
        <div className="w-40 xl:w-60 h-full hidden lg:block">
          <div className="w-full h-12">
            <div className="w-full flex flex-wrap items-center h-full border-[1px] border-gray-100 p-2 rounded-md">
              <HiOutlineSortDescending
                size={20}
                color="black"
                className="mr-2"
              />
              <span className="inline-block text-xs xl:text-sm font-medium">
                Sort by
              </span>
            </div>
            {academies && academies.length > 0 ? (
              <div className="flex flex-wrap w-full gap-2 mt-5">
                {[
                  "Nearest",
                  "Newest Arrivals",
                  // "Price: Low to High",
                  // "Price: High to Low",
                  "Customer Reviews",
                ].map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`rounded-2xl border cursor-pointer ${
                        filtersArr.sortBy?.includes(item)
                          ? "bg-gray-700 text-gray-50 border-gray-100"
                          : "border-gray-400"
                      } px-2 text-xs xl:text-sm`}
                      onClick={() => {
                        dispatch(setSortByText(item));
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap w-full gap-2 mt-5">
                {Array.from({ length: 3 }).map((_, index) => {
                  return (
                    <div
                      key={index}
                      className={`rounded-2xl border cursor-pointer bg-gray-100 px-2 h-5 w-16 text-sm`}
                    ></div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademyList;
