import { GetTag } from "src/utils/Utils";
import { getScoreBackgroundColor } from "../global/Colors";
import { FeedReview, IDash } from "../types/Types";

export const DashReview = ({
  dash,
  onClick,
}: {
  dash: IDash;
  onClick: (e: IDash) => void;
}) => {
  return (
    <div className="flex overflow-x-auto gap-4 p-4">
      <div
        onClick={() => onClick(dash)}
        className="hover:bg-reviewinfobglight
                 transition-colors duration-500 cursor-pointer flex flex-col gap-2
                 p-3 rounded shadow-[0_2px_4px_rgba(255,255,255,0.04),_0_4px_8px_rgba(0,0,0,0.6)]
                 w-40 sm:w-48 lg:w-64"
      >
        <img
          className="h-32 w-full object-cover rounded-lg sm:h-40"
          width={128}
          height={192}
          src={dash.imagePath}
          alt={dash.title}
        />
        <div className="truncate">
          <div className="flex items-center">
            <span
              className={`${getScoreBackgroundColor(
                dash.score
              )} my-2 rounded p-1 font-medium`}
            >
              {dash.score}
            </span>
            <span className="ml-auto border border-white p-1 rounded font-medium">
              {GetTag(dash)}
            </span>
          </div>
        </div>
        <div className="truncate text-center">
          <span className="text-base font-semibold text-gray-200">
            {dash.title}
          </span>
        </div>
      </div>
    </div>
  );
};
