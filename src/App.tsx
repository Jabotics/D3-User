import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import LoadingSpinner from "./components/loading-spiner";
function App() {
  return (
    <div className="w-full h-screen flex justify-center pt-11">
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;
