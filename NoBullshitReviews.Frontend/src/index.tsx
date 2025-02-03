import * as React from "react";
import "./index.css";
import "./App.css";
import { createRoot } from "react-dom/client";
import Main from "./pages/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReviewGameInfoPage from "src/pages/ReviewGameInfoPage";
import Sidebar from "src/components/Sidebar";
import Creator from "src/pages/creator/Creator";
import Join from "src/pages/Join";
import OAuth from "src/pages/OAuth";
import AuthProvider from "src/Providers/AuthProvider";
import GameReviewCreator from "src/pages/creator/GameReviewCreator";
import MovieReviewCreator from "src/pages/creator/MovieReviewCreator";
import Games from "./pages/Games";
import GameNewsCreator from "./pages/creator/GameNewsCreator";

const root = createRoot(document.getElementById("root") as HTMLElement);

const renderWithSidebar = (child) => {
  return (
    <div className="box-border flex flex-col min-h-screen">
      <div className="flex h-screen w-full">
        <Sidebar />
        <div className="sm:ml-24 flex-1">{child}</div>
      </div>
    </div>
  );
};

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={renderWithSidebar(<Main />)} />
        <Route index path="/games" element={renderWithSidebar(<Games />)} />
        <Route path="/creator/" element={renderWithSidebar(<Creator />)} />
        <Route
          path="/creator/news/game"
          element={renderWithSidebar(<GameNewsCreator />)}
        />
        <Route
          path="/creator/review/movie"
          element={renderWithSidebar(<MovieReviewCreator />)}
        />
        <Route
          path="/creator/review/game"
          element={renderWithSidebar(<GameReviewCreator />)}
        />
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
