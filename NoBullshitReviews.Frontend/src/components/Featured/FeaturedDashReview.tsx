import { useNavigate } from "react-router-dom";
import { getScoreBackgroundColor } from "src/global/Colors";
import { FeedReview } from "src/types/Types";

const FeaturedDashReview = ({ review }: { review: FeedReview }) => {
  const navigate = useNavigate();

  if (review === null || review === undefined) {
    return <></>;
  }

  return (
    <div
      className="cursor-pointer transition-colors duration-300 hover:bg-reviewinfobglight p-2 relative w-full sm:h-[580px]  rounded-lg"
      onClick={() => navigate(`/review/${review.routeName}`)}
    >
      <img
        className="w-full h-full object-cover rounded-lg"
        width={458}
        height={425}
        src={review.game.imagePath}
        alt={review.game.title}
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
        <span className="text-2xl text-white font-bold">
          {review.game.title}
        </span>
      </div>
    </div>
  );
};

export default FeaturedDashReview;
