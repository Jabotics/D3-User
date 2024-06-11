import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // Main routes
  {
    path: "/",
    lazy: async () => {
      const AppShell = await import("./components/app-shell");
      return { Component: AppShell.default };
    },
    errorElement: <></>,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./pages/home/Home")).default,
        }),
      },
      {
        path: "/login",
        lazy: async () => ({
          Component: (await import("./pages/auth/login")).default,
        }),
      },
      // {
      //   path: "/register",
      //   lazy: async () => ({
      //     Component: (await import("./pages/auth/register")).default,
      //   }),
      // },
      // {
      //   path: "/otp",
      //   lazy: async () => ({
      //     Component: (await import("./pages/auth/otp")).default,
      //   }),
      // },
      {
        path: "/details",
        lazy: async () => ({
          Component: (await import("./pages/details/Details")).default,
        }),
      },
    ],
  },
]);

export default router;
