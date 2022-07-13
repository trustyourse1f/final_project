import { configureStore } from '@reduxjs/toolkit';
import hospitalReducer from './feature/hospitals';

export default configureStore({
  reducer: {
    hospitals: hospitalReducer
  }
});