import { ContentType } from "src/types/Types";
import FilterSelector from "./FilterSelector";
import { useFilterManager } from "src/providers/FilterProvider";

const Filter = ({
  setFilter,
  currentFilter,
}: {
  setFilter: (contentType: ContentType) => void;
  currentFilter: ContentType;
}) => {
  const filterManager = useFilterManager("");

  return (
    <div className="flex flex-col font-medium">
      <div className="flex gap-1">
        <div
          onClick={() => setFilter(ContentType.Any)}
          className={`p-3 w-[90px] text-center cursor-pointer rounded-tl-xl bg-reviewinfobg transition-colors duration-200 ${
            currentFilter === ContentType.Any
              ? "bg-reviewinfobglight text-white font-bold"
              : ""
          }`}
        >
          All
        </div>
        <div
          onClick={() => setFilter(ContentType.ReviewMovie)}
          className={`p-3 w-[110px] text-center flex gap-3 items-center cursor-pointer bg-reviewinfobg transition-colors duration-200 ${
            currentFilter === ContentType.ReviewMovie
              ? "bg-reviewinfobglight text-white font-bold"
              : ""
          }`}
        >
          <img
            src="/assets/icons/video.png"
            className="w-[20px] h-[20px]"
            alt=""
          />
          <span>Movies</span>
        </div>
        <div
          onClick={() => setFilter(ContentType.ReviewGame)}
          className={`p-3 w-[110px] text-center flex gap-3 items-center cursor-pointer rounded-tr-xl transition-colors duration-200 bg-reviewinfobg ${
            currentFilter === ContentType.ReviewGame
              ? "bg-reviewinfobglight text-white font-bold"
              : ""
          }`}
        >
          <img
            src="/assets/icons/gamepad.png"
            className="w-[20px] h-[20px]"
            alt=""
          />
          <span>Games</span>
        </div>
      </div>

      <div className="flex gap-5 flex-wrap w-full bg-reviewinfobglight border-t rounded-br-xl border-gray-400">
        <FilterSelector selectors={[""]} selectorName="Content Type" />
        <FilterSelector
          selectors={["Windows", "Linux", "Playstation"]}
          selectorName="Platform"
        />
      </div>
      <div className="pt-1 flex gap-2">
        {filterManager.flatFilterValues().map((filter) => {
          return (
            <div
              onClick={() => filterManager.removeFilterFromAnySelector(filter)}
              className="flex w-fit bg-reviewinfobg p-1 items-center gap-1 cursor-pointer hover:scale-[105%]"
            >
              <span className="text-sm">{filter}</span>
              <img
                src="/assets/icons/close.png"
                className=" w-[12px] h-[12px]"
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
