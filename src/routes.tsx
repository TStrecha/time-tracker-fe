import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PasswordResetPage from "./pages/auth/PasswordResetPage";
import AuthPageLayout from "./pages/auth/AuthPageLayout";
import {SettingsPage} from "./pages/app/SettingsPage.tsx";
import {PageHeading} from "./components/ui/PageHeading.tsx";
import {AuthorizedPage} from "./AuthorizedPage.tsx";
import {AppLayout} from "./pages/app/AppLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPageLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "password-reset",
        element: <PasswordResetPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthorizedPage><AppLayout /></AuthorizedPage>,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", element: <PageHeading>Přehled</PageHeading> },
      { path: "/settings", element: <Navigate to={'/settings/details'}/> },
      { path: "/settings/:section?/:id?", element: <SettingsPage /> },
    ],
  },
]);

export default router;
