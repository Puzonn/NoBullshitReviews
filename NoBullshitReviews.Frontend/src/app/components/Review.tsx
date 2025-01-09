import Image from "next/image";
import PoeImage from "../../assets/pathofexile2.jpg";
import { IReview } from "@/app/types/Types";
import { getScoreBackgroundColor } from "@/app/global/Colors";

export const Review = ({ review }: { review: IReview }) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 items-start bg-reviewbg hover:bg-reviewinfobglight
         transition-colors duration-500 cursor-pointer p-4 rounded
       shadow-[0_2px_4px_rgba(255,255,255,0.04),_0_8px_16px_rgba(0,0,0,0.6)] min-w-[20vw]"
    >
      <Image
        width={150}
        height={160}
        src={`/assets/icons/${review.ImagePath}.png`}
        alt={review.Title}
        priority
      />
      <div className="flex flex-col h-full">
        <div className="bg-reviewinfobg font-bold max-w-fit px-2 py-1 mb-1 rounded">
          Review
        </div>
        <span className="font-bold">{review.Title}</span>
        <p>{review.Content}</p>
        <div className="mt-auto flex gap-3 items-center pt-5">
          <div
            className={`${getScoreBackgroundColor(review.Score)} font-bold p-1`}
          >
            {review.Score}
          </div>
          <time className=" text-gray-300">4 miesiące temu</time>
        </div>
      </div>
    </div>
  );
};
