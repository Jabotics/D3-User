import { Suspense, useState } from "react"
import "./App.css"
import LoadingSpinner from "./components/loading-spiner"
import { RouterProvider } from 'react-router-dom';

import router from './router';


const App = () => {

  return (
    <Suspense fallback={<LoadingSpinner />}  >
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
