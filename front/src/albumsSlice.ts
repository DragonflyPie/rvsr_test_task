import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

interface Album {
  albumId: string;
  userId: string;
  title: string;
}

const URL = "http://localhost:3000";

export const fetchAlbumsByUserId = createAsyncThunk<Album[], string>(
  "albums/getUserAlbums",
  async (userId: string) => {
    const response = await axios(`${URL}/albums/${userId}`);
    return response.data as Album[];
  }
);

const albumsAdapter = createEntityAdapter({
  selectId: (album: Album) => album.albumId,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const albumsSlice = createSlice({
  name: "albums",
  initialState: albumsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumsByUserId.fulfilled, (state, action) => {
      albumsAdapter.setMany(state, action.payload);
    });
  },
});

export default albumsSlice.reducer;

const selectNumCompletedTodos = createSelector(
  (state: RootState) => state.albums.entities
);
export const {
  selectById,

  // Pass in a selector that returns the posts slice of state
} = albumsAdapter.getSelectors((state: RootState) => state.albums);
