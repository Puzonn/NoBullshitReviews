import * as React from "react";
import "./index.css";
import "./App.css";
import { createRoot } from "react-dom/client";
import Main from "./pages/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReviewGameInfoPage from "src/pages/ReviewGameInfoPage";
import Sidebar from "src/components/Sidebar";
import Creator from "src/pages/Creator";
import Join from "src/pages/Join";
import OAuth from "src/pages/OAuth";
import AuthProvider from "src/Providers/AuthProvider";

const root = createRoot(document.getElementById("root") as HTMLElement);

const renderWithSidebar = (child) => {
  return (
    <div className="box-border flex flex-col min-h-screen">
      <div className="flex h-full w-full">
        <Sidebar></Sidebar>
        {child}
      </div>
    </div>
  );
};

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={renderWithSidebar(<Main />)} />
        <Route path="/creator" element={renderWithSidebar(<Creator />)} />
        <Route path="/join" element={renderWithSidebar(<Join />)} />
        <Route path="/auth/oauthCallback" element={<OAuth />} />
        <Route
          path="/game/:game"
          element={renderWithSidebar(<ReviewGameInfoPage />)}
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
