import { Dictionary } from "src/types/Types";

const CreatorGameAttribute = ({
  attribute,
  attributeValues,
  imageSource,
  onClick,
}: {
  attribute: string;
  attributeValues: Dictionary<string, string>[];
  imageSource: string;
  onClick: (attribute: string, attributeIndex: number) => void;
}) => {
  return (
    <div>
      <label className="font-medium" htmlFor="gameplay">
        {attribute}
      </label>
      <select
        onChange={(e) => {
          onClick(attribute, e.target.selectedIndex);
        }}
        defaultValue="na"
        id="gameplay"
        className="bg-reviewbg text-sm rounded-lg block border w-full p-2.5 border-slate-200 pl-3 pr-10 py-2
          transition duration-300 ease focus:outline-none focus:border-slate-400 focus:text-white hover:border-slate-300 shadow-sm focus:shadow"
      >
        {attributeValues.map((value, index) =>
          Object.entries(value).map(([key, val]) => (
            <option key={`${key}_${index}`} value={key}>
              {val}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default CreatorGameAttribute;
