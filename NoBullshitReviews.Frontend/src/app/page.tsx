"use client";

import Navbar from "@/app/components/Navbar";
import { DashReview } from "./components/DashReview";
import { IReview } from "@/app/types/Types";
import { permanentRedirect, redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";

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
    <div className="box-border flex flex-col h-screen">
      <div className="flex h-full">
        <Sidebar />
        <div className="overflow-auto pb-20 gap-8 p-8 font-[family-name:var(--font-geist-sans)]">
          <Navbar />

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
            onClick={() => router.push("/creator")}
            className="fixed bottom-8 hover:bg-reviewinfobglight right-8 bg-reviewinfobg text-white py-2 px-4 rounded-lg shadow-lg transition-all"
          >
            Create Review
          </button>
        </div>
      </div>
    </div>
  );
}
