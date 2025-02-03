import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IReview } from "src/types/Types";
import FeaturedDashReview from "./FeaturedDashReview";

const Featured = ({ reviews }: { reviews: IReview[] }) => {
  const featuredElement = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [featuredContent, setFeaturedContent] = useState<IReview>(reviews[0]);

  const navigate = useNavigate();

  useEffect(() => {
    setFeaturedContent(reviews[2]);
    setCanScrollLeft(checkCanScrollLeft());
    setCanScrollRight(checkCanScrollRight());
  }, [reviews]);

  const reviewClicked = (review: IReview) => {
    navigate(`/game/${review.routeName}`);
  };

  const checkCanScrollRight = (): boolean => {
    if (featuredElement.current) {
      const { scrollLeft, scrollWidth, clientWidth } = featuredElement.current;
      return scrollLeft + clientWidth < scrollWidth;
    }
    return false;
  };

  const checkCanScrollLeft = (): boolean => {
    if (featuredElement.current) {
      const { scrollLeft } = featuredElement.current;
      return scrollLeft > 0;
    }
    return false;
  };

  return (
    <div>
      <div className="flex items-center justify-start gap-3">
        <span className="text-xl font-semibold">Featured Today</span>
        <span className="text-base text-gray-300 underline cursor-pointer">
          See All
        </span>
      </div>
      <div className="flex flex-col items-center gap-3 mt-2">
        <hr className="w-full" />
        <div
          ref={featuredElement}
          className="flex flex-row overflow-auto no-scrollbar w-full"
          id="featured"
        >
          <FeaturedDashReview review={featuredContent} />
        </div>
      </div>
    </div>
  );
};

export default Featured;
