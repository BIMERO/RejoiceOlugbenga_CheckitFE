import { configureStore } from "@reduxjs/toolkit";
import capsuleReducer from "./slices/CapsuleSlicer";

const store = configureStore({
  reducer: {
    capsule: capsuleReducer,
  },
});

export default store;
