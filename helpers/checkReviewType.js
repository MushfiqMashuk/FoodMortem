import calculateReviews from "./calculateReviews";

const checkReviewType = (reviews = []) => {
  const types = {
    positive: 0,
    moderate: 0,
    negative: 0,
  };

  reviews.map((review) => {
    switch (review.type) {
      case "positive":
        types.positive += 1;
        break;
      case "moderate":
        types.moderate += 1;
        break;
      case "negative":
        types.negative += 1;
        break;
      default:
        break;
    }
  });

  return calculateReviews(types, reviews.length);
};

export default checkReviewType;
