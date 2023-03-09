import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/getProducts",
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products?type=${payload}`
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const saveProduct = createAsyncThunk(
  "product/saveProducts",
  async (payload, thunkAPI) => {
    try {
      // console.log(payload.get("image"));
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products`,
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

export const deleteProduct = createAsyncThunk(
  "product/deleteProducts",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/products/${id}`
      );
      thunkAPI.dispatch(fetchProducts("All"));
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products/${payload.get("id")}`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      thunkAPI.dispatch(fetchProducts("All"));
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/${id}`
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
    product: {},
    form: {
      image: "",
      name: "",
      description: "",
      price: "",
      type: "",
    },
    showModal: false,
    edit: false,
    success: false,
    errors: {},
  },
  reducers: {
    resetErrors(state) {
      state.errors = {};
    },
    fillForm(state, action) {
      Object.keys(action.payload).forEach((item) => {
        state.form[item] = action.payload[item];
      });
    },
    setForm(state, action) {
      state.form[action.payload.name] = action.payload.value;
    },
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
    getAll(state, action) {
      state.allUsers = action.payload;
    },
    reset(state) {
      state.allUsers = [];
    },
    resetForm(state) {
      state.form = {
        image: "",
        name: "",
        description: "",
        price: "",
        type: "",
      };
    },
    setType(state, action) {
      state.form["type"] = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      console.log("loading");
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.allProducts = action.payload.data;
    },
    [fetchProducts.rejected]: (state) => {
      console.log("rejected");
    },

    [saveProduct.pending]: (state) => {
      console.log("loading");
    },
    [saveProduct.fulfilled]: (state, action) => {
      state.showModal = false;
    },
    [saveProduct.rejected]: (state) => {
      console.log("rejected");
    },

    [deleteProduct.pending]: (state) => {
      console.log("loading");
    },
    [deleteProduct.fulfilled]: (state, action) => {
      console.log("fulfilled");
    },
    [deleteProduct.rejected]: (state) => {
      console.log("rejected");
    },

    [updateProduct.pending]: (state) => {
      console.log("loading");
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.edit = false
      state.showModal = false;
    },
    [updateProduct.rejected]: (state) => {
      console.log("rejected");
    },

    [getProduct.pending]: (state) => {
      console.log("loading");
    },
    [getProduct.fulfilled]: (state, action) => {
      state.product = action.payload.data;
    },
    [getProduct.rejected]: (state) => {
      console.log("rejected");
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
