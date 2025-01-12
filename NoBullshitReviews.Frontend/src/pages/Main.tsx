import { DashReview } from "../components/DashReview";
import { IReview } from "../types/Types";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const navigate = useNavigate();

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
    navigate(`/game/${review.RouteName}`);
  };

  return (
    <div className="box-border flex flex-col min-h-screen bg-reviewbg">
      <div className="flex h-full">
        <Sidebar />
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
            onClick={() => navigate("/creator")}
            className="fixed bottom-8 hover:bg-reviewinfobglight right-8 bg-reviewinfobg text-white py-2 px-4 rounded-lg shadow-lg transition-all"
          >
            Create Review
          </button>
        </div>
      </div>
    </div>
  );
}
