const calculateAverageRating = (ratings = []) => {

  let sum = 0;

  ratings.forEach((userRating) => {
    sum = sum + userRating?.rating;
  });

  return sum > 0 ? (sum / ratings.length).toFixed(1) : sum;
};

export default calculateAverageRating;
