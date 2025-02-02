import { useNavigate } from "react-router-dom";

const Creator = () => {
  const navigate = useNavigate();

  return (
    <div className="box-border flex flex-col min-h-screen bg-reviewbg w-full sm:pl-5 overflow-hidden">
      <div className="pb-20 gap-8 p-4">
        <div className="flex-col text-center flex gap-3">
          <span className="text-xl font-semibold">Create Review</span>
          <div className="flex gap-3 justify-center pt-2">
            <div
              onClick={() => navigate("/creator/review/movie")}
              className={`p-4 w-[90px] text-center r rounded-l-3xl cursor-pointer bg-reviewinfobglight`}
            >
              Movies
            </div>
            <div
              onClick={() => navigate("/creator/review/game")}
              className={`p-4 w-[90px] text-center r rounded-r-3xl cursor-pointer bg-reviewinfobglight`}
            >
              Games
            </div>
          </div>
          <span className="text-xl font-semibold">Create News</span>
          <div className="flex gap-3 justify-center pt-2">
            <div
              onClick={() => navigate("/creator/news/game")}
              className={`p-4 w-[90px] text-center r rounded-r-3xl cursor-pointer bg-reviewinfobglight`}
            >
              Games
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
