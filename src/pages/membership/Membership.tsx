import MembershipFormContainer from "@/components/membership/MembershipFormContainer"
import PosterContainer from "@/components/membership/PosterContainer"


const Membership = () => {
    return (
        <div className="flex flex-col items-center w-full p-8 gap-4">
            <PosterContainer />
            <div className="flex flex-row justify-center items-center">
                <p className="text-[20px] font-bold">Step into the World of Sports and Fitness at the Comfort of your Home.</p>
            </div>
            <MembershipFormContainer />
        </div>
    )
}

export default Membership