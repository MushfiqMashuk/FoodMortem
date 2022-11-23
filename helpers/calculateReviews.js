const calculateReviews = (types = {}, totalReview) => {
  const reviewPercentage = {
    positive: 0,
    moderate: 0,
    negative: 0,
  };

  reviewPercentage.positive = ((100 / totalReview) * types.positive).toFixed();
  reviewPercentage.moderate = ((100 / totalReview) * types.moderate).toFixed();
  reviewPercentage.negative = ((100 / totalReview) * types.negative).toFixed();

  return reviewPercentage;
};

export default calculateReviews;
