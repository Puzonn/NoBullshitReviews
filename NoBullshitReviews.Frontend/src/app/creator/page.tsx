"use client";

import CreatorGameAttribute from "@/app/components/CreatorGameAttribute";
import { getScoreBackgroundColor } from "@/app/global/Colors";
import { Attributes, Dictionary } from "@/app/types/Types";
import { useState } from "react";

const createDefaultAttributeDictionary = () => {
  const names = Attributes.map((x) => x.Name);
  const dic: Dictionary<string, number>[] = names.map(
    (x) => ({ [x]: 0 } as Dictionary<string, number>)
  );

  return dic;
};

const Creator = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [contentLenght, setContentLenght] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [attributes, setAttributes] = useState<Dictionary<string, number>[]>(
    createDefaultAttributeDictionary()
  );

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

  const postReview = async () => {
    const form = new FormData();

    form.append("image", image!);
    form.append("title", title);
    form.append("content", content);
    form.append("tags", JSON.stringify(tags));
    form.append("score", score.toString());
    form.append("graphics", getAttributeValue("Graphics"));
    form.append("gameplay", getAttributeValue("Gameplay"));
    form.append("audio", getAttributeValue("Audio"));
    form.append("audience", getAttributeValue("Audience"));
    form.append("requirements", getAttributeValue("PC Requirements"));
    form.append("gameSize", getAttributeValue("Game Size"));
    form.append("difficulty", getAttributeValue("Difficulty"));
    form.append("story", getAttributeValue("Story"));
    form.append("gameTime", getAttributeValue("Game Time"));
    form.append("bugs", getAttributeValue("Bugs"));

    const response = await fetch("https://localhost:7106/review/create", {
      method: "POST",
      body: form,
    });
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

  const getAttributeValue = (attribute: string): string => {
    const value = attributes.find((e) => attribute in e)?.[attribute];
    return value!.toString();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 items-start mx-2 my-2  shadow-[0_2px_4px_rgba(255,255,255,0.04),_0_8px_16px_rgba(0,0,0,0.6)] bg-reviewinfobglight p-5 rounded">
        <div className="w-full max-w-sm md:max-w-fit min-w-[200px]">
          <div className="relative flex flex-col gap-4 items-center">
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-reviewbg text-white placeholder:text-gray-300 text-sm border
               border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
               focus:text-white
                hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Game Title"
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
                Review Image
              </label>
              <input
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full file:bg-reviewinfobglight file:text-white file:rounded file:font-medium mb-5 text-gray-300 border py-1 px-1 transition duration-300 ease border-gray-300 rounded-lg cursor-pointer bg-reviewbg focus:outline-none"
                id="image"
                type="file"
                accept="image/png, image/jpeg"
              />
            </div>

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
                  <div
                    className={`${getScoreBackgroundColor(
                      score
                    )} font-bold p-1`}
                  >
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
              {Attributes.map((attribute, index) => {
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
              type="submit"
              className="bg-reviewbg hover:bg-reviewinfobg font-bold text-xl p-3 rounded w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
