import { useNavigate } from "react-router-dom";
import { getScoreBackgroundColor } from "src/global/Colors";
import { FeedReview, IDash } from "src/types/Types";

const FeaturedDashReview = ({ dash }: { dash: IDash }) => {
  const navigate = useNavigate();

  if (dash === null || dash === undefined) {
    return <></>;
  }

  return (
    <div
      className="cursor-pointer transition-colors duration-300 hover:bg-reviewinfobglight p-2 relative w-full sm:h-[580px]  rounded-lg"
      onClick={() => navigate(`/review/${dash.routeName}`)}
    >
      <img
        className="w-full h-full object-cover rounded-lg"
        width={458}
        height={425}
        src={dash.imagePath}
        alt={dash.title}
      />
      <div
        className={`absolute left-[20px] p-4 bottom-[20px] opacity-90 rounded-lg ${getScoreBackgroundColor(
          dash.score
        )}`}
      >
        <span className="text-xl font-semibold">{dash.score}</span>
      </div>
      <div
        className={`absolute left-[100px] p-4 bottom-[20px] opacity-90 rounded-lg bg-black bg-opacity-50`}
      >
        <span className="text-2xl text-white font-bold">{dash.title}</span>
      </div>
    </div>
  );
};

export default FeaturedDashReview;
