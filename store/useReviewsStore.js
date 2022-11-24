import create from "zustand";

const useReviewsStore = create((set) => ({
  reviews: [],
  setReviews: (myReviews) => set(() => ({ reviews: myReviews })),
  removeReviews: () => set(() => ({ reviews: [] })),
}));

export default useReviewsStore;
