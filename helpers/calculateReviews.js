const calculateReviews = (types = {}, totalReview) => {
  const reviewPercentage = {
    good: 0,
    moderate: 0,
    bad: 0,
  };

  reviewPercentage.good = ((100 / totalReview) * types.good).toFixed();
  reviewPercentage.moderate = ((100 / totalReview) * types.moderate).toFixed();
  reviewPercentage.bad = ((100 / totalReview) * types.bad).toFixed();

  return reviewPercentage;
};

export default calculateReviews;
