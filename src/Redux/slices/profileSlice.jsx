// import {createSlice} from "@reduxjs/toolkit"

// const initialState = {
//     user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
//     loading: false,
// };

// const profileSlice = createSlice({
//     name:"profile",
//     initialState: initialState,
//     reducers: {
//         setUser(state, value) {
//             state.user = value.payload;
//         },
//         setLoading(state, value) {
//             state.loading = value.payload;
//           },
//     },
// });

// export const {setUser, setLoading} = profileSlice.actions;
// export default profileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    updateUserWallet(state, action) {
      if (state.user) {
        state.user.wallet = action.payload;
        // Optionally, update the localStorage to keep it in sync
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

// Export the actions
export const { setUser, setLoading, updateUserWallet } = profileSlice.actions;

// Export the reducer
export default profileSlice.reducer;
