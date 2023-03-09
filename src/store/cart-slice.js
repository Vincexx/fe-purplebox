import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    allCarts: [],
    showModal: false,
  },
  reducers: {
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    getAll(state, action) {
      state.allUsers = action.payload;
    },
    reset(state) {
      state.allUsers = [];
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
