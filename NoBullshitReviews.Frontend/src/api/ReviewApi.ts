export const getBaseUri = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = process.env.REACT_APP_API_PRODUCTION_URI;
      break;
    case "development":
      url = process.env.REACT_APP_API_DEBUG_URI;
    default:
      url = process.env.REACT_APP_API_DEBUG_URI;
  }

  return url;
};

export const PostReview = async (form: FormData) => {
  return await fetch(`https://${getBaseUri()}/review/create`, {
    credentials: "include",
    method: "POST",
    body: form,
  });
};

export const FetchFeed = async () => {
  return await fetch(`https://${getBaseUri()}/feed`, {
    method: "GET",
  });
};

export const FetchQuery = async (query: string) => {
  return await fetch(`https://${getBaseUri()}/review/query?${query}`, {
    credentials: "include",
    method: "GET",
  });
};

export const FetchGame = async (name: string) => {
  return await fetch(`https://${getBaseUri()}/game/${name}`, {
    method: "GET",
  });
};

export const FetchGamesFeed = async () => {
  return await fetch(`https://${getBaseUri()}/feed/games`, {
    method: "GET",
  });
};

export const PostGame = async (form: FormData) => {
  return await fetch(`https://${getBaseUri()}/game/create-base`, {
    body: form,
    credentials: "include",
    method: "POST",
  });
};

export const FetchMovie = async (name: string) => {
  return await fetch(`https://${getBaseUri()}/movie/${name}`, {
    method: "GET",
  });
};

export const PostMovie = async (form: FormData) => {
  return await fetch(`https://${getBaseUri()}/movie/create-base`, {
    body: form,
    credentials: "include",
    method: "POST",
  });
};

export const FetchLatestGames = async () => {
  return await fetch(`https://${getBaseUri()}/game/latest`, {
    method: "GET",
  });
};
