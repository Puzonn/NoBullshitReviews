import { createContext } from "react";
import { FilterContextType } from "src/types/Types";

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export default FilterContext;
