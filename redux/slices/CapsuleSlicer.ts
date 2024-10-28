import { Capsule } from "@/types/capsule";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CapsuleState {
  data: Capsule[];
}

const initialState: CapsuleState = {
  data: [],
};

const capsuleSlice = createSlice({
  name: "capsule",

  initialState,

  reducers: {
    setCapsulesData(state, action: PayloadAction<Capsule[]>) {
      state.data = action.payload;
    },

    addNewCapsule(state, action: PayloadAction<Capsule>) {
      state.data.push(action.payload);
      console.log("Redux State after adding:", state.data);
    },

    editExistingCapsule(state, action: PayloadAction<Capsule>) {
      const index = state.data.findIndex(
        (capsule) => capsule.capsule_serial === action.payload.capsule_serial
      );

      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});

export const { setCapsulesData, addNewCapsule, editExistingCapsule } =
  capsuleSlice.actions;

export default capsuleSlice.reducer;
