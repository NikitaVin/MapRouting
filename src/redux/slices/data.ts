import { DataType } from "./../../components/Table/TableType";
import { RootState } from "../store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IData {
  data: DataType[];
  choosenRout: [number, number][];
}

const initialState: IData = {
  data: [
    {
      key: "1",
      route: "Маршрут №1",
      firstRouteTags: [59.84660399, 30.29496392],
      secondRouteTags: [59.82934196, 30.42423701],
      thirdRouteTags: [59.83567701, 30.38064206],
    },
    {
      key: "2",
      route: "Маршрут №2",
      firstRouteTags: [59.82934196, 30.42423701],
      secondRouteTags: [59.82761295, 30.41705607],
      thirdRouteTags: [59.84660399, 30.29496392],
    },
    {
      key: "3",
      route: "Маршрут №3",
      firstRouteTags: [59.83567701, 30.38064206],
      secondRouteTags: [59.84660399, 30.29496392],
      thirdRouteTags: [59.82761295, 30.41705607],
    },
  ],
  choosenRout: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    chooseRoute: (state, action: PayloadAction<[number, number][]>) => {
      state.choosenRout = [...action.payload];
    },
  },
});

export const selectorData = (state: RootState) => state.data;

export const { chooseRoute } = dataSlice.actions;
export default dataSlice.reducer;
