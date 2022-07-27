import { createSlice } from '@reduxjs/toolkit';

export const selectedInfoSlice = createSlice({
  name: 'selectedInfo',
  initialState: {
    value: {},
    changed_val: 0, // which type of value has it changed into
    symptoms_animaltype: {
      Symptom: '',
      AnimalType: ''
    }
  },
  reducers: {
    setInfo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
      state.changed_val = 1;
    },

    setSymptomsAnimaltype: (state, action) => {
      state.symptoms_animaltype = action.payload;
    },

    setNull: (state) => {
      state.value = {};
      state.changed_val = 0;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setInfo, setSymptomsAnimaltype, setNull } = selectedInfoSlice.actions;

export default selectedInfoSlice.reducer;