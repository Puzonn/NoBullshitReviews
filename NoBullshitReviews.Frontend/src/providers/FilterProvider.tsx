import { useContext, useState } from "react";
import FilterContext from "src/contexes/FilterContext";
import { Dictionary } from "src/types/Types";

const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState<Dictionary<string, string[]>>({});

  const isSelected = (selectorName: string, value: string) => {
    return filters?.[selectorName]?.includes(value) ?? false;
  };

  const flatFilterValues = (): string[] => {
    return Object.values(filters).flat();
  };

  const removeFilterFromAnySelector = (filter: string): void => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      Object.keys(newFilters).forEach((selectorName) => {
        newFilters[selectorName] = newFilters[selectorName].filter(
          (f) => f !== filter
        );
      });

      return newFilters;
    });
  };

  const addFilter = (selectorName: string, filter: string): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [selectorName]: [...(prevFilters[selectorName] || []), filter],
    }));
  };

  const removeFilter = (selectorName: string, filter: string): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [selectorName]:
        prevFilters[selectorName]?.filter((f) => f !== filter) || [],
    }));
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        addFilter,
        removeFilter,
        isSelected,
        flatFilterValues,
        removeFilterFromAnySelector,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;

export const useFilterManager = (selectorName: string) => {
  const context = useContext(FilterContext);
  const filters =
    context.filters; /* TODO: Wierd way to pass filters as argument but eslint wasn't making this easy :)) */

  if (!context) {
    throw new Error(
      "useFilterManager must be used within a FilterManagerProvider"
    );
  }

  return {
    filters,
    flatFilterValues: () => context.flatFilterValues(),
    isSelected: (value: string) => context.isSelected(selectorName, value),
    addFilter: (value: string) => context.addFilter(selectorName, value),
    removeFilter: (value: string) => context.removeFilter(selectorName, value),
    removeFilterFromAnySelector: (value: string) =>
      context.removeFilterFromAnySelector(value),
  };
};
