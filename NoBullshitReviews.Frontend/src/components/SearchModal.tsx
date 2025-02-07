import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FetchQuery } from "src/api/ReviewApi";
import { ContentType, IReview } from "src/types/Types";
import { getScoreBackgroundColor } from "src/global/Colors";
import { GetTag } from "src/utils/CreatorUtils";

const SearchModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [filter, setFilter] = useState<ContentType>(ContentType.Any);
  const [query, setQuery] = useState<string>("");
  const [fetchedQuery, setFetchedQuery] = useState<IReview[]>([]);

  useEffect(() => {
    if (!query) return;

    const handler = setTimeout(async () => {
      await FetchQuery(`query=${query}`).then((e) => {
        if (e.status !== 200) {
          setFetchedQuery([]);
        } else {
          e.json().then((e) => {
            setFetchedQuery(e);
          });
        }
      });
    }, 800);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    ["blur-2xl", "overflow-hidden"].forEach((cls) =>
      document.getElementById("root")?.classList.toggle(cls, isOpen)
    );

    const modal = document.getElementById("search_modal");
    if (modal) {
      ["w-full", "h-full", "absolute", "z-50"].forEach((cls) =>
        modal.classList.toggle(cls, isOpen)
      );
    }
  }, [isOpen]);

  if (!isOpen) {
    return <></>;
  }

  return createPortal(
    <div className="fixed bg-opacity-80 inset-0 flex items-center justify-center py-5">
      <div className="flex flex-col gap-3 bg-reviewbg p-5 rounded-xl w-full h-full max-w-md">
        <div className="flex justify-between items-center w-full">
          <span className="flex-1 text-center font-bold pl-6">Search</span>
          <img
            onClick={() => close()}
            src="/assets/icons/close.png"
            className="ml-2 w-5 cursor-pointer"
            alt=""
          />
        </div>
        <div className="flex gap-2 pb-5 font-medium justify-center">
          <div
            onClick={() => setFilter(ContentType.Any)}
            className={`p-4 w-[90px] text-center cursor-pointer rounded-l-3xl bg-reviewinfobglight transition-colors duration-200 ${
              filter === ContentType.Any ? "bg-slate-300 text-black" : ""
            }`}
          >
            All
          </div>
          <div
            onClick={() => setFilter(ContentType.ReviewMovie)}
            className={`p-4 w-[90px] text-center  cursor-pointer bg-reviewinfobglight transition-colors duration-200 ${
              filter === ContentType.ReviewMovie
                ? "bg-slate-300 text-black"
                : ""
            }`}
          >
            Movies
          </div>
          <div
            onClick={() => setFilter(ContentType.ReviewGame)}
            className={`p-4 w-[90px] text-center  cursor-pointer rounded-r-3xl bg-reviewinfobglight transition-colors duration-200 ${
              filter === ContentType.ReviewGame ? "bg-slate-300 text-black" : ""
            }`}
          >
            Games
          </div>
        </div>
        <input
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-reviewinfobglight text-white placeholder:text-gray-300 text-sm border
                 border-slate-200 rounded-md px-4 py-2 transition duration-300 ease-in-out focus:outline-none
                 focus:border-slate-400 focus:text-white hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Search"
        />
        <div className="h-full overflow-scroll overflow-x-hidden">
          {fetchedQuery.length > 0 &&
            new Array(5).fill(fetchedQuery[0]).map((review, index) => {
              return (
                <div className="flex gap-4 cursor-pointer hover:bg-reviewinfobglight p-3 rounded-xl transition-colors duration-300">
                  <img
                    className="w-[150px] h-[150px] sm:w-[184px] sm:h-[170px] object-cover rounded-lg"
                    width={150}
                    height={150}
                    src={`/assets/static/${review.imagePath}`}
                    alt={review.title}
                  />

                  <div className="flex flex-col flex-1">
                    <p className="font-semibold truncate">{review.title}</p>
                    <div className="text-gray-400 text-sm mt-1 line-clamp-4">
                      {review.summary}
                    </div>
                    <div className="mt-auto flex items-center gap-3">
                      <span
                        className={`rounded p-2 font-medium ${getScoreBackgroundColor(
                          review.score
                        )}`}
                      >
                        {review.score}
                      </span>

                      <span className="border border-white px-2 py-1 rounded font-medium">
                        {GetTag(review)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>,
    document.getElementById("search_modal")
  );
};
export default SearchModal;
