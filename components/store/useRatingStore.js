import create from "zustand";

const useRatingStore = create((set) => ({
    rating: null,
    setRating: (myRating) => set(() => ({rating: myRating})),
}))

export default useRatingStore;