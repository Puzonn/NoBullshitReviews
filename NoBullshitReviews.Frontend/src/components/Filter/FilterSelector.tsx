import { useEffect, useRef, useState } from "react";
import { useFilterManager } from "src/Providers/FilterProvider";

const FilterSelector = ({
  selectorName,
  selectors,
}: {
  selectorName: string;
  selectors: string[];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filterManager = useFilterManager(selectorName);

  const select = (filter: string) => {
    if (filterManager.isSelected(filter)) {
      filterManager.removeFilter(filter);
    } else {
      filterManager.addFilter(filter);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="hover:bg-reviewinfobg cursor-pointer p-3 flex items-center gap-2"
      >
        <span>{selectorName}</span>
        {/* {filterManager..length > 0 && (
          <div className="w-6 bg-white text-black flex items-center justify-center font-semibold rounded-full">
            <span>{selected.length}</span>
          </div>
        )} */}

        <img
          src="/assets/icons/arrow.png"
          className="w-3 h-3 rotate-90 ml-2"
          alt="arrow"
        />
      </div>

      <div
        className={`absolute border border-gray-400 rounded bg-reviewbg translate-y-[5px] z-10 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-2 p-2">
          {selectors.map((selector, index) => (
            <li
              onClick={() => {
                select(selector);
              }}
              key={`selector_${index}`}
              className="grid grid-cols-[16px_1px_16px_auto] items-center gap-3 hover:bg-reviewinfobglight p-2 rounded cursor-pointer"
            >
              <div
                className={`w-4 h-4 border-2 border-white relative ${
                  filterManager.isSelected(selector) ? "" : ""
                }`}
              >
                <img
                  src={`/assets/icons/check.png`}
                  alt={`${selector}_icon`}
                  className={`w-[16px] h-[16px] -translate-y-[2px] ${
                    filterManager.isSelected(selector) ? "" : "hidden"
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
  );
};

export default FilterSelector;
