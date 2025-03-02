import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeedReview, IDash, IReview } from "src/types/Types";
import FeaturedDashReview from "./FeaturedDashReview";
import { GetTag } from "src/utils/Utils";
import { getScoreBackgroundColor } from "src/global/Colors";

/* Time needed to change main featured content */
const FEATURED_CHANGE_TIME: number = 5500;

const Featured = ({ dashes }: { dashes: IDash[] }) => {
  const featuredElement = useRef<HTMLDivElement>(null);
  const [featuredContent, setFeaturedContent] = useState<IDash>(dashes[0]);
  const [nextFeatured, setNextFeatured] = useState<IDash[]>(dashes);

  const navigate = useNavigate();

  useEffect(() => {
    if (dashes.length === 0) {
      return;
    }

    setNextFeatured(dashes);
    setFeaturedContent(dashes[0]);
  }, [dashes]);

  useEffect(() => {
    if (featuredContent === null || dashes.length === 0) {
      return;
    }

    let featuredIndex = dashes.indexOf(featuredContent);

    if (featuredIndex === -1) {
      return;
    }

    if (featuredIndex + 1 >= dashes.length) {
      featuredIndex = 0;
    }

    if (nextFeatured.length < 3) {
      return;
    }

    const timer = setTimeout(() => {
      setFeaturedContent(dashes[featuredIndex + 1]);
      setNextFeatured((prev) => {
        const updatedFeatured = [...prev];
        updatedFeatured.push(updatedFeatured.shift());
        return updatedFeatured;
      });
    }, FEATURED_CHANGE_TIME);

    return () => clearTimeout(timer);
  }, [featuredContent, dashes]);

  const reviewClicked = (review: IReview) => {
    navigate(`/game/${review.routeName}`);
  };

  if (nextFeatured === undefined || nextFeatured.length === 0) {
    return <></>;
  }

  return (
    <div>
      <div className="flex items-center justify-start gap-3">
        <span className="text-3xl font-semibold">Featured Today</span>
      </div>
      <hr className="w-full my-5 opacity-20" />
      <div className="flex flex-wrap gap-5">
        <div className="lg:flex-1 flex-col items-center w-full">
          <div
            ref={featuredElement}
            className="flex flex-row overflow-auto no-scrollbar w-full h-full"
            id="featured"
          >
            <FeaturedDashReview dash={featuredContent} />
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:w-[500px] w-fit">
          {nextFeatured.map((review, index) => {
            if (review === featuredContent) {
              return <></>;
            }
            return (
              <div
                key={`featured_${index}`}
                onClick={() => {
                  navigate(`/review/${review.routeName}`);
                }}
                className="flex gap-4 cursor-pointer hover:bg-reviewinfobglight p-3 rounded-xl transition-colors duration-300"
              >
                <img
                  className="w-[150px] h-[150px] sm:w-[184px] sm:h-[170px] object-cover rounded-lg"
                  width={150}
                  height={150}
                  src={review.imagePath}
                  alt={review.title}
                />

                <div className="flex flex-col flex-1">
                  <p className="font-semibold truncate">{review.title}</p>
                  <div className="text-gray-400 text-sm mt-1 line-clamp-4">
                    {/* {review.summary} */}
                    summary
                  </div>
                  <div className="mt-auto flex items-center gap-3">
                    <span
                      className={`rounded p-2 font-medium ${getScoreBackgroundColor(
                        review.score
                      )}`}
                    >
                      {review.score}
                    </span>

                    <span className="border border-white px-2 py-1 rounded font-medium">
                      {GetTag(review)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Featured;
