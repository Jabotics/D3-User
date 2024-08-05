import React from "react";
import BlogNavbar from "./blog-navbar";
import { useNavigate } from "react-router-dom";
import { Footer } from "../shared/footer";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const locationArr = ["Home", "Post"];

  return (
    <>
      <BlogNavbar />
      <div className="container mt-10">
        <span className="h-4 lg:h-8 flex items-center mt-12 lg:mt-3 gap-1 text-[10px] md:text-xs lg:text-sm lg:ml-4 mb-6">
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
                    navigate("/blogs");
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
        <article className="ml-0 lg:ml-4">{children}</article>
      </div>
      <Footer />
    </>
  );
};

export default BlogLayout;
