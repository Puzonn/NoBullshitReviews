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

const RenderWithSidebar = (child) => {
  return (
    <div className="box-border flex flex-col h-screen">
      <div className="flex h-screen w-full">
        <Sidebar />
        <div
          id=""
          className="flex-1 sm:pl-20 xl:pl-64 h-screen w-full bg-reviewbg "
        >
          {child}
        </div>
      </div>
    </div>
  );
};

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={RenderWithSidebar(<Main />)} />
        <Route index path="/games" element={RenderWithSidebar(<Games />)} />
        <Route path="/creator/" element={RenderWithSidebar(<Creator />)} />
        <Route
          path="/creator/news/game"
          element={RenderWithSidebar(<GameNewsCreator />)}
        />
        <Route
          path="/creator/review/movie"
          element={RenderWithSidebar(<MovieReviewCreator />)}
        />
        <Route
          path="/creator/review/game"
          element={RenderWithSidebar(<GameReviewCreator />)}
        />
        <Route path="/join" element={RenderWithSidebar(<Join />)} />
        <Route path="/auth/oauthCallback" element={<OAuth />} />
        <Route
          path="/review/:route"
          element={RenderWithSidebar(<ReviewGameInfoPage />)}
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
