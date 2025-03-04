import Featured from "src/components/Featured/Featured";
import { ContentType, Feed, GameFeed, IDash } from "../types/Types";
import { useEffect, useState } from "react";
import Latest from "src/components/Latest";
import { FetchFeed, FetchGamesFeed } from "src/api/ReviewApi";
import Filter from "src/components/Filter/Filter";
import { useFilterManager } from "src/providers/FilterProvider";

export default function Main() {
  const [feed, setFeed] = useState<Feed | undefined>(undefined);
  const [mainFeed, setMainFeed] = useState<Feed | undefined>();
  const [gamesFeed, setGamesFeed] = useState<GameFeed | undefined>(undefined);

  const filterManager = useFilterManager("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await FetchFeed().then((e) => {
          e.json().then((e) => {
            setMainFeed(e);
            setFeed(e);
          });
        });
      } catch (e) {}
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (feed === undefined) return;

    const fetchGamesFeed = async () => {
      try {
        const response = await FetchGamesFeed();
        const data = await response.json();
        setGamesFeed(data);
      } catch (error) {
        console.error("Failed to fetch games feed", error);
      }
    };

    if (filterManager.contentType === ContentType.Games) {
      if (!gamesFeed) {
        fetchGamesFeed();
      } else {
        setFeed({
          mostRecent: gamesFeed.latest,
          featured: gamesFeed.best,
        });
      }
    } else {
      setFeed(mainFeed);
    }
  }, [filterManager.contentType, feed, gamesFeed]);

  if (feed === undefined) {
    return;
  }

  return (
    <div className="box-border bg-reviewbg w-full">
      <div className="pb-20 gap-8 p-4 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-3 justify-start">
          <Featured dashes={feed.featured} />
          <Filter />
          <Latest dashes={feed.mostRecent} />
        </div>
      </div>
    </div>
  );
}
