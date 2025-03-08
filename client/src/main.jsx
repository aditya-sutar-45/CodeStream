import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Room from "./components/Room.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ForgotPasswordForm from "./components/Home/Auth/ForgotPasswordForm.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/room", element: <Room /> },
  { path: "/forgot-password", element: <ForgotPasswordForm /> },
  {
    element: <PrivateRoute />, // Wrap protected routes
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Theme
        appearance="dark"
        accentColor="purple"
        radius="medium"
        scaling="100%"
        panelBackground="translucent"
        grayColor="slate"
      >
        <RouterProvider router={router} />
      </Theme>
    </AuthProvider>
  </StrictMode>
);
