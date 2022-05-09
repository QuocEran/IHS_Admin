import create from "zustand";
import { persist } from "zustand/middleware";

let store = (set, get) => ({
  patients: [],
  currPatient: null,
  addPatients: (patients) =>
    set((state) => ({
      ...state,
      patients: patients,
    })),
  addCurrPatient: (index) => {
    set((state) => ({
      ...state,
      currPatient: get().patients[index],
    }));
  },
});
store = persist(store, { name: "patients" }); // Persist to local storage
export default create(store);
