import { configureStore } from '@reduxjs/toolkit'
import cities from './slices/cities.slice'


export  const store = configureStore({
  reducer: {
cities,

	}
})