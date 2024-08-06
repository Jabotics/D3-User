const CybersecurityGuidelines = () => {
  return (
    <div className="min-h-screen w-screen px-5 lg:px-20 xl:px-40 mt-8 lg:mt-0">
      <div className="h-4 lg:h-8 flex items-center mt-4 lg:mt-[10px] gap-1 text-[10px] md:text-xs lg:text-sm">
        {["Home", "Stay Secure Online - Cybersecurity Guidelines"].map(
          (item, index) => (
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
          )
        )}
      </div>

      <h1 className="text-4xl my-10">
        Stay Secure Online - Cybersecurity Guidelines
      </h1>
      <div className="w-full h-px bg-gray-300 mb-10"></div>

      <div className="w-full h-[65vh] bg-black rounded-md overflow-hidden relative">
        <img
          src="/images/security-online.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-gray-700/60"></div>
      </div>

      <p className="mt-10 pr-20">
        Keeping your private information private is increasingly important as
        our digital world expands. There are steps you can take to protect the
        things you want to stay private – and some of them take but a few
        clicks.
      </p>

      <p className="pr-20 mt-5">
        Some cybersecurity steps or precautions to help keep yourself secure
        online.
      </p>
    </div>
  );
};

export default CybersecurityGuidelines;
