import create from "zustand";

const useRatingStore = create((set) => ({
  rating: null,
  reviews: [],
  setRating: (myRating) => set(() => ({ rating: myRating })),
  setReviews: (myReviews) => set(() => ({ reviews: myReviews })),
  removeRating: () => set(() => ({ rating: null })),
}));

export default useRatingStore;
