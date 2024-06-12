import { createBrowserRouter } from "react-router-dom";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";
import MaintenanceError from "./pages/errors/maintenance-error";

const router = createBrowserRouter([
  // Main routes
  {
    path: "/",
    lazy: async () => {
      const AppShell = await import("./components/app-shell");
      return { Component: AppShell.default };
    },
    errorElement: <GeneralError />,
    children: [

      {
        index: true,
        lazy: async () => ({
          Component: (await import("./pages/home")).default,
        }),
      },

      {
        path: "login",
        lazy: async () => ({
          Component: (await import("./pages/login")).default,
        }),
      },

      {
        path: "/pay_play",
        lazy: async () => ({
          Component: (await import("./pages/pay_play")).default,
        }),
      },

      {
        path: "/booking",
        lazy: async () => ({
          Component: (await import("./pages/booking")).default,
        })
      },

      {
        path: "/details",
        lazy: async () => ({
          Component: (await import("./pages/details")).default,
        }),
      },

      {
        path: "profile",
        lazy: async () => ({
          Component: (await import("./pages/profile")).default,
        }),
      },

      {
        path: "contact",
        lazy: async () => ({
          Component: (await import("./pages/contact")).default,
        }),
      },
      
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
]);

export default router;
