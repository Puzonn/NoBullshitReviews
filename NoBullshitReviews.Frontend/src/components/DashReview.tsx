import { getScoreBackgroundColor } from "../global/Colors";
import { IReview } from "../types/Types";
import * as React from "react";

export const DashReview = ({
  review,
  onClick,
}: {
  review: IReview;
  onClick: (e: IReview) => void;
}) => {
  return (
    <div
      onClick={() => onClick(review)}
      className="flex-shrink-0 w-[200px] h-[330px] bg-reviewbg hover:bg-reviewinfobglight
         transition-colors duration-500 cursor-pointer p-4 rounded
       shadow-[0_2px_4px_rgba(255,255,255,0.04),_0_8px_16px_rgba(0,0,0,0.6)]"
    >
      <img
        className="min-h-[220px]"
        width={250}
        height={200}
        src={`/assets/static/${review.imagePath}`}
        alt={review.title}
      />

      <div className="flex items-center">
        <span
          className={`${getScoreBackgroundColor(
            review.score
          )} my-2 rounded p-1 font-medium`}
        >
          {review.score}
        </span>
        <span className="ml-auto bg-reviewinfobg p-1 rounded font-medium">
          Game
        </span>
      </div>
      <div className="overflow-hidden max">
        <span className="text-pretty">{review.title}</span>
      </div>
    </div>
  );
};
