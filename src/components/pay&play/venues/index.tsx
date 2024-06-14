
// import Sort from "./Sort"
import VenueItem from "./VenueItem"
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { useGetGroundQuery } from "@/store/actions/slices/groundSlice";
import { useEffect, useState } from "react";

const Venues = () => {

  const count = useAppSelector((state: RootState) => state.ground.total)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })
  const pageCount = Math.ceil((count || 0) / pagination.pageSize)
  const params: {
    [key: string]: string[];
  } = useAppSelector((state: RootState) => state.ground.params)

  const getGround = useGetGroundQuery({
    'supported_sports': JSON.stringify(params['supported_sports']),
    'venue': JSON.stringify(params['venue']),
    'ground_type': JSON.stringify(params['ground_type']),
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
  },
  )
  const groundData = useAppSelector((state: RootState) => state.ground.grounds)

  useEffect(() => {
    getGround.refetch()
  }, [params, pagination.pageIndex, pageCount])

  const showPagination = () => {
    const buttons: number[] = [];
    for (let i = 0; i < pageCount; i++) {
      buttons.push(i)
    }
    return buttons;
  };
  return (
    <div className="flex flex-col gap-8 w-[100%] sm:w-[50%] md:w-[50%] lg:w-[60%] xl:w-[40%] px-0 sm:px-8">
      <div className="flex flex-row border-b-2 pb-8 items-center">
        <span className="inline-block me-auto text-[16px] sm:text-[20px]"><b className="text-[#53A53F]">Total {count}</b> results found</span>
        {/* <Sort /> */}
      </div>
      {groundData.map((item, index) => {
        return <VenueItem key={index} item={item} />
      })}

      <div className="self-end flex flex-row gap-4">
        <span className="inline-block text-[14px] font-semibold cursor-pointer">Page :</span>
        {showPagination().map((item, index) => {
          return (
            <button
              key={index}
              className={`inline-block text-[12px] w-[20px] h-[20px] font-semibold cursor-pointer ${pagination.pageIndex === item ? 'bg-[#53A53F] text-white' : 'bg-gray-200 text-black'
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
          )
        })}

      </div>
    </div>
  )
}

export default Venues