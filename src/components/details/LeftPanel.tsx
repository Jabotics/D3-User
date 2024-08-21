// import { APIEndPoints } from "@/APIEndpoint";
import { IGround } from "@/interface/data";
import { useEffect, useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
// import { responsive } from "@/lib/utils";

// import Carousel from "react-multi-carousel";
// import venueImg from "../../assets/venueImg.jpg";

const getEmbedUrl = (url: string): string => {
  switch (true) {
    case url.includes("youtube.com") || url.includes("youtu.be"):
      if (url.includes("embed")) {
        // Already an embed URL
        return `${
          url.split("?")[0]
        }?rel=0&modestbranding=1&controls=1&start=0&end=600&loop=1`;
      }
      // Extract video ID from regular YouTube URLs
      // eslint-disable-next-line no-case-declarations
      const videoId = url.split("v=")[1] || url.split("youtu.be/")[1];
      if (!videoId) {
        return "";
      }
      // Adjust URL to be an embed URL with parameters
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&start=0&end=600&loop=1`;

    case url.includes("drive.google.com"):
      // Extract Google Drive file ID
      // eslint-disable-next-line no-case-declarations
      const fileId = url.match(/\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/);
      if (fileId && fileId[1]) {
        return `https://drive.google.com/file/d/${fileId[1]}/preview`;
      }
      return "";

    default:
      return url; // Return original URL for unsupported types
  }
};

const LeftPanel = ({ groundDetails }: { groundDetails: IGround }) => {
  const [hasSelectVideo, setHasSelectVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    if (groundDetails) {
      if (groundDetails.images !== undefined) {
        setSelectedImg(groundDetails.images[0]);
      }

      if (groundDetails.video !== undefined) {
        const refactoredVideoUrl = getEmbedUrl(groundDetails.video);
        setVideoUrl(refactoredVideoUrl);
      }
    }
  }, [groundDetails]);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col-reverse lg:flex-row gap-1">
      <div className="w-full lg:w-12 h-full flex flex-row lg:flex-col items-start gap-2 overflow-x-hidden overflow-y-auto scroll-nobg">
        {groundDetails?.images.length > 0 ? (
          groundDetails?.images?.slice(0, 2).map((image, index) => {
            return (
              <div
                key={`START-${index}`}
                className={`w-10 h-10 mt-1 overflow-hidden bg-gray-100 ${
                  selectedImg === image && "border-[3px] border-[#53a53f]"
                } rounded-lg shrink-0 cursor-pointer`}
                onClick={() => {
                  setHasSelectVideo(false);
                  setSelectedImg(image);
                }}
              >
                <img
                  src={`${image}`}
                  alt="left panel image"
                  className="w-10 h-10 bg-cover bg-center"
                />
              </div>
            );
          })
        ) : (
          <div className="w-10 h-10 bg-gray-200"></div>
        )}

        {groundDetails && groundDetails.video?.length > 0 ? (
          <div
            className="w-10 h-10 bg-gray-100 flex items-center justify-center border-2 border-gray-300 text-gray-700 rounded-md cursor-pointer"
            onClick={() => {
              setHasSelectVideo(true);
              setSelectedImg(null);
            }}
          >
            <FaRegPlayCircle size={20} />
          </div>
        ) : (
          <></>
        )}

        {groundDetails &&
          groundDetails.images?.length > 0 &&
          groundDetails.images
            ?.slice(2, groundDetails.images.length)
            .map((image, index) => {
              return (
                <div
                  key={`END-${index}`}
                  className={`w-10 h-10 mt-1 overflow-hidden bg-gray-100 ${
                    selectedImg === image && "border-[3px] border-[#53a53f]"
                  } rounded-lg shrink-0 cursor-pointer`}
                  onClick={() => {
                    setHasSelectVideo(false);
                    setSelectedImg(image);
                  }}
                >
                  <img
                    src={`${image}`}
                    alt=""
                    className="w-full h-full object-cover rounded-md cursor-pointer"
                  />
                </div>
              );
            })}
      </div>
      <div
        className="lg:flex-1 h-60 sm:h-80 md:h-96 lg:h-[85%] rounded-2xl bg-black"
        style={{
          backgroundImage: `url(${selectedImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {groundDetails && groundDetails.video && hasSelectVideo && (
          <iframe
            width="100%"
            height="100%"
            className="rounded-2xl"
            src={`${videoUrl}`}
            title="YouTube Video Player"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      {/* <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={false}
        infinite={false}
        autoPlay={true}
      >
        {groundDetails?.images.length > 0 ? (
          groundDetails?.images?.map((image, index) => {
            return (
              <div key={index}>
                <img
                  src={`${APIEndPoints.BackendURL}/${image}`}
                  alt="left panel image"
                />
              </div>
            );
          })
        ) : (
          <div>
            <img src={venueImg} alt="left panel image" />
          </div>
        )}
      </Carousel> */}
    </div>
  );
};

export default LeftPanel;
