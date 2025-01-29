import Featured from "src/components/Featured";
import { IReview } from "../types/Types";
import { useEffect, useState } from "react";
import Latest from "src/components/Latest";

export default function Main() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await fetch("https://localhost:7106/review/recent", {
          credentials: "include",
          headers: {},
        }).then((e) => {
          e.json().then((e) => setReviews(e));
        });
      } catch (e) {}
    };

    fetchReviews();
  }, []);

  return (
    <div className="box-border flex flex-col min-h-screen bg-reviewbg w-full sm:pl-5 overflow-hidden">
      <div className="pb-20 gap-8 p-4 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-3 justify-start">
          <Featured reviews={reviews} />
          <div className="flex gap-2 font-medium justify-center">
            <div
              onClick={() => setFilter("all")}
              className={`p-4 w-[90px] text-center cursor-pointer rounded-l-3xl bg-reviewinfobglight transition-colors duration-200 ${
                filter === "all" ? "bg-slate-300 text-black" : ""
              }`}
            >
              All
            </div>
            <div
              onClick={() => setFilter("movies")}
              className={`p-4 w-[90px] text-center  cursor-pointer bg-reviewinfobglight transition-colors duration-200 ${
                filter === "movies" ? "bg-slate-300 text-black" : ""
              }`}
            >
              Movies
            </div>
            <div
              onClick={() => setFilter("games")}
              className={`p-4 w-[90px] text-center  cursor-pointer rounded-r-3xl bg-reviewinfobglight transition-colors duration-200 ${
                filter === "games" ? "bg-slate-300 text-black" : ""
              }`}
            >
              Games
            </div>
          </div>

          <Latest reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
