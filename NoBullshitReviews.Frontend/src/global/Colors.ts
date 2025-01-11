export const getScoreBackgroundColor = (score: number) => {
  if (score <= 100 && score >= 79) {
    return "bg-green-600";
  } else if (score < 79 && score >= 59) {
    return "bg-yellow-600";
  } else {
    return "bg-red-600";
  }
};
