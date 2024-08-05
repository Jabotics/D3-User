// import { APIEndPoints } from "@/APIEndpoint";
import BlogLayout from "@/components/blogs";
import { RootState } from "@/store";
import { useFetchBlogsQuery } from "@/store/actions/slices/blogSlice";
import { useAppSelector } from "@/store/hooks";

import { FaArrowRightLong } from "react-icons/fa6";

const BlogPage = () => {
  useFetchBlogsQuery({});
  const { blogs } = useAppSelector((state: RootState) => state.blogs);

  return (
    <BlogLayout>
      <section className="min-h-screen w-full">
        <div className="w-full h-[65vh] bg-transparent relative rounded-md overflow-hidden">
          <div className="w-2/3 h-64 absolute top-0 left-0">
            <div className="w-full h-32 flex flex-row">
              <div className="bg-white w-1/2 h-32 rounded-br-2xl flex items-center justify-center">
                <div className="w-[95%] h-[90%] text-5xl text-[#54a63f] font-medium tracking-wider rounded-2xl border-2 border-[#54a63f] flex items-center justify-center">
                  D3 Blogs
                </div>
              </div>
              <div
                className="bg-transparent w-20 h-32 rounded-br-2xl"
                id="curved-corner-topleft"
              ></div>
            </div>
            <div className="w-full h-32 flex flex-row">
              <div
                className="bg-transparent w-20 h-32 rounded-br-2xl"
                id="curved-corner-topleft"
              ></div>
            </div>
          </div>

          <img
            src={`/images/d3-blog-banner.jpg`}
            alt=""
            className="w-full h-full object-cover object-top"
          />

          <div className="absolute bottom-16 right-16 flex flex-col">
            <p className="text-xs text-white ml-5 mb-1">Read All the important measures to be taken</p>
            <div
              className="w-80 bg-white/90 h-16 rounded-3xl shadow-xl shadow-gray-500/70 flex items-center justify-between text-xl font-medium px-5 cursor-pointer 
    transition-transform transform hover:scale-105 active:scale-95 hover:shadow-2xl active:shadow-lg"
            >
              <span>All Blogs</span> <FaArrowRightLong />
            </div>
          </div>
        </div>
      </section>
    </BlogLayout>
  );
};

export default BlogPage;
