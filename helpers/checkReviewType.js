import calculateReviews from "./calculateReviews";

const checkReviewType = (reviews = []) => {
  const types = {
    good: 0,
    moderate: 0,
    bad: 0,
  };

  reviews.map((review) => {
    switch (review.type) {
      case "good":
        types.good += 1;
        break;
      case "moderate":
        types.moderate += 1;
        break;
      case "bad":
        types.bad += 1;
        break;
      default:
        break;
    }
  });

  return calculateReviews(types, reviews.length);
};

export default checkReviewType;
