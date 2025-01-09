import Image from "next/image";

const GameReviewAttribute = ({
  attribute,
  attributeValue,
  imageSource,
}: {
  attribute: string;
  attributeValue: string;
  imageSource: string;
}) => {
  return (
    <>
      <div className="flex items-center justify-center gap-2 mx-2">
        <Image
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
