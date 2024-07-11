import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  setParams,
  // useGetGroundQuery,
} from "@/store/actions/slices/groundSlice";
import { setSelectedSports } from "@/store/actions/slices/sportSlice";
import { setSelectedVenue } from "@/store/actions/slices/venueSlice";
import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { RiFilterLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

const FilterHead = () => {
  const dispatch = useDispatch();
  const [isReset, setIsReset] = useState(false);
  const handleReset = () => {
    setIsReset(true);
    dispatch(setSelectedSports({ sportId: "" }));
    dispatch(setSelectedVenue({ venueId: "" }));
    dispatch(setParams({ key: "supported_sports", data: [] }));
    dispatch(setParams({ key: "venue", data: [] }));
  };
  // const { refetch } = useGetGroundQuery({});
  useEffect(() => {
    if (isReset) {
      // refetch();
      setIsReset(false);
    }
  }, [
    isReset, 
    // refetch
  ]);
  return (
    <div className="hidden sm:block w-full h-12 mb-5">
      <div className="w-full flex items-center h-full">
        <RiFilterLine
          size={window.innerWidth > 1280 ? 20 : 18}
          color="black"
          className="mr-2"
        />
        <span className="inline-block text-xs xl:text-sm font-medium">
          Filter by Category
        </span>
        <Button
          onClick={handleReset}
          className="ms-auto bg-[#53A53F] hover:bg-[#53A53F] text-[10px] xl:text-xs w-[100px] border rounded-3xl flex flex-row justify-center h-5 items-center gap-2 px-1 xl:px-2 text-white"
        >
          Reset <GrPowerReset />
        </Button>
      </div>
      <Separator />
    </div>
  );
};

export default FilterHead;
