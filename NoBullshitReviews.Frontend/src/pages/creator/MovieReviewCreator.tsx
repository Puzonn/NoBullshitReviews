import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchMovie, FetchQuery, PostReview } from "src/api/ReviewApi";
import CreatorGameAttribute from "src/components/creator/CreatorGameAttribute";
import { getScoreBackgroundColor } from "src/global/Colors";
import {
  Dictionary,
  MovieReviewAttributes,
  ContentType,
  IMovie,
} from "src/types/Types";
import { CreateDefaultAttributeDictionary } from "src/utils/CreatorUtils";

const MovieReviewCreator = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState<IMovie>(undefined);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [contentLenght, setContentLenght] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [attributes, setAttributes] = useState<Dictionary<string, number>[]>(
    CreateDefaultAttributeDictionary(MovieReviewAttributes)
  );

  const postReview = async () => {
    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("tags", JSON.stringify(tags));
    form.append("score", score.toString());
    form.append("reviewType", ContentType.ReviewMovie.toString());

    const mappedAttributes = attributes.reduce<Record<string, number>>(
      (acc, obj) => {
        const key = Object.keys(obj)[0];
        acc[key] = obj[key];
        return acc;
      },
      {}
    );

    Object.entries(mappedAttributes).forEach(([key, value]) => {
      form.append(`Attributes[${key}]`, value.toString());
    });

    /* TODO: Handle errors */
    const response = await PostReview(form);
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

  useEffect(() => {
    const handler = setTimeout(async () => {
      await FetchMovie(title).then((e) => {
        if (e.status !== 200) {
          setMovie(undefined);
        } else {
          e.json().then((e) => {
            setMovie(e);
          });
        }
      });
    }, 800);

    return () => clearTimeout(handler);
  }, [title]);

  return (
    <div className="box-border flex flex-col gap-4 min-h-screen bg-reviewbg w-full sm:pl-5 overflow-hidden p-5">
      <input
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-reviewbg text-white placeholder:text-gray-300 text-sm border
             border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
             focus:text-white
              hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Movie Title"
      />
      {movie === undefined ? (
        <span className="text-red-400">
          No movie found with the given title. Please{" "}
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() => navigate("/creator/movie")}
          >
            add a movie
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
              src={movie.imagePath}
              alt={movie.title}
            />

            <div className="flex flex-col flex-1">
              <p className="font-semibold truncate">{movie.title}</p>
              <div className="text-gray-400 text-sm mt-1 line-clamp-4">
                {movie.description}
              </div>
            </div>
          </div>
        </div>
      )}

      <textarea
        onChange={(e) => {
          setContentLenght(e.target.textLength);
          setContent(e.target.value);
        }}
        className="w-full bg-reviewbg h-full text-white placeholder:text-gray-300 border
             border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
             focus:text-white
              hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Content"
      />
      <span
        className={`ml-auto text-sm text-gray-300 ${
          contentLenght >= 500 ? "text-red-500" : ""
        }`}
      >
        {contentLenght}/500
      </span>

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
             border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
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

export default MovieReviewCreator;
