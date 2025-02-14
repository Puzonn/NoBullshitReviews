export const PostReview = async (form: FormData) => {
  return await fetch("https://localhost:7106/review/create", {
    credentials: "include",
    method: "POST",
    body: form,
  });
};

export const FetchFeed = async () => {
  return await fetch("https://localhost:7106/review/feed", {
    credentials: "include",
    method: "GET",
  });
};

export const FetchQuery = async (query: string) => {
  return await fetch(`https://localhost:7106/review/query?${query}`, {
    credentials: "include",
    method: "GET",
  });
};

export const PostGame = async (form: FormData) => {
  return await fetch(`https://localhost:7106/game/create`, {
    body: form,
    credentials: "include",
    method: "POST",
  });
};
