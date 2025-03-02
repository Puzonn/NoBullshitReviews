import { useState } from "react";
import { PostReview } from "src/api/ReviewApi";
import { Dictionary, GameReviewAttributes, ContentType } from "src/types/Types";
import { CreateDefaultAttributeDictionary } from "src/utils/Utils";

const GameNewsCreator = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [contentLenght, setContentLenght] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [attributes, setAttributes] = useState<Dictionary<string, number>[]>(
    CreateDefaultAttributeDictionary(GameReviewAttributes)
  );

  const postReview = async () => {
    const form = new FormData();

    form.append("image", image!);
    form.append("title", title);
    form.append("content", content);
    form.append("tags", JSON.stringify(tags));
    form.append("score", score.toString());
    form.append("reviewType", ContentType.NewsGame.toString());

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

  return (
    <div className="box-border flex flex-col gap-4 min-h-screen bg-reviewbg w-full sm:pl-5 overflow-hidden p-5 sm:p-20">
      <input
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-reviewbg text-white placeholder:text-gray-300 text-sm border
               border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
               focus:text-white
                hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="News Title"
      />
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

      <div className="mr-auto">
        <label className="text-medium" htmlFor="image">
          Thumbnail
        </label>
        <input
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full file:bg-reviewinfobglight file:text-white file:rounded file:font-medium mb-5 text-gray-300 border py-1 px-1 transition duration-300 ease border-gray-300 rounded-lg cursor-pointer bg-reviewbg focus:outline-none"
          id="image"
          type="file"
          accept="image/png, image/jpeg"
        />
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
      <button
        onClick={postReview}
        className="bg-reviewbg hover:bg-reviewinfobg font-bold text-xl p-3 rounded w-full"
      >
        Submit
      </button>
    </div>
  );
};

export default GameNewsCreator;
