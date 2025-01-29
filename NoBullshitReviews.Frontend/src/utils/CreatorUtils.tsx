import { Dictionary, IAttributeReview } from "src/types/Types";

export const CreateDefaultAttributeDictionary = (attributes: IAttributeReview[]) => {
  const names = attributes.map((x) => x.Name);
  const dic: Dictionary<string, number>[] = names.map(
    (x) => ({ [x]: 0 } as Dictionary<string, number>)
  );

  return dic;
};
