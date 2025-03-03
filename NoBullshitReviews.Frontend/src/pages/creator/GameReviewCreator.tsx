import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FetchGame, PostReview } from "src/api/ReviewApi";
import CreatorGameAttribute from "src/components/Creator/CreatorGameAttribute";
import { getScoreBackgroundColor } from "src/global/Colors";
import {
  Dictionary,
  GameReviewAttributes,
  MovieReviewAttributes,
  IGame,
} from "src/types/Types";
import { CreateDefaultAttributeDictionary } from "src/utils/Utils";

const GameReviewCreator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [game, setGame] = useState<IGame>(undefined);
  const [reviewData, setReviewData] = useState({
    title: "",
    review: "",
    summary: "",
    tags: [] as string[],
    score: 0,
    image: null as File | null,
    attributes: CreateDefaultAttributeDictionary(GameReviewAttributes),
  });
  const [gameTitle, setGameTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [reviewLenght, setReviewLenght] = useState<number>(0);
  const [summaryLenght, setSummaryLenght] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [attributes, setAttributes] = useState<Dictionary<string, number>[]>(
    CreateDefaultAttributeDictionary(GameReviewAttributes)
  );

  useEffect(() => {
    const handler = setTimeout(async () => {
      await FetchGame(gameTitle).then((e) => {
        if (e.status !== 200) {
          setGame(undefined);
        } else {
          e.json().then((e) => {
            setGame(e);
          });
        }
      });
    }, 800);

    return () => clearTimeout(handler);
  }, [gameTitle]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const from = query.get("from");
    if (from) {
      setGameTitle(from);
    }
  }, []);

  const postReview = async () => {
    const form = new FormData();

    const reviewData = {
      title: title,
      review: review,
      summary: summary,
      gameTitle: gameTitle,
      score: score.toString(),
    };

    Object.entries(reviewData).forEach(([key, value]) =>
      form.append(key, value)
    );

    tags.forEach((tag) => form.append("tags", tag));

    attributes.forEach((attribute) => {
      Object.entries(attribute).forEach(([key, value]) => {
        form.append(`Attributes[${key}]`, value.toString());
      });
    });

    await PostReview(form);
  };

  const onAttributeChange = (attribute: string, attributeIndex: number) => {
    setAttributes((prev) => {
      const index = prev.findIndex((e) => attribute in e);

      if (index !== -1) {
        const updatedAttributes = [...prev];
        updatedAttributes[index] = { [attribute]: attributeIndex };
        return updatedAttributes;
      }

      const _: Dictionary<string, number> = { [attribute]: attributeIndex };
      return [...prev, _];
    });
  };

  const addTag = (target: HTMLInputElement) => {
    const value = target.value;
    target.value = "";
    setTags([...tags, value]);
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const isScoreValid = () => {
    return score <= 100 && score >= 1;
  };

  return (
    <div className="box-border flex flex-col gap-4 min-h-screen bg-reviewbg w-full sm:pl-5 overflow-hidden sm:p-5 p-2">
      <input
        onChange={(e) => setGameTitle(e.target.value)}
        className="w-full bg-reviewbg text-white placeholder:text-gray-300 text-sm border
               border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
               focus:text-white
                hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Game Title"
        value={gameTitle}
      />

      {game === undefined ? (
        <span className="text-red-400">
          No game found with the given title. Please{" "}
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() => navigate("/creator/game")}
          >
            add a game
          </span>{" "}
          or try a different title.
        </span>
      ) : (
        <div className="border rounded">
          <div className="flex gap-4 cursor-pointer hover:bg-reviewinfobglight p-3 rounded-xl transition-colors duration-300">
            <img
              className="w-[150px] h-[150px] sm:w-[184px] sm:h-[170px] object-cover rounded-lg"
              width={150}
              height={150}
              src={game.imagePath}
              alt={game.title}
            />

            <div className="flex flex-col flex-1">
              <p className="font-semibold truncate">{game.title}</p>
              <div className="text-gray-400 text-sm mt-1 line-clamp-4">
                {game.description}
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-reviewbg text-white placeholder:text-gray-300 text-sm border
               border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
               focus:text-white
                hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Review Title"
      />
      <textarea
        onChange={(e) => {
          setSummaryLenght(e.target.textLength);
          setSummary(e.target.value);
        }}
        className="w-full bg-reviewbg h-full text-white placeholder:text-gray-300 border
               border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
               focus:text-white
                hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Summary"
      />
      <span
        className={`ml-auto text-sm text-gray-300 ${
          summaryLenght >= 500 ? "text-red-500" : ""
        }`}
      >
        {summaryLenght}/500
      </span>

      <textarea
        onChange={(e) => {
          setReviewLenght(e.target.textLength);
          setReview(e.target.value);
        }}
        className="w-full bg-reviewbg h-full text-white placeholder:text-gray-300 border
               border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
               focus:text-white
                hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Review"
      />
      <span
        className={`ml-auto text-sm text-gray-300 ${
          reviewLenght >= 500 ? "text-red-500" : ""
        }`}
      >
        {reviewLenght}/500
      </span>
      <hr className="opacity-20" />
      <div className="mr-auto flex items-center gap-4">
        <input
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-full bg-reviewbg text-white placeholder:text-gray-300 text-sm border
               border-slate-200 rounded-md pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
               focus:text-white
                hover:border-slate-300 shadow-sm focus:shadow"
          type="number"
          placeholder="Score"
        />
        {isScoreValid() && (
          <div className="items-center">
            <div className={`${getScoreBackgroundColor(score)} font-bold p-1`}>
              {score}
            </div>
          </div>
        )}
        {!isScoreValid() && (
          <div className="items-center">
            <div className="text-sm text-red-400">
              <span>The score must be between 1 and 100</span>
            </div>
          </div>
        )}
      </div>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTag(e.target as HTMLInputElement);
          }
        }}
        id="review_creator_input_tag"
        className="w-full bg-reviewbg text-white placeholder:text-gray-300 text-sm border
               border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
               focus:text-white
                hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Search Tags"
      />
      <div className="bg-reviewinfobg flex flex-wrap gap-3 rounded">
        {tags.map((tag, index) => {
          return (
            <span
              onClick={() => removeTag(index)}
              className="bg-reviewbg cursor-pointer hover:bg-reviewinfobglight transition-colors duration-500 p-3 my-1 mx-1 rounded"
              key={`review_tag_${index}`}
            >
              {tag}
            </span>
          );
        })}
      </div>
      <hr className="opacity-20" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MovieReviewAttributes.map((attribute, index) => {
          return (
            <CreatorGameAttribute
              key={`creator_attribute_${index}`}
              onClick={onAttributeChange}
              attribute={attribute.Name}
              attributeValues={attribute.Values}
              imageSource="gg"
            />
          );
        })}
      </div>
      <button
        onClick={postReview}
        className="bg-reviewbg hover:bg-reviewinfobg font-bold text-xl p-3 rounded w-full"
      >
        Submit
      </button>
    </div>
  );
};

export default GameReviewCreator;
