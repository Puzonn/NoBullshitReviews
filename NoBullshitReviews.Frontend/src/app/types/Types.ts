export interface IReviewCreation {
  Title: string;
  Content: string;
  Tags: string[];
  Score: number;
  Graphics: number;
  Gameplay: number;
  Audio: number;
  Audience: number;
  Requirements: number;
  GameSize: number;
  Difficulty: number;
  Story: number;
  GameTime: number;
  Bugs: number;
  Image?: FormData | null;
}

export interface IReview extends IReviewCreation {
  Creation: Date;
  Id: number;
  UID: string;
  ImagePath: string;
}

export interface ReviewGameInfo extends IReview {}

export type Dictionary<K extends string | number, V> = {
  [P in K]: V;
};

export interface IGameAttributeReview {
  Name: string;
  FormName: string;
  Values: Dictionary<string, string>[];
  Image: string;
}

export const Attributes: IGameAttributeReview[] = [
  {
    Name: "Graphics",
    FormName: "Graphics",
    Image: "Monitor",
    Values: [
      { na: "N/A" },
      { beautiful: "Beautiful" },
      { good: "Good" },
      { decent: "Decent" },
      { bad: "Bad" },
    ],
  },
  {
    Name: "Gameplay",
    FormName: "Gameplay",
    Image: "gamepad",
    Values: [
      { na: "N/A" },
      { very_good: "Very good" },
      { good: "Good" },
      { bad: "Bad" },
      { very_bad: "Very bad" },
    ],
  },
  {
    Name: "Audio",
    FormName: "Audio",
    Image: "headphones",
    Values: [
      { na: "N/A" },
      { eargasm: "Eargasm" },
      { good: "Good" },
      { bad: "Bad" },
      { deaf: "I'm now deaf" },
    ],
  },
  {
    Name: "Audience",
    FormName: "Audience",
    Image: "audience",
    Values: [
      { na: "N/A" },
      { kids: "Kids" },
      { teens: "Teens" },
      { adults: "Adults" },
    ],
  },
  {
    Name: "PC Requirements",
    FormName: "Requirements",
    Image: "gpu",
    Values: [
      { na: "N/A" },
      { potato: "Potato" },
      { decent: "Decent" },
      { high_end: "High-End" },
    ],
  },
  {
    Name: "Game Size",
    FormName: "GameSize",
    Image: "hard_drive",
    Values: [
      { na: "N/A" },
      { "1gb": "Less than 1GB" },
      { "25gb": "More than 25GB" },
      { "50gb": "More than 50GB" },
      { "100gb": "More than 100GB" },
    ],
  },
  {
    Name: "Difficulty",
    FormName: "Difficulty",
    Image: "mountain",
    Values: [
      { na: "N/A" },
      { easy: "Easy" },
      { medium: "Medium" },
      { difficult: "Difficult" },
      { dark_souls: "Dark Souls" },
    ],
  },
  {
    Name: "Story",
    FormName: "Story",
    Image: "story",
    Values: [
      { na: "N/A" },
      { no_story: "No Story" },
      { some_lore: "Some lore" },
      { average: "Average" },
      { good: "Good" },
      { lovely: "Lovely" },
    ],
  },
  {
    Name: "Game Time",
    FormName: "GameTime",
    Image: "sand_clock",
    Values: [
      { na: "N/A" },
      { short: "Short. ~ 1 Hour" },
      { average: "Average. ~ 10 Hours" },
      { long: "Long ~ 50 Hours" },
      { infinity: "Infinity" },
    ],
  },
  {
    Name: "Bugs",
    FormName: "Bugs",
    Image: "bug",
    Values: [
      { na: "N/A" },
      { no_bugs: "No bugs" },
      { minor_bugs: "Minor bugs" },
      { a_lot: "A lot" },
      { unplayable: "Unplayable" },
    ],
  },
];
