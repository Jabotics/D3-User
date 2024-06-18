import "react-multi-carousel/lib/styles.css";
import LeftPanel from "@/components/details/LeftPanel"
import RightPanel from "@/components/details/RightPanel";
import Accordion from "@/components/details/DetailsAccordion";
import RelatedGrounds from "@/components/details/RelatedGrounds";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { IGround } from "@/interface/data";
import { useGetGroundQuery } from "@/store/actions/slices/groundSlice";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

const items = [
  {
    title: 'Sports Available',
    content: ["Cricket", "Football"],
  }
];


const Details = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id")

  const getGround = useGetGroundQuery({ id: id })
  const groundDetails = useAppSelector((state: RootState) => state.ground.grounds)
  console.log(groundDetails);
  useEffect(() => {
    getGround.refetch()
  }, [id]);
  return (
    <div>
      <div className="flex flex-col mt-20 gap-16">
        <div className="flex justify-center items-center xl:gap-16 lg:gap-6 gap-5 flex-col lg:flex-row md:items-center">
          <div className="">
            <LeftPanel groundDetails={groundDetails[0] as IGround} />
          </div>
          <div>
            <RightPanel groundDetails={groundDetails[0] as IGround} />
          </div>
        </div>
        <div className="flex justify-center flex-col items-center gap-4 mt-44 md:mt-16 lg:mt-2">
          <div>
            <Accordion items={items} />
          </div>
          <div>
            <Accordion items={items} />
          </div>
          <div>
            <Accordion items={items} />
          </div>
          <div>
            <Accordion items={items} />
          </div>
          <div>
            <Accordion items={items} />
          </div>
        </div>
        <hr />
        <div className="mb-10">
          <RelatedGrounds />
        </div>
      </div>
    </div>
  )
}

export default Details
