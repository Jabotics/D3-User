// import { APIEndPoints } from "@/APIEndpoint";
import { APIEndPoints } from "@/APIEndpoint";
import BlogLayout from "@/components/blogs";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import {
  setLocationArr,
  useFetchBlogsQuery,
} from "@/store/actions/slices/blogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useFetchBlogsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
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
            <p className="text-xs text-[#54a63f] ml-5 mb-1">
              Read All the important measures to be taken
            </p>
            <div
              className="w-80 bg-[#54a63fce] hover:bg-[#54a63f] text-gray-50 h-16 rounded-3xl shadow-xl shadow-gray-500/70 flex items-center justify-between text-xl font-medium px-5 cursor-pointer transition-transform transform hover:scale-105 active:scale-95 hover:shadow-2xl active:shadow-lg"
              onClick={() => {
                navigate("/blogs/all-posts");
                dispatch(setLocationArr(`All Posts`));
              }}
            >
              <span>All Blogs</span> <FaArrowRightLong />
            </div>
          </div>
        </div>

        <h1 className={`mt-10 text-2xl ${blogs.length === 0 && "hidden"}`}>
          Featured blogs
        </h1>

        <div
          className={`w-full flex flex-row justify-start gap-5 mt-5 mb-10 ${
            blogs.length === 0 && "hidden"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-1/2 bg-gray-100 rounded-md h-80 "></div>
              <div className="w-1/2 bg-gray-100 rounded-md h-80 "></div>
            </>
          ) : (
            blogs.slice(0, 3).map((blog, index) => {
              return (
                <div key={index} className="w-1/3 group">
                  <div
                    className=" bg-gray-100 rounded-md h-80 cursor-pointer overflow-hidden"
                    onClick={() => {
                      navigate(`/blogs/post-id=${blog.id}`);
                      dispatch(setLocationArr(`${blog.title}`));
                    }}
                  >
                    <img
                      src={`${APIEndPoints.BackendURL}/${blog?.image}`}
                      alt=""
                      className={`w-full object-cover object-center grayscale-[80%] group-hover:grayscale-0 h-full`}
                    />
                  </div>
                  <div className="mt-5 text-xs">
                    <p
                      className="float-right px-10 py-1 h-7 mt-2 flex items-center justify-center ml-5 mb-5 rounded-md bg-[#54a63f] cursor-pointer text-white"
                      onClick={() => {
                        navigate(`/blogs/post-id=${blog.id}`);
                        dispatch(setLocationArr(`${blog.title}`));
                      }}
                    >
                      View
                    </p>
                    <h1 className="text-xl mt-5 font-medium">{blog.title}</h1>
                  </div>
                  <p className=" mt-5 line-clamp-3">{blog.description}</p>
                </div>
              );
            })
          )}
        </div>

        <div
          className={`mb-10 mt-20 w-full h-fit flex items-center justify-center ${
            blogs.length === 0 && "hidden"
          }`}
        >
          <div
            className="w-40 bg-[#54a63fce] hover:bg-[#54a63f] text-gray-50 h-8 rounded-3xl shadow-xl shadow-gray-500/70 flex items-center justify-center font-medium px-5 cursor-pointer transition-transform transform hover:scale-105 active:scale-95 hover:shadow-2xl active:shadow-lg"
            onClick={() => {
              navigate("/blogs/all-posts");
              dispatch(setLocationArr(`All Posts`));
            }}
          >
            View All
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-24 mt-40">
          <div className="w-1/2 h-full bg-[#53A53F] rounded-l-md hidden md:flex flex-col items-start justify-center pl-5 lg:pl-20">
            <div className="text-lg font-semibold text-gray-50">
              Host Your Events
            </div>
            <div className="w-[340px] text-xs text-gray-50">
              Engage with the Largest Sports Community and Network
            </div>
            <Button variant={"default"} className="rounded-md mt-2 h-6">
              Get In Touch
            </Button>
          </div>
          <div
            className={`w-full md:w-1/2 h-full rounded-r-md overflow-hidden relative`}
          >
            <img
              src="/images/academy.jpeg"
              alt="academy"
              className="w-full h-full object-cover object-top "
            />

            <div className="absolute top-4 left-4 md:hidden text-xl font-semibold text-gray-200 bg-gray-500/25">
              Host Your Events
            </div>
            <div className="absolute top-12 left-4 md:hidden max-w-[340px] text-xs text-gray-100 bg-gray-500/25">
              Engage with the Largest Sports Community and Network
            </div>
            <Button
              variant={"default"}
              className="absolute bottom-4 left-4 md:hidden rounded-md mt-3 h-5 text-xs"
            >
              Get In Touch
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-48 mt-5 mb-5">
          <div className={`w-full h-full rounded-xl overflow-hidden relative`}>
            <img
              src="/images/browse-grounds.jpg"
              alt="academy"
              className="w-full h-full object-cover object-center "
            />

            <div className="absolute top-4 left-4 ml-16">
              <Button
                variant={"default"}
                className="rounded-md mt-3 h-10 text-base bg-gray-100 text-gray-900 hover:bg-gray-300 hover:text-gray-500"
                onClick={() => {
                  navigate("/play");
                }}
              >
                Browse All Grounds
              </Button>

              <p className="text-lg tracking-wide font-semibold text-gray-200">{`Pay & Play / Academies / Memberships`}</p>
            </div>
          </div>
        </div>
      </section>
    </BlogLayout>
  );
};

export default BlogPage;
