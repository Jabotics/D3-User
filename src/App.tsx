import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import LoadingSpinner from "./components/loading-spiner";

import router from "./router";

function App() {
  return (
    // <div className="w-full h-screen flex justify-center">
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
    // </div>
  );
}

export default App;
