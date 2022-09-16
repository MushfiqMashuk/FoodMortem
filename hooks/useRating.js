import { useState, createContext } from "react";

const ratingContext = createContext(0);

const useRating = (rating = 0) => {
  const [userRating, setUserRating] = useState(rating);

  return {
    userRating,
    setUserRating,
  };
};

export default useRating;
