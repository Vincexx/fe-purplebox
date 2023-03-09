import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "user/getUsers",
  async (thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users`
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const saveUser = createAsyncThunk(
  "user/addUser",
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users`,
        payload
      );
      thunkAPI.dispatch(fetchUsers());
      return {
        response: {
          status: 201,
          data: resp.data,
        },
      };
    } catch (err) {
      return err;
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/${payload.id}`,
        payload
      );
      thunkAPI.dispatch(fetchUsers());
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    form: {
      id: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      address: "",
      role: "",
      contact_num: "",
      email: "",
      password: "",
    },
    showModal: false,
    edit: false,
    success: false,
    loading: false,
    errors: {
      first_name: "",
      last_name: "",
      address: "",
      role: "",
      contact_num: "",
      email: "",
      password: "",
    },
  },
  reducers: {
    resetErrors(state) {
      state.errors = {
        first_name: "",
        last_name: "",
        address: "",
        role: "",
        contact_num: "",
        email: "",
        password: "",
      };
    },
    save(state, action) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/users`, action.payload.form)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err.response.data));
    },
    delete(state, action) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/users/${action.payload}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err.response.data));
    },
    setForm(state, action) {
      state.form[action.payload.name] = action.payload.value;
    },
    fillForm(state, action) {
      Object.keys(action.payload).forEach((item) => {
        state.form[item] = action.payload[item];
      });
      delete state.form["password"];
    },
    updateRole(state, action) {
      state.form["role"] = action.payload;
    },
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
    getAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    resetAllUser(state) {
      state.allUsers = [];
    },
    resetForm(state) {
      state.form = {
        first_name: "",
        middle_name: "",
        last_name: "",
        address: "",
        role: "",
        contact_num: "",
        email: "",
        password: "",
      };
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      console.log("loading");
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload.data;
    },
    [fetchUsers.rejected]: (state) => {
      console.log("rejected");
    },
    [saveUser.pending]: (state) => {
      console.log("loading");
    },
    [saveUser.fulfilled]: (state, action) => {
      state.errors = {}
      const { data, status } = action.payload.response;
      if (status === 201) state.showModal = false;
      else if (status === 422) {
        Object.keys(data.errors).map((item) => {
          state.errors[item] = data.errors[item][0];
        });
      }
    },
    [saveUser.rejected]: (state) => {
      console.log("rejected");
    },
    [updateUser.pending]: (state) => {
      console.log("loading");
    },
    [updateUser.fulfilled]: (state, action) => {
      state.showModal = false;
    },
    [updateUser.rejected]: (state) => {
      console.log("rejected");
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
