import TermsSection from "@/components/terms";
import { useNavigate } from "react-router-dom";

const locationArr = ["Home", "Terms"];
const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex flex-col px-5 lg:px-20 2xl:px-36 overflow-hidden">
      <span className="h-4 lg:h-8 flex items-center mt-12 lg:mt-3 gap-1 text-[10px] md:text-xs lg:text-sm lg:ml-4">
        {locationArr.map((item, index) => (
          <div key={index}>
            <span
              className={`${
                (
                  locationArr.length === 2
                    ? item === "Home"
                    : item === "Home" || item === "Play"
                )
                  ? "text-[#54a63f] cursor-pointer hover:underline font-semibold"
                  : "text-[#a7d19d] font-medium"
              }`}
              onClick={() => {
                if (item === "Home") {
                  navigate("/");
                } else if (item === "Play") {
                  navigate("/play");
                }
              }}
            >
              {item}
            </span>
            {(locationArr.length === 2
              ? item === "Home"
              : item === "Home" || item === "Play") && (
              <span className="text-[#a7d19d] ml-1">{"/"}</span>
            )}
          </div>
        ))}
      </span>
      <section>
        <TermsSection />
      </section>
    </div>
  );
};

export default TermsPage;
