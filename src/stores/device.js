import create from "zustand";
import { persist } from "zustand/middleware";
import { projectFirestore } from "../configs/firebase";

let store = (set, get) => ({
  devices: [],
  currDevice: null,
  addDevices: (devices) =>
    set((state) => ({
      ...state,
      devices: devices,
    })),
  addCurrDevice: (index) => {
    set((state) => ({
      ...state,
      currDevice: get().devices[index],
    }));
  },
  getDevices: () => {
    projectFirestore.collection("esp").onSnapshot(async (snapshot) => {
      const newDevices = await snapshot.docs.map((doc) => doc.data());
      set((state) => ({
        ...state,
        devices: newDevices,
      }));
    });
  },
});
store = persist(store, { name: "device" }); // Persist to local storage
export default create(store);
