import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Room from "./components/Room.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/room", element: <Room/>},
  {path: "*", element: <NotFoundPage />}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
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
  </StrictMode>
);
