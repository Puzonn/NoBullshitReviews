"use client";

import { DashReview } from "./components/DashReview";
import { IReview } from "@/app/types/Types";
import { permanentRedirect, redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await fetch("https://localhost:7106/review/get-all").then((e) => {
          e.json().then((e) => setReviews(e));
        });
      } catch (e) {}
    };

    fetchReviews();
  }, []);

  const reviewClicked = (review: IReview) => {
    router.push(`/game/${review.RouteName}`);
  };

  return (
    <div className="pt-5">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm min-w-[200px]">
          <div className="relative flex items-center">
            <input
              className="w-full bg-transparent text-white placeholder:text-gray-300text-sm border
               border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
               focus:text-white
                hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search Reviews"
            />
            <button
              className="absolute top-1.5 right-1 flex items-center rounded bg-foreground text-black py-1 px-2.5 border 
              border-transparent text-center text-sm transition-all shadow-sm hover:shadow focus:shadow-none hover:bg-gray-300
               active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-auto pb-20 gap-8 p-8 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-3xl font-semibold py-2">Most Recent</h1>
        <div className="flex flex-row gap-8 justify-start">
          {reviews.map((review, index) => {
            return (
              <DashReview
                onClick={(e) => {
                  reviewClicked(e);
                }}
                key={`review_${index}`}
                review={review}
              />
            );
          })}
        </div>
      </div>

      <div>
        <button
          onClick={() => redirect("/creator")}
          className="fixed bottom-8 hover:bg-reviewinfobglight right-8 bg-reviewinfobg text-white py-2 px-4 rounded-lg shadow-lg transition-all"
        >
          Create Review
        </button>
      </div>
    </div>
  );
}
