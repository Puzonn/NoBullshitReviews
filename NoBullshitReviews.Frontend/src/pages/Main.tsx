import Featured from "src/components/Featured/Featured";
import { IReview, ContentType } from "../types/Types";
import { useEffect, useState } from "react";
import Latest from "src/components/Latest";
import { FetchFeed } from "src/api/ReviewApi";

export default function Main() {
  const [filtredReviews, setFiltredReviews] = useState<IReview[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [filter, setFilter] = useState<ContentType>(ContentType.Any);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await FetchFeed().then((e) => {
          e.json().then((e) => {
            setReviews(e);
            setFiltredReviews(e);
          });
        });
      } catch (e) {}
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    setFiltredReviews((prev) => {
      if (filter !== ContentType.Any) {
        return reviews.filter((x) => x.reviewType === filter);
      }

      return reviews;
    });
  }, [filter]);

  return (
    <div className="box-border bg-reviewbg w-full">
      <div className="pb-20 gap-8 p-4 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-3 justify-start">
          <Featured featured={reviews} />
          <div className="flex gap-2 font-medium justify-center">
            <div
              onClick={() => setFilter(ContentType.Any)}
              className={`p-4 w-[90px] text-center cursor-pointer rounded-l-3xl bg-reviewinfobglight transition-colors duration-200 ${
                filter === ContentType.Any ? "bg-slate-300 text-black" : ""
              }`}
            >
              All
            </div>
            <div
              onClick={() => setFilter(ContentType.ReviewMovie)}
              className={`p-4 w-[90px] text-center  cursor-pointer bg-reviewinfobglight transition-colors duration-200 ${
                filter === ContentType.ReviewMovie
                  ? "bg-slate-300 text-black"
                  : ""
              }`}
            >
              Movies
            </div>
            <div
              onClick={() => setFilter(ContentType.ReviewGame)}
              className={`p-4 w-[90px] text-center  cursor-pointer rounded-r-3xl bg-reviewinfobglight transition-colors duration-200 ${
                filter === ContentType.ReviewGame
                  ? "bg-slate-300 text-black"
                  : ""
              }`}
            >
              Games
            </div>
          </div>

          <Latest reviews={filtredReviews} />
        </div>
      </div>
    </div>
  );
}
