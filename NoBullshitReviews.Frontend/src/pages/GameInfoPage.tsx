import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FetchGame } from "src/api/ReviewApi";
import { getScoreBackgroundColor } from "src/global/Colors";
import { IGame } from "src/types/Types";
import { FormatDate } from "src/utils/Utils";

const GameInfoPage = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState<IGame>(undefined);
  const { route } = useParams<{ route: string }>();

  useEffect(() => {
    FetchGame(route).then((e) => {
      e.json().then((e) => {
        setGame(e);
      });
    });
  }, []);

  if (game === undefined) {
    return <></>;
  }

  return (
    <div className="flex justify-center w-full">
      <div className="transition-colors duration-500 rounded w-full max-w-[90vw] px-5 py-5 md:px-5 2xl:px-64">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-[2fr,5fr] gap-5 bg-reviewinfobglight rounded-xl p-5">
            <div className="flex justify-center sm:justify-start w-full h-full">
              <img
                className="max-h-[260px] w-full object-cover rounded-xl"
                src={game.imagePath}
                alt={game.title}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold">{game.title}</span>
              <div className="mt-5">
                <div className="flex justify-between">
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className={`${getScoreBackgroundColor(
                        game.score
                      )} flex justify-center items-center rounded text-4xl w-[64] p-3 h-[64]`}
                    >
                      {game.score}
                    </div>
                    <span>Average Score</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => {
                    navigate(`/creator/review/game?from=${game.title}`);
                  }}
                  className="border mt-5 md:mt-0 hover:bg-reviewinfobglight border-white w-full py-1"
                >
                  Add My Review
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-reviewinfobglight p-5 rounded-xl">
            <span className="font-bold text-xl pb-2">Description</span>
            <span>{game.description}</span>
          </div>
          <div className="bg-reviewinfobglight p-5 flex rounded-xl">
            <div className="flex text-sm gap-5 flex-wrap">
              <div className="flex flex-col">
                <span className="font-semibold">Initlial Release</span>
                <span>{FormatDate(new Date(game.initialRelease))}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Developer</span>
                <span>{game.developer}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Publishers</span>
                <span>{game.publisher}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfoPage;
