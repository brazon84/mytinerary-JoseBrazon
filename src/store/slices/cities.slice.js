import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const citiesSlice = createSlice({
  name: 'cities',
  initialState: [],
  reducers: {
    setCityData: (state, action) =>{
      return action.payload
    }
  }
});

export const { setCityData } = citiesSlice.actions;

export default citiesSlice.reducer;

export const getAllCitiesThunk = () => {
  return (dispatch) => {
    const API = 'https://mytineraty-back-brazon84.vercel.app/cities';
    axios.get(API)
      .then((res) => {
        dispatch(setCityData(res.data));
      })
      .catch((err) =>{
        console.log(err);
      });
    
  }; 
};
