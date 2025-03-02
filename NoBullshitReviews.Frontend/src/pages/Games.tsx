import { useEffect, useState } from "react";
import { FetchGameFeed } from "src/api/ReviewApi";
import { GameFeed } from "src/types/Types";

const Games = () => {
  const [feed, setFeed] = useState<GameFeed>(undefined);

  useEffect(() => {
    FetchGameFeed().then((r) => {
      r.json().then((r) => {
        setFeed(r);
      });
    });
  }, []);

  useEffect(() => {
    console.log(feed);
  }, [feed]);

  return <></>;
};

export default Games;
