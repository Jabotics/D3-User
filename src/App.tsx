import { Suspense } from "react";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { RouterProvider } from "react-router-dom";
import router from './router'
import LoadingSpinner from "./components/loading-spiner.tsx";
function App() {
  return (
    <div className="w-full h-screen flex justify-center">
      <ThemeProvider>
        <Suspense fallback={<LoadingSpinner />}  >
      <RouterProvider router={router} />
    </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default App;
