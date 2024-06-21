import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import albumsReducer from "./albumsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    albums: albumsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
