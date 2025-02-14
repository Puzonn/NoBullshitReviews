import { useParams } from "react-router-dom";
import GameReviewAttribute from "../components/creator/GameReviewAttribute";
import { getScoreBackgroundColor } from "../global/Colors";
import { GameReviewAttributes, ReviewGameInfo } from "../types/Types";
import { useEffect, useState } from "react";

const ReviewGameInfoPage = () => {
  const [review, setReview] = useState<ReviewGameInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { route } = useParams<{ route: string }>();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        await fetch(`https://localhost:7106/review/get-info-name/${route}`, {
          credentials: "include",
        }).then((e) => {
          e.json().then((e) => {
            setReview(e);
            setIsLoading(false);
          });
        });
      } catch (e) {}
    };

    fetchInfo();
  }, []);

  const getAttributeValueName = (attribute: string, attributeIndex: number) => {
    const dictionary = GameReviewAttributes.find((e) => {
      return e.FormName == attribute;
    })?.Values[attributeIndex];

    if (dictionary === null || dictionary === undefined) {
      return "";
    }

    const entry = Object.entries(dictionary)[0][1];
    return entry;
  };

  if (isLoading || review === undefined) {
    return <div></div>;
  }

  const formatCreationDate = () => {
    const date = new Date(review.creation);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
    return formattedDate;
  };

  return (
    <div className="flex justify-center w-full">
      <div
        className="bg-reviewbg transition-colors duration-500 rounded w-full
     shadow-[0_2px_4px_rgba(255,255,255,0.04),_0_8px_16px_rgba(0,0,0,0.6)] max-w-[90vw] px-5 py-5 md:px-5 2xl:px-64"
      >
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-[2fr,5fr] gap-5 bg-reviewinfobglight rounded-xl p-5">
            <div className="flex justify-center sm:justify-start w-full h-full">
              <img
                className="max-h-[260px] w-full object-cover rounded-xl"
                src={`/assets/static/${review.imagePath}`}
                alt={review.title}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold">{review.title}</span>
              <span className="text-base font-medium text-gray-300">
                {formatCreationDate()} • {review.authorName}
              </span>
              <div className="mt-5">
                <div className="flex justify-between">
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className={`${getScoreBackgroundColor(
                        review.score
                      )} flex justify-center items-center rounded text-4xl w-[64] p-3 h-[64]`}
                    >
                      {review.score}
                    </div>
                    <span>Review Score</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className={`${getScoreBackgroundColor(
                        review.score
                      )} flex justify-center items-center p-3 rounded text-4xl w-[64] h-[64]`}
                    >
                      {review.score}
                    </div>
                    <span>Average Score</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <button className="border mt-5 md:mt-0 hover:bg-reviewinfobglight border-white w-full py-1">
                  Add My Review
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-reviewinfobglight p-5 rounded-xl">
            <span className="font-bold text-xl pb-2">Summary</span>
            <span>{review.summary}</span>
          </div>
          <div className="flex flex-col bg-reviewinfobglight p-5 rounded-xl">
            <span className="font-bold text-xl pb-2">Review</span>
            <span>{review.review}</span>
          </div>

          <div className="flex flex-col h-full w-full bg-reviewinfobglight rounded-xl p-5">
            <div className="flex flex-col gap-2 pt-5 w-full">
              {GameReviewAttributes.map((x, index) => {
                const values = Object.values(review.attributes);
                const attributeIndex = values.findIndex(
                  (r) => (r as any).attributeName === x.FormName
                );

                return (
                  <GameReviewAttribute
                    key={`game_review_attribute_${index}`}
                    attribute={x.Name}
                    attributeValue={getAttributeValueName(
                      x.FormName,
                      attributeIndex
                    )}
                    imageSource={x.Image}
                  />
                );
              })}
            </div>
          </div>

          <div className="bg-reviewinfobglight p-5 flex rounded-xl">
            <div className="flex text-sm gap-5 flex-wrap">
              <div className="flex flex-col">
                <span className="font-semibold">Initlial Release</span>
                <span>Dec 6, 2024</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Developers</span>
                <span>Grinding Gear Games</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Publishers</span>
                <span>Grinding Gear Games</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Tags</span>
                {review.tags.map((tag, index) => {
                  return (
                    <a
                      key={`review_tag_${index}`}
                      className="underline cursor-pointer"
                    >
                      {tag}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewGameInfoPage;
