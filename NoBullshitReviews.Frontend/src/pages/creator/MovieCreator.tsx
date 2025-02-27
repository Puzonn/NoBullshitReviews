import { useState } from "react";
import { PostMovie } from "src/api/ReviewApi";

const MovieCreator = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [studio, setStudio] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [initialRelease, setInitialRelease] = useState<Date>(new Date());
  const [image, setImage] = useState<File | null>(null);

  const tagChanged = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]
    );
  };

  const submit = async () => {
    const form = new FormData();

    const reviewData = {
      title: title,
      description: description,
      studio: studio,
      initialRelease: initialRelease.toISOString(),
    };

    Object.entries(reviewData).forEach(([key, value]) =>
      form.append(key, value.toString())
    );

    tags.forEach((tag) => form.append("tags", tag));

    if (image) form.append("image", image);

    await PostMovie(form);
  };

  return (
    <div className="box-border flex flex-col gap-4 min-h-screen bg-reviewbg w-full sm:pl-5 overflow-hidden sm:p-5 p-2">
      <input
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-reviewbg text-white placeholder:text-gray-300 text-sm border
           border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
           focus:text-white
            hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Movie Title"
      />
      <textarea
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        className="w-full bg-reviewbg h-full text-white placeholder:text-gray-300 border
        border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
        focus:text-white
        hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Description"
      />
      <span
        className={`ml-auto text-sm text-gray-300 ${
          description.length >= 500 ? "text-red-500" : ""
        }`}
      >
        {description.length}/500
      </span>
      <hr className="opacity-20" />
      <div className="mr-auto">
        <label className="text-medium" htmlFor="initial_release">
          Initial Release
        </label>
        <input
          type="date"
          onChange={(e) => setInitialRelease(new Date(e.target.value))}
          className="w-full file:bg-reviewinfobglight file:text-white file:rounded file:font-medium text-gray-300 border p-1 transition duration-300 ease border-gray-300 rounded-lg cursor-pointer bg-reviewbg focus:outline-none"
          id="initial_release"
        />
      </div>

      <div className="mr-auto">
        <label className="text-medium" htmlFor="image">
          Movie Image
        </label>
        <input
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full file:bg-reviewinfobglight file:text-white file:rounded file:font-medium mb-5 text-gray-300 border py-1 px-1 transition duration-300 ease border-gray-300 rounded-lg cursor-pointer bg-reviewbg focus:outline-none"
          id="image"
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
      <hr className="opacity-20" />
      <input
        type="text"
        onChange={(e) => {
          setStudio(e.target.value);
        }}
        className="w-full bg-reviewbg text-white placeholder:text-gray-300 text-sm border
               border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
               focus:text-white
                hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Studio"
      />
      <hr className="opacity-20" />
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            tagChanged((e.target as HTMLInputElement).value);
            (
              document.getElementById(
                "review_creator_input_tag"
              ) as HTMLInputElement
            ).value = "";
          }
        }}
        id="review_creator_input_tag"
        className="w-full bg-reviewbg text-white placeholder:text-gray-300 text-sm border
           border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
           focus:text-white
        hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Search Tags"
      />

      <div className="flex flex-wrap gap-3 rounded">
        {tags.map((tag, index) => {
          return (
            <div
              onClick={() => tagChanged(tag)}
              className="flex w-fit bg-reviewinfobg p-1 items-center gap-1 cursor-pointer hover:scale-[105%]"
            >
              <span className="text-sm">{tag}</span>
              <img
                src="/assets/icons/close.png"
                className=" w-[12px] h-[12px]"
                alt=""
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={submit}
        className="p-4 text-xl font-semibold bg-reviewinfobglight hover:scale-[101%] mx-5"
        type="submit"
      >
        Submit
      </button>
    </div>
  );
};

export default MovieCreator;
