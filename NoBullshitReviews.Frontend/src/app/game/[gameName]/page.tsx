"use client";

import GameReviewAttribute from "@/app/components/GameReviewAttribute";
import { getScoreBackgroundColor } from "@/app/global/Colors";
import { Attributes, IReviewCreation, ReviewGameInfo } from "@/app/types/Types";
import Image from "next/image";
import { useEffect, useState } from "react";

const ReviewGameInfoPage = () => {
  const [review, setReview] = useState<ReviewGameInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const segments = window.location.href.split("/");
    const game = segments[segments.length - 1];

    const fetchInfo = async () => {
      try {
        await fetch(`https://localhost:7106/review/get-info-name/${game}`).then(
          (e) => {
            e.json().then((e) => {
              setReview(e);
              setIsLoading(false);
            });
          }
        );
      } catch (e) {}
    };

    fetchInfo();
  }, []);

  useEffect(() => {
    if (review !== null && review !== undefined) {
      review["Story"];
    }
  }, [review]);

  const getAttributeValueName = (attribute: string, attributeIndex: number) => {
    const dictionary = Attributes.find((e) => e.FormName == attribute)?.Values[
      attributeIndex
    ]!;
    const entry = Object.entries(dictionary)[0][1];
    return entry;
  };

  if (isLoading || review === undefined) {
    return <div></div>;
  }

  return (
    <div className="flex justify-center mt-4">
      <div
        className="bg-reviewbg transition-colors duration-500 p-4 rounded
     shadow-[0_2px_4px_rgba(255,255,255,0.04),_0_8px_16px_rgba(0,0,0,0.6)] max-w-[90vw]"
      >
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-[2fr,5fr] gap-5">
            <div className="flex justify-center sm:justify-start w-full h-full">
              <img
                className="max-h-[260px] w-full object-cover"
                src={`/assets/static/${review.ImagePath}`}
                alt={review.Title}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold">{review.Title}</span>
              <span className="text-base font-medium text-gray-300">
                Review Release: 8th December 2025
              </span>
              <div className="flex justify-between">
                <div className="flex flex-col items-center justify-center">
                  <span>Review Score</span>
                  <div
                    className={`${getScoreBackgroundColor(
                      review.Score
                    )} flex justify-center items-center text-4xl w-[64] h-[64]`}
                  >
                    {review.Score}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span>Average Score</span>
                  <div
                    className={`${getScoreBackgroundColor(
                      review.Score
                    )} flex justify-center items-center text-4xl w-[64] h-[64]`}
                  >
                    {review.Score}
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span>Released On: 6th December 2025</span>
                <span>Developer: Grinding Gear Games</span>
                <span>Publisher: Grinding Gear Games</span>
                <span>
                  Platforms: Nintendo Switch PlayStation 5 PlayStation 4
                </span>
              </div>
              <div className="mt-auto">
                <button className="border mt-5 md:mt-0 hover:bg-reviewinfobglight border-white w-full py-1">
                  Add My Review
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full w-full">
            <div className="flex flex-col gap-2 pt-5 w-full">
              {Attributes.map((x, index) => {
                const attributeIndex = Number(
                  review[x.FormName as keyof IReviewCreation]
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
        </div>
      </div>
    </div>
  );
};

export default ReviewGameInfoPage;
