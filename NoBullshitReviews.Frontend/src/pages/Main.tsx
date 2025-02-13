import Featured from "src/components/Featured/Featured";
import { IReview, ContentType, Feed } from "../types/Types";
import { useEffect, useState } from "react";
import Latest from "src/components/Latest";
import { FetchFeed } from "src/api/ReviewApi";
import Filter from "src/components/Filter/Filter";

export default function Main() {
  const [feed, setFeed] = useState<Feed | undefined>(undefined);
  const [filtredReviews, setFiltredReviews] = useState<IReview[]>([]);
  const [filter, setFilter] = useState<ContentType>(ContentType.Any);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await FetchFeed().then((e) => {
          e.json().then((e) => {
            setFeed(e);
            setFiltredReviews(e.mostRecent);
          });
        });
      } catch (e) {}
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (feed === undefined) {
      return;
    }
    setFiltredReviews((prev) => {
      if (filter !== ContentType.Any) {
        return feed.mostRecent.filter((x) => x.reviewType === filter);
      }

      return feed.mostRecent;
    });
  }, [filter, feed]);

  if (feed === undefined) {
    return;
  }

  return (
    <div className="box-border bg-reviewbg w-full">
      <div className="pb-20 gap-8 p-4 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-3 justify-start">
          <Featured featured={feed.featured} />
          <Filter setFilter={setFilter} currentFilter={filter} />
          <Latest reviews={filtredReviews} />
        </div>
      </div>
    </div>
  );
}
