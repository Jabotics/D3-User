const SelectSport = () => {
  return (
    <div className="flex flex-col gap-4 p-4 ">
      <span className="inline-block text-sm font-semibold">
        Sports Supported
      </span>
      <div className="flex flex-row w-full gap-2 flex-wrap justify-start">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-row justify-center bg-[#88f56d7e] rounded-3xl py-1 text-teal-800"
          >
            <span className="text-xs px-4">Box Football</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectSport;
