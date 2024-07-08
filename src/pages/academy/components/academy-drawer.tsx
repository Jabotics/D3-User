import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useGetSportQuery } from "@/store/actions/slices/sportSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { APIEndPoints } from "@/APIEndpoint";
import { RxCross2 } from "react-icons/rx";
import { setSelectedSportsStore } from "@/store/actions/slices/academySlice";

export function AcademySportsSelect() {
  const dispatch = useAppDispatch();

  useGetSportQuery({});
  const { sports } = useAppSelector((state: RootState) => state.sport);

  const { selectedSportsStore } = useAppSelector(
    (state: RootState) => state.academy
  );

  const [open, setOpen] = React.useState(selectedSportsStore ? false : true);

  const [selectedSports, setSelectedSports] = React.useState<string | null>(
    null
  );

  const handleSubmit = () => {
    if (selectedSports) {
      dispatch(setSelectedSportsStore(selectedSports));
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={() => setOpen(false)}>
      <DrawerContent className="bg-[#53a53fa6] border-none outline-none w-screen">
        <div className="px-40 w-full h-[20rem] max-h-[35rem] flex flex-col">
          <DrawerHeader className="h-20">
            <DrawerTitle className="text-2xl">
              {selectedSports ? `Selected Sports: ` : "Select a Sport"}
              <span className="tracking-wide font-light">
                {sports && sports.find((i) => i.id === selectedSports)?.name}
              </span>
            </DrawerTitle>
            {/* <DrawerDescription className="text-white text-xl">Select a Sport to Continue.</DrawerDescription> */}
          </DrawerHeader>
          <div className="w-full flex-1 flex items-start flex-wrap gap-3 overflow-x-hidden overflow-y-auto filter-sc py-5 px-5">
            {sports &&
              sports.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 border border-gray-200 bg-gray-100 rounded-md cursor-pointer w-28 h-28 text-center relative"
                    onClick={() => {
                      setSelectedSports(item.id);
                    }}
                  >
                    {item?.icon && (
                      <img
                        src={`${APIEndPoints.BackendURL}/${item.icon}`}
                        alt=""
                        className="object-cover"
                      />
                    )}
                    {item.id === selectedSports && (
                      <div
                        className="absolute top-0 right-0 bg-gray-950 text-white rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSports(null);
                        }}
                      >
                        <RxCross2 />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <DrawerFooter className="flex flex-row items-center gap-2">
            <Button onClick={handleSubmit} className="w-1/2">Select</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-1/2">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
