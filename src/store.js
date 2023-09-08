//Redux official method of implementing the store

import { configureStore } from "@reduxjs/toolkit";
import { searchSlice } from "./slices/apiSlices";

const store = configureStore({
  reducer: {
    [searchSlice.reducerPath] : searchSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(searchSlice.middleware)
  },
  devTools: true,
})

export default store;