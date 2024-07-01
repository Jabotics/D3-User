import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AcademyList from "./components/academy-list";
import {
  resetLocationArr,
  setLocationArr,
  setSelectedSlots,
  useFetchAcademiesQuery,
} from "@/store/actions/slices/academySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import AcademyDetails from "./components/academy-details";
import AcademyRegistrationPage from "./components/academy-registration";
import AcademyCheckout from "./components/academy-checkout";
import posterImg from '../../assets/posterImg.jpg'

const AcademyPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const detailsPageId = searchParams[0].get("id");

  const isJoinAcademy = searchParams[0].get("join") === "1";
  const toPayForAcademy = Boolean(searchParams[0].get("payment"));

  const { academies, locationArr } = useAppSelector(
    (state: RootState) => state.academy
  );

  const { selectedSportsStore, selectedVenue } = useAppSelector(
    (state: RootState) => state.academy
  );
  const { selectedCity } = useAppSelector((state: RootState) => state.city);

  useFetchAcademiesQuery(
    {
      city: selectedCity,
      sport: selectedSportsStore ? selectedSportsStore : null,
      venue: selectedVenue.length > 0 ? JSON.stringify(selectedVenue) : null,
      limit: 4,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !!!selectedCity,
    }
  );

  useEffect(() => {
    if (detailsPageId) {
      const foundAcademy = academies.find((i) => i.id === detailsPageId)?.name;
      if (foundAcademy) {
        dispatch(setLocationArr(foundAcademy));
      }
    } else {
      dispatch(resetLocationArr());
    }
  }, [detailsPageId, academies]);

  useEffect(() => {
    if (!isJoinAcademy) {
      dispatch(setSelectedSlots(null));
    }
  }, [isJoinAcademy]);

  return (
    <>
      {selectedCity.length !== 0 ? (
        <div className="h-fit lg:h-[48rem] w-full overflow-hidden">
          {toPayForAcademy ? (
            <AcademyCheckout />
          ) : (
            <div className="flex flex-col px-5 lg:px-20 xl:px-40 mt-8 lg:mt-0 h-full">
              <span className="h-4 lg:h-8 flex items-center mb-2 mt-4 lg:mb-4 lg:mt-4 gap-1 text-[10px] md:text-xs lg:text-sm">
                {locationArr.map((item, index) => (
                  <div key={index}>
                    <span
                      className={`${
                        (
                          locationArr.length === 2
                            ? item === "Home"
                            : item === "Home" || item === "Academy"
                        )
                          ? "text-gray-900 cursor-pointer hover:underline"
                          : "text-gray-500"
                      }`}
                      onClick={() => {
                        if (item === "Home") {
                          navigate("/");
                        } else if (item === "Academy") {
                          navigate("/academy");
                        }
                      }}
                    >
                      {item}
                    </span>
                    {(locationArr.length === 2
                      ? item === "Home"
                      : item === "Home" || item === "Academy") && (
                      <span className="text-gray-500 ml-1">{"/"}</span>
                    )}
                  </div>
                ))}
              </span>

              {!!detailsPageId ? (
                isJoinAcademy ? (
                  <AcademyRegistrationPage academyId={detailsPageId} />
                ) : (
                  <>
                    <AcademyDetails academyId={detailsPageId} />
                  </>
                )
              ) : (
                <div className="h-full lg:h-[125vh] w-full flex flex-col gap-2 mb-20">
                  <div className="flex items-center justify-center w-full h-24">
                    <div className="w-1/2 h-full bg-[#53A53F] rounded-l-xl hidden md:flex flex-col items-start justify-center pl-5 lg:pl-20">
                      <div className="text-lg font-semibold text-gray-50">
                        Host Your Events
                      </div>
                      <div className="w-[340px] text-xs text-gray-50">
                        Engage with the Largest Sports Community and Network
                      </div>
                      <Button
                        variant={"default"}
                        className="rounded-md mt-2 h-6"
                      >
                        Get In Touch
                      </Button>
                    </div>
                    <div
                      className={`w-full md:w-1/2 h-full rounded-r-xl overflow-hidden relative`}
                    >
                      <img
                        src={posterImg}
                        alt="academy"
                        className="w-full h-full object-cover object-center "
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

                  <div className="h-full w-full mt-4">
                    <AcademyList />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AcademyPage;
