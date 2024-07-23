// import Sort from "./Sort"
import VenueItem from "./VenueItem";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import {
  resetFilters,
  setSelectedGroundType,
  setSelectedSportsStore,
  setSelectedVenueInGround,
  setSortByText,
  useGetGroundQuery,
} from "@/store/actions/slices/groundSlice";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineSortDescending } from "react-icons/hi";

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
import FilterByCategory from "../filter";
import { Button } from "@/components/ui/button";
import { RiFilterLine } from "react-icons/ri";

const Venues = ({
  filterArr,
}: {
  filterArr: {
    sports: string[] | null;
    sortBy: string[] | null;
    venue: string[] | null;
    groundType: string[] | null;
  };
}) => {
  const dispatch = useAppDispatch();

  const { selectedSportsStore, sortByText, selectedGroundType, selectedVenue } =
    useAppSelector((state: RootState) => state.ground);
  const count = useAppSelector((state: RootState) => state.ground.total);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const pageCount = Math.ceil((count || 0) / pagination.pageSize);

  const [hasAppliedFilters, setHasAppliedFilters] = useState<boolean>(false);

  const params: {
    [key: string]: string[];
  } = useAppSelector((state: RootState) => state.ground.params);

  const selectedCity = useAppSelector(
    (state: RootState) => state.city.selectedCity
  );

  const { sports } = useAppSelector((state: RootState) => state.sport);
  const { venues } = useAppSelector((state: RootState) => state.venue);

  const getGround = useGetGroundQuery({
    supported_sports: JSON.stringify(params["supported_sports"]),
    venue: JSON.stringify(params["venue"]),
    ground_type: JSON.stringify(params["ground_type"]),
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
    city: selectedCity,
  });

  const groundData = useAppSelector((state: RootState) => state.ground.grounds);

  useEffect(() => {
    getGround.refetch();
  }, [params, pagination.pageIndex, pageCount, selectedCity]);

  useEffect(() => {
    if (Object.values(filterArr).every((value) => value === null)) {
      setHasAppliedFilters(false);
    } else {
      setHasAppliedFilters(true);
    }
  }, [filterArr]);

  const showPagination = () => {
    const buttons: number[] = [];
    for (let i = 0; i < pageCount; i++) {
      buttons.push(i);
    }
    return buttons;
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-8 h-[80vh] sm:h-[75vh] lg:w-full">
      <div className="h-fit flex flex-row items-center">
        <div className="flex flex-col w-full">
          <>
            {hasAppliedFilters ? (
              <>
                <div className="rounded-2xl bg-gray-200 max-w-full ml-10 h-7 sm:h-12 px-4 flex items-center justify-start gap-3">
                  <FaArrowLeftLong
                    className="rounded-full bg-gray-800/35 p-1 text-gray-200 h-4 w-4 sm:h-8 sm:w-8 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(resetFilters());
                    }}
                  />
                  <div className="text-[10px] sm:text-sm font-light text-gray-500 flex items-center">
                    <span className="text-[#53A53F] font-medium mr-1">
                      Total {count}
                    </span>
                    <span className="text-[9px] sm:text-xs">Results found</span>
                  </div>
                </div>
                <div className="px-5 text-[9px] sm:text-xs mt-0 sm:mt-5 flex items-center gap-3 h-10">
                  {filterArr && (
                    <>
                      {sports ? (
                        selectedSportsStore.length > 0 &&
                        selectedSportsStore.map((item, index) => {
                          return (
                            <span
                              key={index}
                              className="bg-gray-700 text-gray-50 px-5 py-1 sm:py-2 rounded-2xl flex items-center gap-3 cursor-pointer"
                            >
                              <RxCross2
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(setSelectedSportsStore(item));
                                }}
                              />
                              {sports.find((i) => i.id === item)?.name}
                            </span>
                          );
                        })
                      ) : (
                        <>
                          <span className="bg-gray-100 px-5 py-2 rounded-2xl"></span>
                        </>
                      )}
                      {sortByText &&
                        sortByText.map((item, index) => {
                          return (
                            <span
                              className="bg-gray-700 text-gray-50 px-5 py-1 sm:py-2 rounded-2xl flex items-center gap-3 cursor-pointer"
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
                              className="bg-gray-700 text-gray-50 px-5 py-1 sm:py-2 rounded-2xl flex items-center gap-3 cursor-pointer"
                              key={index}
                            >
                              <RxCross2
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(setSelectedVenueInGround(item));
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
                              className="bg-gray-700 text-gray-50 px-5 py-1 sm:py-2 rounded-2xl flex items-center gap-3 cursor-pointer"
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
                <span className="ml-5 mt-1 sm:mt-5 text-lg xl:text-2xl font-medium tracking-wide">
                  All Grounds
                </span>
                <Separator className="w-[90%] ml-5" />
              </>
            )}
          </>
        </div>
      </div>

      <div className="sm:hidden flex items-center justify-between w-full">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="px-2 h-8 border-gray-100 flex items-center"
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
              <SheetTitle className="text-[#53A53F]">
                Filter by Category
              </SheetTitle>
              <SheetDescription>
                Filter your search based on given categories.
              </SheetDescription>
            </SheetHeader>
            <FilterByCategory />
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-wrap items-center border-[1px] h-8 border-gray-100 rounded-md"
            >
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
                "Multisports",
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
                      filterArr.sortBy?.includes(item)
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

      <div className="flex-1 w-full overflow-x-hidden overflow-y-auto">
        {groundData.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            {groundData.map((item, index) => {
              return <VenueItem key={index} item={item} />;
            })}
          </div>
        ) : (
          <div className="flex w-full flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-16 bg-gray-100 rounded-md"
                ></div>
              );
            })}
          </div>
        )}
      </div>

      <div className="h-fit w-full self-end flex items-center justify-end gap-4">
        <span className="inline-block text-[14px] font-semibold cursor-pointer">
          Page :
        </span>
        {showPagination().map((item, index) => {
          return (
            <button
              key={index}
              className={`inline-block text-[12px] w-[20px] h-[20px] font-semibold cursor-pointer ${
                pagination.pageIndex === item
                  ? "bg-[#53A53F] text-white"
                  : "bg-gray-200 text-black"
              } rounded-md`}
              onClick={() => {
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: item,
                }));
              }}
            >
              {item + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Venues;
