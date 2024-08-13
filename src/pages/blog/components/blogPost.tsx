import { Navigate, useNavigate, useParams } from "react-router-dom";
import BlogLayout from "@/components/blogs";
import { APIEndPoints } from "@/APIEndpoint";
import {
  setLocationArr,
  useFetchBlogsQuery,
  useFetchPopularBlogsQuery,
} from "@/store/actions/slices/blogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { resetLocationArr } from "@/store/actions/slices/groundSlice";

const BlogPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const blogpostId = postId?.split("=")[1];
  const { isLoading, isError } = useFetchBlogsQuery(
    {
      id: blogpostId,
    },
    { refetchOnMountOrArgChange: true }
  );

  const popularBlogsFetch = useFetchPopularBlogsQuery();
  const { blogs, popularBlogs } = useAppSelector(
    (state: RootState) => state.blogs
  );

  const [popularIndex, setPopularIndex] = useState<1 | 2 | 3>(1);

  const handleDotClick = (index: 1 | 2 | 3) => {
    setPopularIndex(index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(resetLocationArr());
    if (blogs[0]?.title !== undefined && !isLoading) {
      dispatch(setLocationArr(`${blogs[0]?.title}`));
    }
  }, [blogs, dispatch, isLoading]);

  useEffect(() => {
    popularBlogsFetch.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popularIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPopularIndex((prevIndex) => {
        const nextIndex = ((prevIndex % 3) + 1) as 1 | 2 | 3;
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!blogpostId || isError) {
    return <Navigate to="/blogs" replace={true} />;
  }

  return (
    <BlogLayout>
      <section>
        <div className="w-full flex items-start gap-3">
          <div className="w-3/5">
            <h1
              className={`${
                isLoading ? "bg-gray-100 w-full h-28" : ""
              } text-5xl font-bold leading-tight`}
            >
              {!isLoading ? blogs[0]?.title : null}
            </h1>
          </div>
          <div></div>
        </div>
      </section>

      <div
        className={`${
          isLoading ? "bg-gray-100 w-full h-5" : ""
        } w-full flex items-center gap-5 mt-16 text-xs`}
      >
        <p className="uppercase font-bold text-[#54a63f] tracking-wider w-fit h-fit">
          {!isLoading ? blogs[0]?.createdAt : null}
        </p>
        <div className="h-[2px] flex-1 bg-[#93d18371]"></div>
      </div>

      <div className="my-10 w-full flex items-start gap-10">
        <div className="w-96 bg-gray-100 h-40 mt-5 rounded-md flex flex-col py-3">
          <div className="w-full flex items-center justify-between px-3">
            <h2 className="font-medium">Popular Posts</h2>
            <div className="flex gap-1 flex-row">
              {Array.from({ length: 3 }).map((_, index) => {
                const toSetIndex = index + 1;
                return (
                  <p
                    className={`w-2 h-2 rounded-full ${
                      popularIndex === toSetIndex
                        ? "bg-[#54a63f]"
                        : "bg-[#93d18371]"
                    } cursor-pointer`}
                    key={index}
                    onClick={() => handleDotClick(toSetIndex as 1 | 2 | 3)}
                  ></p>
                );
              })}
            </div>
          </div>
          {popularBlogs && popularBlogs.length > 0 ? (
            <div className="flex flex-col fade-in-30 px-3 py-5">
              <p
                className="text-lg font-semibold line-clamp-2 hover:underline cursor-pointer"
                onClick={() => {
                  navigate(
                    `/blogs/post-id=${popularBlogs[popularIndex - 1]?.id}`
                  );
                  dispatch(
                    setLocationArr(`${popularBlogs[popularIndex - 1]?.title}`)
                  );
                }}
              >
                {popularBlogs[popularIndex - 1]?.title}
              </p>
              <p className="text-sm mt-5">
                {popularBlogs[popularIndex - 1]?.createdAt}
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex-1 pr-10 ">
          <p className={`leading-loose ${isLoading ? "bg-gray-100 h-20" : ""}`}>
            {!isLoading ? blogs[0]?.description : null}
          </p>

          <div className="w-full flex flex-col mt-10">
            <p className="mb-5 font-bold tracking-wide">
              {blogs[0]?.details[0]?.sub_title}
            </p>
            <p className={`${isLoading ? "bg-gray-100 h-20" : ""}`}>
              {!isLoading ? blogs[0]?.details[0]?.description : null}
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-gray-100 h-[65vh] w-full"></div>
      ) : (
        <img
          src={`${APIEndPoints.BackendURL}/${blogs[0]?.image}`}
          alt=""
          className="h-auto max-h-[65vh] w-full object-cover object-top"
        />
      )}

      {/* OTHER PARAGRAPHS */}
      {blogs[0]?.details && blogs[0]?.details?.length > 1 ? (
        <div
          className={`mb-10 w-full flex items-start gap-10 ${
            blogs[0]?.details?.length === 1 && "hidden"
          }`}
        >

          <div className="flex-1 pr-10 ">
            <div className="w-full flex flex-col mt-10">
              {blogs[0]?.details
                ?.slice(1, blogs[0].details.length)
                ?.map((item, index) => {
                  return (
                    <div key={index} className="mb-5">
                      <p className="mb-5 font-bold tracking-wide">
                        {item?.sub_title}
                      </p>
                      <p className={`${isLoading ? "bg-gray-100 h-20" : ""}`}>
                        {!isLoading ? item?.description : null}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : null}

      {/* QUOTATION */}
      <div className="my-40 relative border-t-0 border-[#93d18371]">
        <img
          src={"/images/quote.svg"}
          className="testi-icon absolute -top-4 left-10 w-16"
          alt="icon"
        />

        <div className="w-full flex justify-end">
          <div className="w-[92%] h-5 border-r-2 border-t-2 rounded-md border-[#93d18371]"></div>
        </div>
        <div className="w-full flex justify-end mt-5">
          <p className="w-[90%] text-2xl font-semibold tracking-wide text-[#54a63f]">
            {!isLoading ? blogs[0]?.quotation : null}
          </p>
        </div>

        <div className=" mt-5 ml-10 mr-5 rounded-md h-5 border-l-2 border-b-2 border-[#93d18371]"></div>
      </div>
    </BlogLayout>
  );
};

export default BlogPostPage;
