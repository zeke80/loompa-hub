import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { Loompa } from "../services/loompa-service/loompa.service";

const initState = (): { loompas: Loompa[]; page: number } => {
  let loompas: Loompa[] = [];
  let page: number = 1;
  let date: DateTime = "";
  let localLoompas = localStorage.getItem("loompas");
  let localPage = localStorage.getItem("page");
  let localDate = localStorage.getItem("date");
  const now = DateTime.now();
  const reset = () => {
    loompas = [];
    page = 1;
    date = now.toISO();
    localStorage.clear();
    localStorage.setItem("loompas", JSON.stringify(loompas));
    localStorage.setItem("page", String(page));
    localStorage.setItem("date", date);
  };
  if (!localLoompas || !localPage || !localDate) {
    reset();
  } else {
    loompas = JSON.parse(localLoompas);
    page = Number(localPage);
    date = DateTime.fromISO(localDate);
    const now = DateTime.now();
    if (now.diff(date, "days").days >= 1) reset();
  }
  return { loompas, page };
};

const initialState = initState();

export const loompaDataSlice = createSlice({
  name: "loompaData",
  initialState,
  reducers: {
    setLoompas: (state, action) => {
      state.loompas = action.payload.sort(
        (a: Loompa, b: Loompa) => a.id - b.id
      );
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    addLoompa: (state, action) => {
      state.loompas = [...state.loompas, action.payload].sort(
        (a: Loompa, b: Loompa) => a.id - b.id
      );
    },
  },
});

export const { setLoompas, setPage, addLoompa } = loompaDataSlice.actions;
export default loompaDataSlice.reducer;
