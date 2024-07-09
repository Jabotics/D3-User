import LiveUpdates from "@/components/live-updates";
import { Button } from "@/components/ui/button";
// import { RootState } from "@/store";
// import { useAppSelector } from "@/store/hooks";
// import { useSearchParams } from "react-router-dom";

const ScoreboardPage = () => {
  // const searchParams = useSearchParams();
  const currentSports = "Kabaddi";

  // const { grounds } = useAppSelector((state: RootState) => state.ground);
  return (
    <div className="w-screen h-[125vh] sm:h-[90vh] overflow-hidden relative">
      <div className="w-full h-full flex items-center justify-center">
        <LiveUpdates sports={currentSports} />
      </div>
      <div className="fixed bottom-3 w-[88%] left-1/2 -translate-x-1/2 rounded-md h-24 sm:h-32 bg-gray-800 flex flex-col items-center justify-center gap-2">
        <div className="text-gray-200 text-sm">Save New Changes?</div>
        <div className="w-full gap-5 flex items-center justify-center">
          <Button variant={'default'} className="w-[40%] sm:w-[25%] bg-gray-300 hover:bg-stone-400 text-black hover:text-gray-100 hover:border hover:border-gray-100">Save</Button>
          <Button variant={'default'} className="w-[40%] sm:w-[25%] border border-gray-300 bg-stone-800">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default ScoreboardPage;
