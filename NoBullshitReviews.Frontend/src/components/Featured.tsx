import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DashReview } from "src/components/DashReview";
import { IReview } from "src/types/Types";

const Featured = ({ reviews }: { reviews: IReview[] }) => {
  const featuredElement = React.useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = React.useState<boolean>(true);
  const [canScrollLeft, setCanScrollLeft] = React.useState<boolean>(false);

  const navigate = useNavigate();

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

  const scroll = (elementId: string, value: number) => {
    const element = document.getElementById(elementId);
    if (element !== null) {
      element.scrollBy({ left: value, behavior: "smooth" });
    }

    /* That is some hacky way to do this. TODO: Redo this if possible */
    setTimeout(() => {
      setCanScrollLeft(checkCanScrollLeft());
      setCanScrollRight(checkCanScrollRight());
    }, 350);
  };

  return (
    <div>
      <div className="flex items-center justify-start gap-3">
        <span className="text-xl font-semibold">Featured Today</span>
        <span className="text-base text-gray-300 underline cursor-pointer">
          See All
        </span>
      </div>
      <div className="flex items-center gap-3">
        <hr className="w-full" />
        <div className="gap-3 hidden sm:flex">
          <div
            onClick={() => scroll("featured", -400)}
            className={`border-white border-2 hover:bg-reviewinfobg select-disable cursor-pointer rounded-full p-1.5 ${
              canScrollLeft ? "" : "opacity-50"
            }`}
          >
            <img
              src="/assets/icons/arrow.png"
              className="scale-x-[-1]"
              alt="arrow_left"
              width={20}
            />
          </div>
          <div
            onClick={() => scroll("featured", 400)}
            className={`border-white border-2 hover:bg-reviewinfobg select-disable cursor-pointer rounded-full p-1.5 ${
              canScrollRight ? "" : "opacity-50"
            }`}
          >
            <img src="/assets/icons/arrow.png" alt="arrow_right" width={20} />
          </div>
        </div>
      </div>
      <div
        ref={featuredElement}
        className="flex flex-row overflow-auto no-scrollbar"
        id="featured"
      >
        {reviews.map((review, index) => {
          return (
            <div key={`review_${index}`} className="flex-shrink-0 rounded">
              <DashReview
                onClick={(e) => {
                  reviewClicked(e);
                }}
                review={review}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Featured;
