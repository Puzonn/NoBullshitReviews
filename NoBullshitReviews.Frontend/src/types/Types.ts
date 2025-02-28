export interface IMovie {
  description: string;
  imagePath: string;
  initialRelease: Date;
  studio: string;
  title: string;
}

export interface IGame {
  score: number;
  title: string;
  description: string;
  publisher: string;
  developer: string;
  imagePath: string;
  initialRelease: Date;
  routeName: string;
}

export interface User {
  avatarUrl: string;
  username: string;
}

export interface FeedReview {
  title: string;
  imagePath: string;
  review: string;
  summary: string;
  routeName: string;
  authorName: string;
  score: number;
  reviewType: ContentType;
  tags: string[];
  attributes: Dictionary<string, number>;
  createdAt: Date;
  game: IGame;
}

export interface FilterContextType {
  filters: Dictionary<string, string[]>;
  addFilter: (selectorName: string, filter: string) => void;
  removeFilter: (selectorName: string, filter: string) => void;
  isSelected: (selectorName: string, filter: string) => boolean;
  flatFilterValues: () => string[];
  removeFilterFromAnySelector: (filter: string) => void;
}

export interface Feed {
  featured: FeedReview[];
  mostRecent: FeedReview[];
}

export interface IReviewCreation {
  title: string;
  review: string;
  summary: string;
  tags: string[];
  score: number;
  attributes: Dictionary<string, number>;
  image?: FormData | null;
}

export enum ContentType {
  Any = -1,
  ReviewGame = 0,
  ReviewMovie = 1,
  NewsGame = 2,
  NewsMovie = 3,
}

export interface IReview extends IReviewCreation {
  authorName;
  creation: Date;
  routeName: string;
  id: number;
  uID: string;
  imagePath: string;
  reviewType: ContentType;
}

export interface ReviewGameInfo extends IReview {
  isAuthor: boolean;
}

export type Dictionary<K extends string | number, V> = {
  [P in K]: V;
};

export interface IAttributeReview {
  Name: string;
  FormName: string;
  Values: Dictionary<string, string>[];
  Image: string;
}

export const GameReviewAttributes: IAttributeReview[] = [
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

export const MovieReviewAttributes: IAttributeReview[] = [
  {
    Name: "Graphics/Visual Effects",
    FormName: "Graphics/Visual Effects",
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
    Name: "Story/Plot",
    FormName: "Story/Plot",
    Image: "Book",
    Values: [
      { na: "N/A" },
      { amazing: "Amazing" },
      { good: "Good" },
      { average: "Average" },
      { poor: "Poor" },
    ],
  },
  {
    Name: "Audio/Voice Acting",
    FormName: "Audio/Voice Acting",
    Image: "Microphone",
    Values: [
      { na: "N/A" },
      { excellent: "Excellent" },
      { good: "Good" },
      { average: "Average" },
      { poor: "Poor" },
    ],
  },
  {
    Name: "Pacing",
    FormName: "Pacing",
    Image: "Clock",
    Values: [
      { na: "N/A" },
      { perfect: "Perfect" },
      { good: "Good" },
      { slow: "Slow" },
      { rushed: "Rushed" },
    ],
  },
  {
    Name: "Character Development",
    FormName: "Character Development",
    Image: "Person",
    Values: [
      { na: "N/A" },
      { deep: "Deep" },
      { good: "Good" },
      { average: "Average" },
      { shallow: "Shallow" },
    ],
  },
  {
    Name: "Cinematography",
    FormName: "Cinematography",
    Image: "Camera",
    Values: [
      { na: "N/A" },
      { breathtaking: "Breathtaking" },
      { good: "Good" },
      { average: "Average" },
      { poor: "Poor" },
    ],
  },
  {
    Name: "Originality",
    FormName: "Originality",
    Image: "Lightbulb",
    Values: [
      { na: "N/A" },
      { unique: "Unique" },
      { creative: "Creative" },
      { average: "Average" },
      { derivative: "Derivative" },
    ],
  },
  {
    Name: "Emotional Impact",
    FormName: "Emotional Impact",
    Image: "Heart",
    Values: [
      { na: "N/A" },
      { powerful: "Powerful" },
      { touching: "Touching" },
      { decent: "Decent" },
      { dull: "Dull" },
    ],
  },
  {
    Name: "Soundtrack",
    FormName: "Soundtrack",
    Image: "Music",
    Values: [
      { na: "N/A" },
      { outstanding: "Outstanding" },
      { good: "Good" },
      { average: "Average" },
      { forgettable: "Forgettable" },
    ],
  },
  {
    Name: "Rewatchability",
    FormName: "Rewatchability",
    Image: "Repeat",
    Values: [
      { na: "N/A" },
      { must_watch: "Must Watch" },
      { enjoyable: "Enjoyable" },
      { occasional: "Occasional" },
      { one_time: "One Time" },
    ],
  },
];
