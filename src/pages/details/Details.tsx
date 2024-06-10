import Accordion from "@/components/details/DetailsAccordion";
import GroundCard from "@/components/details/GroundCard";
import LeftPanel from "@/components/details/LeftPanel"
import RelatedGrounds from "@/components/details/RelatedGrounds";
import RightPanel from "@/components/details/RightPanel";
import "react-multi-carousel/lib/styles.css";

const items = [
    {
        title: 'Sports Available',
        content: ["Cricket", "Football"],
    }
];

const Details = () => {
    return (
        <div>
            <div className="flex flex-col mt-20 gap-16">
                <div className="flex justify-center items-center xl:gap-16 lg:gap-6 gap-5 flex-col lg:flex-row md:items-center">
                    <div className="">
                        <LeftPanel />
                    </div>
                    <div>
                        <RightPanel />
                    </div>
                </div>
                <div className="flex justify-center flex-col items-center gap-4 mt-44 md:mt-0">
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
                <RelatedGrounds />
            </div>
        </div>
    )
}

export default Details