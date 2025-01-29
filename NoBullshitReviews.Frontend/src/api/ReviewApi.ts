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
}