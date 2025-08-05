import './App.css';
import axios from "axios";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProtectedRoute } from "./ProtectedRoute";

import { Header } from "./Header";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { MembersShow } from "./MembersShow";
import { MembersIndex } from "./MembersIndex";
import { EligibilityChecks } from "./EligibilityChecks";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3001";

function Layout({ isLoggedIn, setIsLoggedIn }) {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet context={{ setIsLoggedIn }} />
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("email"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("email"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const router = createBrowserRouter([
    {
      element: <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />,
      children: [
        { path: "/", element: <HomePage /> },
        {
          element: <ProtectedRoute isLoggedIn={isLoggedIn} />,
          children: [
            { path: "/members", element: <MembersIndex /> },
            { path: "/members/:id", element: <MembersShow /> },
            { path: "/eligibilitycheck", element: <EligibilityChecks />}
          ],
        },
        { path: "/login", element: <LoginPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
