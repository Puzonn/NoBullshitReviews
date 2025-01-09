import { getScoreBackgroundColor } from "@/app/global/Colors";
import { IReview } from "@/app/types/Types";
import Image from "next/image";

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
      <Image
        className="min-h-[220px]"
        width={250}
        height={200}
        src={`/assets/${review.ImagePath}`}
        alt={review.Title}
        priority
      />

      <div className="flex items-center">
        <span
          className={`${getScoreBackgroundColor(
            review.Score
          )} my-2 rounded p-1 font-medium`}
        >
          {review.Score}
        </span>
        <span className="ml-auto bg-reviewinfobg p-1 rounded font-medium">
          Game
        </span>
      </div>
      <div className="overflow-hidden max">
        <span className="text-pretty">{review.Title}</span>
      </div>
    </div>
  );
};
