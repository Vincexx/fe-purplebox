import { createSlice } from "@reduxjs/toolkit";

const policySlice = createSlice({
  name: "policy",
  initialState: {
    policy: {},
    policies: [
      { name: "Automobile", price: 1000 },
      { name: "Life", price: 2000 },
    ],
  },
  reducers: {
    store(state, action) {
      console.log("store policy");
      console.log(action.payload);
      state.policies.push(action.payload);
    },
  },
});

export const policyActions = policySlice.actions;

export default policySlice;
