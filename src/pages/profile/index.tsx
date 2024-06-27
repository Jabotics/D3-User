import LeftPanel from "@/components/profile/LeftPanel";
import RightPanel from "@/components/profile/RightPanel";

const Profile = () => {
  return (
    <div className="bg-[#f3f4f5] w-full">
      <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-8 mt-24 mb-16 px-8">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  );
};

export default Profile;
