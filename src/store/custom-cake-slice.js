import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const saveCustomCake = createAsyncThunk(
  "customCake/saveCustomCake",
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/custom-cakes`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const fetchUsersCake = createAsyncThunk(
  "customCake/fetchUsersCake",
  async (status, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/custom-cakes?status=${status}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const fetchAllCustomCake = createAsyncThunk(
  "customCake/fetchAllCustomCake",
  async (status, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/custom-cakes?status=${status}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const getCustomCake = createAsyncThunk(
  "customCake/getCustomCake",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/custom-cakes/get/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const updateCustomCake = createAsyncThunk(
  "customCake/updateCustomCake",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const resp = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/custom-cakes/${payload.id}`,
        payload
      );
      thunkAPI.dispatch(fetchAllCustomCake(payload.fetchStatus));
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const deleteCakeOnCart = createAsyncThunk(
  "order/deleteCakeOnCart",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/custom-cakes/${id}`
      );
      thunkAPI.dispatch(fetchUsersCake("Paid"));
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

const customCakeSlice = createSlice({
  name: "custom-cake",
  initialState: {
    allCustomCakes: [],
    usersCakes: [],
    cakeItems: [],
    customCake: {},
    customCakeModal: false,
    success: false,
    form: {
      image: "",
      quantity: "",
      message: "",
      remarks: "",
      price: "",
      status: "Paid",
    },
  },
  reducers: {
    setForm(state, action) {
      state.form[action.payload.name] = action.payload.value;
    },
    setCustomCakeModal(state, action) {
      state.customCakeModal = action.payload;
    },
    getAll(state, action) {
      state.allCustomCakes = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    resetForm(state) {
      state.form = {
        image: "",
        quantity: "",
        message: "",
        remarks: "",
        price: "",
        status: "Paid",
      };
    },
  },
  extraReducers: {
    [saveCustomCake.pending]: (state) => {
      console.log("loading");
    },
    [saveCustomCake.fulfilled]: (state, action) => {
      console.log("fulfilled");
    },
    [saveCustomCake.rejected]: (state) => {
      console.log("rejected");
    },

    [fetchUsersCake.pending]: (state) => {
      console.log("loading");
    },
    [fetchUsersCake.fulfilled]: (state, action) => {
      console.log("fulfilled");
      if (action.payload.status === "Paid")
        state.usersCakes = action.payload.data;
      else state.cakeItems = action.payload.data;
    },
    [fetchUsersCake.rejected]: (state) => {
      console.log("rejected");
    },

    [fetchAllCustomCake.pending]: (state) => {
      console.log("loading");
    },
    [fetchAllCustomCake.fulfilled]: (state, action) => {
      console.log("fulfilled");
      state.allCustomCakes = action.payload.data;
    },
    [fetchAllCustomCake.rejected]: (state) => {
      console.log("rejected");
    },

    [getCustomCake.pending]: (state) => {
      console.log("loading");
    },
    [getCustomCake.fulfilled]: (state, action) => {
      console.log("fulfilled");
      state.customCake = action.payload.data;
    },
    [getCustomCake.rejected]: (state) => {
      console.log("rejected");
    },

    [updateCustomCake.pending]: (state) => {
      console.log("loading");
    },
    [updateCustomCake.fulfilled]: (state, action) => {
      console.log("fulfilled");
    },
    [updateCustomCake.rejected]: (state) => {
      console.log("rejected");
    },
  },
});

export const customCakeActions = customCakeSlice.actions;

export default customCakeSlice;
