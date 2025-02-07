import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ContentType } from "src/types/Types";

const SearchModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [filter, setFilter] = useState<ContentType>(ContentType.Any);
  useEffect(() => {
    document.getElementById("root")?.classList.toggle("blur-2xl", isOpen);

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
    <div className="fixed bg-opacity-80 inset-0 flex items-center justify-center z-50 p-5 filter-none backdrop-filter-none">
      <div className="flex flex-col bg-reviewbg p-8 rounded-xl w-full max-w-md">
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
          className="w-full bg-reviewinfobglight text-white placeholder:text-gray-300 text-sm border
                 border-slate-200 rounded-md px-4 py-2 transition duration-300 ease-in-out focus:outline-none
                 focus:border-slate-400 focus:text-white hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Search"
        />
        <div className="mt-auto flex justify-center pt-5">
          <button
            className="px-4 py-2 border-2 border-white text-white rounded-lg"
            onClick={close}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("search_modal")
  );
};
export default SearchModal;
