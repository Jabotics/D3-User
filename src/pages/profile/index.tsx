import LeftPanel from "@/components/profile/LeftPanel";

const Profile = () => {
  return (
    <div className="bg-[#f3f4f5]">
      <div className="flex items-center justify-center gap-4 mt-24 mb-16">
        <LeftPanel />
        <div className="w-[1054px] h-[554px] bg-blue-500">Right Panel</div>
      </div>
    </div>
  );
};

export default Profile;
