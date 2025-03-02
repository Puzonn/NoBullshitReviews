export const PostReview = async (form: FormData) => {
  return await fetch("https://localhost:7106/review/create", {
    credentials: "include",
    method: "POST",
    body: form,
  });
};

export const FetchFeed = async () => {
  return await fetch("https://localhost:7106/feed", {
    method: "GET",
  });
};

export const FetchQuery = async (query: string) => {
  return await fetch(`https://localhost:7106/review/query?${query}`, {
    credentials: "include",
    method: "GET",
  });
};

export const FetchGame = async (name: string) => {
  return await fetch(`https://localhost:7106/game/${name}`, {
    method: "GET",
  });
};

export const FetchGameFeed = async () => {
  return await fetch(`https://localhost:7106/feed/games`, {
    method: "GET",
  });
};

export const PostGame = async (form: FormData) => {
  return await fetch(`https://localhost:7106/game/create-base`, {
    body: form,
    credentials: "include",
    method: "POST",
  });
};

export const FetchMovie = async (name: string) => {
  return await fetch(`https://localhost:7106/movie/${name}`, {
    method: "GET",
  });
};

export const PostMovie = async (form: FormData) => {
  return await fetch(`https://localhost:7106/movie/create-base`, {
    body: form,
    credentials: "include",
    method: "POST",
  });
};

export const FetchLatestGames = async () => {
  return await fetch(`https://localhost:7106/game/latest`, {
    method: "GET",
  });
};
