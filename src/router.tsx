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
        path: "/login",
        lazy: async () => ({
          Component: (await import("./pages/login")).default,
        }),
      },

      {
        path: "/play",
        lazy: async () => ({
          Component: (await import("./pages/pay_play")).default,
        }),

      },

      {
        path: "/scoreboard",
        lazy: async () => ({
          Component: (await import("./pages/scoreboard")).default,
        }),
      },

      {
        path: "/booking",
        lazy: async () => ({
          Component: (await import("./pages/booking")).default,
        }),
      },

      {
        path: "/academy",
        lazy: async () => ({
          Component: (await import("./pages/academy")).default,
        }),
      },

      {
        path: "/contact",
        lazy: async () => ({
          Component: (await import("./pages/contact")).default,
        }),
      },

      {
        path: "/profile",
        lazy: async () => ({
          Component: (await import("./pages/profile")).default,
        }),
      },

      {
        path: "/terms-of-use",
        lazy: async () => ({
          Component: (await import("./pages/terms")).default,
        }),
      },

      {
        path: "/privacy-policy",
        lazy: async () => ({
          Component: (await import("./pages/privacy-policy")).default,
        }),
      },

      {
        path: "/about",
        lazy: async () => ({
          Component: (await import("./pages/about")).default,
        }),
      },

      {
        path: "/membership",
        lazy: async () => ({
          Component: (await import("./pages/membership")).default,
        }),
      },
      {
        path: "/details",
        lazy: async () => ({
          Component: (await import("./pages/details")).default,
        }),
      },
      {
        path: "/checkout",
        lazy: async () => ({
          Component: (await import("./pages/checkout")).default,
        }),
      },
      {
        path: "/event",
        lazy: async () => ({
          Component: (await import("./pages/event")).default,
        }),
      },
    ],
  },

  // Error routes
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
]);

export default router;
