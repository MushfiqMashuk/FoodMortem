const calculateAverageRating = (ratings) => {
  let sum = 0;

  ratings.forEach((userRating) => {
    sum = sum + userRating?.rating;
  });

  return (sum / ratings.length).toFixed(1);
};

export default calculateAverageRating;
