import { APIEndPoints } from "@/APIEndpoint";
import BlogLayout from "@/components/blogs";
import { RootState } from "@/store";
import {
  setLocationArr,
  useFetchBlogsQuery,
} from "@/store/actions/slices/blogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlogHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading } = useFetchBlogsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { blogs } = useAppSelector((state: RootState) => state.blogs);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(setLocationArr(`All Posts`));
  }, [dispatch]);

  return (
    <BlogLayout>
      <div className="min-h-screen flex flex-col">
        <h1 className="text-2xl">All Blogs</h1>
        <div
          className={`w-full min-flex-1 h-[150vh] mt-10 mb-20 ${
            blogs && blogs.length === 0 && "overflow-hidden"
          }`}
        >
          {!isLoading ? (
            <>
              {
                <div className="flex flex-row flex-wrap">
                  {blogs.map((blog, index) => {
                    return (
                      <div
                        key={index}
                        className="w-1/2 md:w-1/3 lg:w-1/4 h-fit lg:h-[55vh] py-5 pr-10 rounded-md overflow-hidden"
                      >
                        <div className="w-full h-fit lg:h-[55vh] flex flex-col gap-5">
                          <div
                            className="w-full h-1/2 flex-shrink-0 rounded-md overflow-hidden"
                            onClick={() => {
                              navigate(`/blogs/post-id=${blog.id}`);
                              dispatch(setLocationArr(`${blog.title}`));
                            }}
                          >
                            <img
                              src={`${APIEndPoints.BackendURL}/${blog.image}`}
                              alt=""
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <div className="flex flex-col gap-3">
                            <div className="mt-5 text-xs">
                              <p
                                className="float-right px-10 py-1 h-5 lg:h-7 flex items-center justify-center ml-5 mb-5 mt-3 rounded-md bg-black lg:bg-[#54a63f] cursor-pointer text-white"
                                onClick={() => {
                                  navigate(`/blogs/post-id=${blog.id}`);
                                  dispatch(setLocationArr(`${blog.title}`));
                                }}
                              >
                                View
                              </p>
                              <h1 className="text-sm lg:text-lg font-medium">
                                {blog.title}
                              </h1>
                            </div>
                            <p className="text-xs md:text-sm line-clamp-3">{blog.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              }
            </>
          ) : (
            <div className=" flex flex-row flex-wrap">
              {Array.from({ length: 6 }).map((_, index) => {
                return (
                  <div key={index} className="w-1/4 h-[55vh] py-5 pr-10">
                    <div className="bg-gray-100 w-full h-full rounded-md"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogHomePage;
