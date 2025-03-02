import {
  ContentType,
  Dictionary,
  FeedReview,
  IAttributeReview,
  IDash,
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

export const GetTag = (dash: IDash): string => {
  switch (dash.contentType) {
    case ContentType.ReviewMovie:
      return "Movie";
    case ContentType.ReviewGame:
      return "Game";
  }

  return "";
};

export const FormatDate = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
  return formattedDate;
};
