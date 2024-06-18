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
        path: "login",
        lazy: async () => ({
          Component: (await import("./pages/login")).default,
        }),
      },

      {
        path: "/pay_play",
        lazy: async () => ({
          Component: (await import("./pages/pay_play/PayPlay")).default,
        }),
      },

      {
        path: "/booking",
        lazy: async () => ({
          Component: (await import("./pages/booking/Booking")).default,
        })
      },

      {
        path: "/details",
        lazy: async () => ({
          Component: (await import("./pages/details/Details")).default,
        }),
      },

      {
        path: "profile",
        lazy: async () => ({
          Component: (await import("./pages/profile/Profile")).default,
        }),
      },
      {
        path: "/membership",
        lazy: async () => ({
          Component: (await import("./pages/membership/Membership")).default,
        }),
      },
    ],
  },
]);

export default router;
