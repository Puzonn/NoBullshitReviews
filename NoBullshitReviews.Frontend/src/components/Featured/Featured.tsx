import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IReview } from "src/types/Types";
import FeaturedDashReview from "./FeaturedDashReview";
import { GetTag } from "src/utils/CreatorUtils";
import { getScoreBackgroundColor } from "src/global/Colors";

/* Time needed to change main featured content */
const FEATURED_CHANGE_TIME: number = 5500;

const Featured = ({ featured }: { featured: IReview[] }) => {
  const featuredElement = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [featuredContent, setFeaturedContent] = useState<IReview>(featured[0]);
  const [nextFeatured, setNextFeatured] = useState<IReview[]>(featured);

  const navigate = useNavigate();

  useEffect(() => {
    if (featured.length === 0) {
      return;
    }

    setNextFeatured(featured);
    setFeaturedContent(featured[0]);
  }, [featured]);

  useEffect(() => {
    if (featuredContent === null || featured.length === 0) {
      return;
    }

    let featuredIndex = featured.indexOf(featuredContent);

    if (featuredIndex === -1) {
      return;
    }

    if (featuredIndex + 1 >= featured.length) {
      featuredIndex = 0;
    }

    const timer = setTimeout(() => {
      setFeaturedContent(featured[featuredIndex + 1]);
      setNextFeatured((prev) => {
        const updatedFeatured = [...prev];
        updatedFeatured.push(updatedFeatured.shift());
        return updatedFeatured;
      });
    }, FEATURED_CHANGE_TIME);

    return () => clearTimeout(timer);
  }, [featuredContent, featured]);

  const reviewClicked = (review: IReview) => {
    navigate(`/game/${review.routeName}`);
  };

  return (
    <div>
      <div className="flex items-center justify-start gap-3">
        <span className="text-xl font-semibold">Featured Today</span>
        <span className="text-base text-gray-300 underline cursor-pointer">
          See All
        </span>
      </div>
      <hr className="w-full my-5" />
      <div className="flex flex-wrap gap-5">
        <div className="flex flex-col items-center">
          <div
            ref={featuredElement}
            className="flex flex-row overflow-auto no-scrollbar w-full h-full"
            id="featured"
          >
            <FeaturedDashReview review={featuredContent} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {nextFeatured.map((review, index) => {
            return (
              <div className="flex gap-3">
                <img
                  className="w-[184px] h-[170px] object-cover rounded-lg"
                  width={64}
                  height={128}
                  src={`/assets/static/${review.imagePath}`}
                  alt={review.title}
                />
                <div className="truncate h-full flex flex-col">
                  <p>{review.title}</p>
                  <p className="text-gray-400">{review.content}</p>

                  <div className="mt-auto flex items-center gap-3">
                    <div>
                      <span
                        className={`h-full ${getScoreBackgroundColor(
                          review.score
                        )}  rounded p-2 font-medium`}
                      >
                        {review.score}
                      </span>
                    </div>
                    <span className="border border-white p-1 rounded font-medium">
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
