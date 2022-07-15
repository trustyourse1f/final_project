import { configureStore } from '@reduxjs/toolkit';
import hospitalReducer from './feature/hospitals';
import selectedInfoReducer from './feature/selected_info';

export default configureStore({
  reducer: {
    hospitals: hospitalReducer,
    selectedInfo: selectedInfoReducer
  }
});