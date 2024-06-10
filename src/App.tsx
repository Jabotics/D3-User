import { Suspense, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import LoadingSpinner from "./components/loading-spiner";
import router from "./router";
import { RootState } from "./store";
import { useAppSelector } from "./store/hooks";

function App() {
  const [toPlayVideo, setToPlayVideo] = useState(true);
  const { hasToken } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const isNewUser = !hasToken; 

    if (isNewUser) {
      const setVideoPlayer = setTimeout(() => {
        setToPlayVideo(false);
      }, 49000);

      return () => clearTimeout(setVideoPlayer);
    }
  }, [hasToken]);

  useEffect(() => {
    document.body.style.overflow = toPlayVideo ? "auto" : "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";

    return () => {
      document.body.style.overflow = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, [toPlayVideo]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {toPlayVideo ? (
        <div className="absolute inset-0 overflow-hidden w-full h-full">
          <div
            className="absolute top-10 right-10 z-50 bg-stone-600 opacity-55 hover:opacity-100 cursor-pointer text-white w-12 h-12 text-4xl flex items-center justify-center rotate-45 rounded-lg"
            onClick={() => setToPlayVideo(false)}
          >
            +
          </div>
          <video
            src="/videos/video.mp4"
            autoPlay
            muted
            loop
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </Suspense>
  );
}

export default App;
