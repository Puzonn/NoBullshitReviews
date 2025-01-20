import * as React from "react";

const GameReviewAttribute = ({
  attribute,
  attributeValue,
  imageSource,
}: {
  attribute: string;
  attributeValue: string;
  imageSource: string;
}) => {
  if (attributeValue === "N/A" || attributeValue === "") {
    return <></>;
  }

  return (
    <>
      <div className="flex items-center justify-center gap-2 mx-2">
        <img
          width={20}
          height={20}
          alt="Grahpics"
          src={`/assets/icons/${imageSource}.png`}
        />
        <span className="font-bold">{attribute}</span>
        <span className="ml-auto">{attributeValue}</span>
      </div>
      <hr className="h-[1px] border-0 bg-white" />
    </>
  );
};

export default GameReviewAttribute;
