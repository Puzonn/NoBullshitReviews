import {
  ContentType,
  Dictionary,
  IAttributeReview,
  IReview,
} from "src/types/Types";

export const CreateDefaultAttributeDictionary = (
  attributes: IAttributeReview[]
) => {
  const names = attributes.map((x) => x.Name);
  const dic: Dictionary<string, number>[] = names.map(
    (x) => ({ [x]: 0 } as Dictionary<string, number>)
  );

  return dic;
};

export const GetTag = (review: IReview): string => {
  switch (review.reviewType) {
    case ContentType.ReviewMovie:
      return "Movie";
    case ContentType.ReviewGame:
      return "Game";
  }

  return "";
};
