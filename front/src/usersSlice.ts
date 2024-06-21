import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

const URL = "http://localhost:3000";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/getUsers",
  async () => {
    const response = await axios(`${URL}/users`);
    return response.data;
  }
);

const usersAdapter = createEntityAdapter<User>({});

type Status = "idle" | "pending" | "succeeded" | "failed";
// interface UsersState {
//   users: User[];
//   status: "idle" | "pending" | "succeeded" | "failed";
// }
// const initialState: UsersState = {
//   users: [],
//   status: "idle",
// };

export const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    status: "idle" as Status,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      usersAdapter.setMany(state, action.payload);
      state.status = "succeeded";
    }),
      builder.addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      }),
      builder.addCase(fetchUsers.pending, (state) => {
        state.status = "pending";
      });
  },
});

export default usersSlice.reducer;

export const {
  selectAll: selectAllUsers,

  // Pass in a selector that returns the posts slice of state
} = usersAdapter.getSelectors((state: RootState) => state.users);
