import { getScoreBackgroundColor } from "src/global/Colors";
import { IReview } from "src/types/Types";

const FeaturedDashReview = ({ review }: { review: IReview }) => {
  if (review === null || review === undefined) {
    return <></>;
  }

  return (
    <div className="bg-white relative w-[600px] h-[450px] rounded-lg">
      <img
        className="w-full h-full object-cover rounded-lg"
        width={450}
        height={400}
        src={`/assets/static/${review.imagePath}`}
        alt={review.title}
      />
      <div
        className={`absolute left-[20px] p-4 bottom-[20px] opacity-90 rounded-lg ${getScoreBackgroundColor(
          review.score
        )}`}
      >
        <span className="text-xl font-semibold">{review.score}</span>
      </div>
      <div
        className={`absolute left-[100px] p-4 bottom-[20px] opacity-90 rounded-lg bg-black bg-opacity-50`}
      >
        <span className="text-2xl text-white font-bold">{review.title}</span>
      </div>
    </div>
  );
};

export default FeaturedDashReview;
