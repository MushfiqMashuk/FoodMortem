import create from "zustand";

const useBucketListStore = create((set) => ({
  bucketList: [],
  setBucketList: (myBucketList) => set(() => ({ bucketList: myBucketList })),
  removeBucketList: () => set(() => ({ bucketList: [] })),
}));

export default useBucketListStore;
