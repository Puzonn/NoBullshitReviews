import Featured from "src/components/Featured";
import { IReview } from "../types/Types";
import { useEffect, useState } from "react";
import * as React from "react";

export default function Main() {
  const [reviews, setReviews] = useState<IReview[]>([]);

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
        </div>
      </div>
    </div>
  );
}
