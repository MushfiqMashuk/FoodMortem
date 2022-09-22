import create from "zustand";

const useRatingStore = create((set) => ({
    rating: null,
    setRating: (myRating) => set(() => ({rating: myRating})),
    removeRating: () => set(() => ({rating: null})),
}))

export default useRatingStore;