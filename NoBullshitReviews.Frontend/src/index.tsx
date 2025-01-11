import * as React from "react";
import "./index.css";
import "./App.css";
import { createRoot } from "react-dom/client";
import Main from "./pages/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReviewGameInfoPage from "src/pages/ReviewGameInfoPage";
import Sidebar from "src/components/Sidebar";

const root = createRoot(document.getElementById("root") as HTMLElement);

const renderWithSidebar = (child) => {
  return (
    <div className="box-border flex flex-col h-screen">
      <div className="flex h-full">
        <Sidebar></Sidebar>
        {child}
      </div>
    </div>
  );
};

root.render(
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<Main />} />
      <Route
        path="/game/:game"
        element={renderWithSidebar(<ReviewGameInfoPage />)}
      />
    </Routes>
  </BrowserRouter>
);
