import "react-multi-carousel/lib/styles.css";
import LeftPanel from "@/components/details/LeftPanel"
import RightPanel from "@/components/details/RightPanel";
import Accordion from "@/components/details/DetailsAccordion";
import RelatedGrounds from "@/components/details/RelatedGrounds";

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