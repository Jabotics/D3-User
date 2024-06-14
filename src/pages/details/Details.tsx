import "react-multi-carousel/lib/styles.css";
import LeftPanel from "@/components/details/LeftPanel"
import RightPanel from "@/components/details/RightPanel";
import Accordion from "@/components/details/DetailsAccordion";
import RelatedGrounds from "@/components/details/RelatedGrounds";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IGround } from "@/interface/data";

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
    const [groundDetails, setGroundDetails] = useState<IGround>()
    const fetchGroundDetails = async () => {
        try {
            const response = await fetch(
                `http://192.168.29.16:5050/api/grounds/?id=${id}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch cities");
            }
            const data = await response.json();
            setGroundDetails(data.data.grounds[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchGroundDetails();
    }, []);
    return (
        <div>
            <div className="flex flex-col mt-20 gap-16">
                <div className="flex justify-center items-center xl:gap-16 lg:gap-6 gap-5 flex-col lg:flex-row md:items-center">
                    <div className="">
                        <LeftPanel groundDetails={groundDetails as IGround} />
                    </div>
                    <div>
                        <RightPanel groundDetails={groundDetails as IGround} />
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