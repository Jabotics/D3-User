const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen w-screen px-5 lg:px-20 xl:px-40 mt-8 lg:mt-0">
      <div className="h-4 lg:h-8 flex items-center mb-2 mt-4 lg:mb-4 lg:mt-[10px] gap-1 text-[10px] md:text-xs lg:text-sm">
        {["Home", "Privacy"].map((item, index) => {
          return (
            <div key={index}>
              <span
                className={`${
                  item === "Home"
                    ? "text-[#54a63f] cursor-pointer hover:underline font-semibold"
                    : "text-[#a7d19d] font-medium"
                }`}
              >
                {item}
              </span>
              {item === "Home" ? (
                <span className="text-[#a7d19d] ml-1">/</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
