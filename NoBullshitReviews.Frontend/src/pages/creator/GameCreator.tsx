import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostGame } from "src/api/ReviewApi";
import { IGame } from "src/types/Types";

const GameCreator = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
  const [developer, setDeveloper] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [initialRelease, setInitialRelease] = useState<Date>(new Date());
  const [image, setImage] = useState<File | null>(null);
  const [platforms, setPlatforms] = useState<string[]>([]);

  const platformClicked = (selector: string) => {
    setPlatforms((prev) =>
      prev.includes(selector)
        ? prev.filter((x) => x !== selector)
        : [...prev, selector]
    );
  };

  const platformSelected = (selector: string) => {
    return platforms.includes(selector);
  };

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
      publisher: publisher,
      developer: developer,
      initialRelease: initialRelease.toISOString(),
    };

    Object.entries(reviewData).forEach(([key, value]) =>
      form.append(key, value.toString())
    );

    platforms.forEach((platform) => form.append("platforms", platform));
    tags.forEach((tag) => form.append("tags", tag));

    if (image) form.append("image", image);

    await PostGame(form).then((e) => {
      e.json().then((r) => {
        const game = r as IGame;
        navigate(`/game/${game.routeName}`);
      });
    });
  };

  return (
    <div className="box-border flex flex-col gap-4 min-h-screen bg-reviewbg w-full sm:pl-5 overflow-hidden sm:p-5 p-2">
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
          Game Image
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
          setDeveloper(e.target.value);
        }}
        className="w-full bg-reviewbg text-white placeholder:text-gray-300 text-sm border
               border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
               focus:text-white
                hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Developer"
      />
      <input
        type="text"
        onChange={(e) => {
          setPublisher(e.target.value);
        }}
        className="w-full bg-reviewbg text-white placeholder:text-gray-300 text-sm border
               border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
               focus:text-white
                hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Publisher"
      />
      <hr className="opacity-20" />
      <div>
        <span>Platforms</span>
        <div className={`border border-gray-400 rounded bg-reviewbg w-fit`}>
          <ul className="flex flex-col gap-2 p-2">
            {["Windows", "Linux", "Playstation"].map((selector, index) => (
              <li
                onClick={() => {
                  platformClicked(selector);
                }}
                key={`selector_${index}`}
                className="grid grid-cols-[16px_1px_16px_auto] items-center gap-3 hover:bg-reviewinfobglight p-2 rounded cursor-pointer"
              >
                <div className={`w-4 h-4 border-2 border-white relative`}>
                  <img
                    src={`/assets/icons/check.png`}
                    alt={`${selector}_icon`}
                    className={`w-[16px] h-[16px] -translate-y-[2px]  ${
                      platformSelected(selector) ? "" : "hidden"
                    }`}
                  />
                </div>
                <div className="w-[1px] h-4 bg-gray-500"></div>
                <img
                  src={`/assets/icons/${selector.toLowerCase()}.png`}
                  alt={`${selector}_icon`}
                  className="w-4 h-4"
                />
                <span className="text-sm">{selector}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
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

export default GameCreator;
