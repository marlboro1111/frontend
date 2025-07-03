import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './features/articles/articlesSlice'; // ✅ Corrected Path

const store = configureStore({
  reducer: {
    articles: articlesReducer,
  }
});

export default store;
