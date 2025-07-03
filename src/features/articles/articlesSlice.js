// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';

// // export const fetchTrendingArticles = createAsyncThunk('articles/fetchTrending', async () => {
// //   const response = await axios.get('/api/articles/trending');
// //   return response.data;
// // });

// // export const generateArticle = createAsyncThunk('articles/generateArticle', async (options) => {
// //   const response = await axios.post('/api/articles/generate', options);
// //   return response.data.generatedText;
// // });

// // export const translateArticle = createAsyncThunk('articles/translateArticle', async ({ text, targetLanguage }) => {
// //   const response = await axios.post('/api/articles/translate', { text, targetLanguage });
// //   return response.data.translatedText;
// // });

// // const articlesSlice = createSlice({
// //   name: 'articles',
// //   initialState: {
// //     trending: [],
// //     manualSearchResults: [],
// //     generatedText: '',
// //     translatedText: '',
// //     status: 'idle',
// //     error: null,
// //   },
// //   reducers: {
// //     setManualSearchResults(state, action) {
// //       state.manualSearchResults = action.payload;
// //     },
// //     updateGeneratedText(state, action) {
// //       state.generatedText = action.payload;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchTrendingArticles.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchTrendingArticles.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         state.trending = action.payload;
// //       })
// //       .addCase(fetchTrendingArticles.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.error.message;
// //       })
// //       .addCase(generateArticle.fulfilled, (state, action) => {
// //         state.generatedText = action.payload;
// //       })
// //       .addCase(translateArticle.fulfilled, (state, action) => {
// //         state.translatedText = action.payload;
// //       });
// //   },
// // });

// // export const { setManualSearchResults, updateGeneratedText } = articlesSlice.actions;

// // export default articlesSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchTrendingArticles = createAsyncThunk('articles/fetchTrending', async () => {
//   const response = await axios.get('/api/articles/trending');
//   return response.data;
// });

// export const generateArticle = createAsyncThunk('articles/generateArticle', async (options) => {
//   const response = await axios.post('/api/articles/generate', options);
//   return response.data.generatedText;
// });

// export const translateArticle = createAsyncThunk('articles/translateArticle', async ({ text, targetLanguage }) => {
//   const response = await axios.post('/api/articles/translate', { text, targetLanguage });
//   return response.data.translatedText;
// });

// export const suggestTitles = createAsyncThunk('articles/suggestTitles', async (text) => {
//   const response = await axios.post('/api/articles/suggest-titles', { text });
//   return response.data.titles;
// });

// const articlesSlice = createSlice({
//   name: 'articles',
//   initialState: {
//     trending: [],
//     manualSearchResults: [],
//     generatedText: '',
//     translatedText: '',
//     generatedUrl: '',
//     suggestedTitles: [],
//     selectedArticleUrl: '',
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     setManualSearchResults(state, action) {
//       state.manualSearchResults = action.payload;
//     },
//     setSelectedArticleUrl(state, action) {
//       state.selectedArticleUrl = action.payload;
//     },
//     updateGeneratedText(state, action) {
//       state.generatedText = action.payload;
//       state.generatedUrl = action.payload.url;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTrendingArticles.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTrendingArticles.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.trending = action.payload;
//       })
//       .addCase(fetchTrendingArticles.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(generateArticle.fulfilled, (state, action) => {
//         state.generatedText = action.payload;
//         state.generatedUrl = action.payload.url;
//       })
//       .addCase(translateArticle.fulfilled, (state, action) => {
//         state.translatedText = action.payload;
//       })
//       .addCase(suggestTitles.fulfilled, (state, action) => {
//         state.suggestedTitles = action.payload;
//       });
//   },
// });

// export const { setManualSearchResults, setSelectedArticleUrl, updateGeneratedText } = articlesSlice.actions;

// export default articlesSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchTrendingArticles = createAsyncThunk('articles/fetchTrending', async () => {
//   const response = await axios.get('/api/articles/trending');
//   return response.data;
// });

// export const generateArticle = createAsyncThunk('articles/generateArticle', async (options) => {
//   const response = await axios.post('/api/articles/generate', options);
//   return response.data;
// });

// export const suggestTitles = createAsyncThunk('articles/suggestTitles', async (text) => {
//   const response = await axios.post('/api/articles/suggest-titles', { text });
//   return response.data.titles;
// });

// const articlesSlice = createSlice({
//   name: 'articles',
//   initialState: {
//     trending: [],
//     manualSearchResults: [],
//     generatedText: '',
//     generatedUrl: '',
//     suggestedTitles: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     setManualSearchResults(state, action) {
//       state.manualSearchResults = action.payload;
//     },
//     updateGeneratedText(state, action) {
//       state.generatedText = action.payload.text;
//       state.generatedUrl = action.payload.url;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTrendingArticles.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTrendingArticles.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.trending = action.payload;
//       })
//       .addCase(fetchTrendingArticles.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(generateArticle.fulfilled, (state, action) => {
//         state.generatedText = action.payload.text;
//         state.generatedUrl = action.payload.url;
//       })
//       .addCase(suggestTitles.fulfilled, (state, action) => {
//         state.suggestedTitles = action.payload;
//       });
//   },
// });

// export const { setManualSearchResults, updateGeneratedText } = articlesSlice.actions;

// export default articlesSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchTrendingArticles = createAsyncThunk('articles/fetchTrending', async () => {
//   const response = await axios.get('/api/articles/trending');
//   return response.data;
// });

// export const generateArticle = createAsyncThunk('articles/generateArticle', async (options) => {
//   const response = await axios.post('/api/articles/generate', options);
//   return response.data;
// });

// export const suggestTitles = createAsyncThunk('articles/suggestTitles', async (text) => {
//   const response = await axios.post('/api/articles/suggest-titles', { text });
//   return response.data.titles;
// });

// const articlesSlice = createSlice({
//   name: 'articles',
//   initialState: {
//     trending: [],
//     manualSearchResults: [],
//     generatedText: '',
//     generatedUrl: '',
//     suggestedTitles: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     setManualSearchResults(state, action) {
//       state.manualSearchResults = action.payload;
//     },
//     updateGeneratedText(state, action) {
//       state.generatedText = action.payload.text;
//       state.generatedUrl = action.payload.url;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTrendingArticles.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTrendingArticles.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.trending = action.payload;
//       })
//       .addCase(fetchTrendingArticles.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(generateArticle.fulfilled, (state, action) => {
//         state.generatedText = action.payload.text;
//         state.generatedUrl = action.payload.url;
//       })
//       .addCase(suggestTitles.fulfilled, (state, action) => {
//         state.suggestedTitles = action.payload;
//       });
//   },
// });

// export const { setManualSearchResults, updateGeneratedText } = articlesSlice.actions;

// export default articlesSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// TODO: Move to Env file
const API_HOST = 'https://3e65-106-51-159-190.ngrok-free.app';

// Fetch trending articles
export const fetchTrendingArticles = createAsyncThunk('articles/fetchTrending', async () => {
  const response = await axios.get(`${API_HOST}/api/articles/trending`);
  return Array.isArray(response.data) ? response.data : [];
});

// Generate an article based on the selected article
export const generateArticle = createAsyncThunk('articles/generateArticle', async (_, { getState, rejectWithValue }) => {
  try {
    const { selectedArticle } = getState().articles;
    if (!selectedArticle) throw new Error('No article selected');

    const response = await axios.post(`${API_HOST}/api/articles/generate`, {
      text: selectedArticle.title,  // ✅ Use the updated title
      url: selectedArticle.url,
      wordCount: selectedArticle.wordCount || 300, // Default value if not set
      tone: selectedArticle.tone || 'Formal',
      llm: selectedArticle.llm || 'gpt-3.5-turbo', // TODO: Take the default value from the env or server
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to generate article');
  }
});

// Translate an article
export const translateArticle = createAsyncThunk(
  'articles/translateArticle',
  async ({ url, language, tone, wordCount, llm }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_HOST}/api/articles/translate`, {
        url,
        language,
        tone,
        wordCount,
        llm,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Translation failed');
    }
  }
);

// Suggest titles
export const suggestTitles = createAsyncThunk('articles/suggestTitles', async (text) => {
  const response = await axios.post(`${API_HOST}/api/articles/suggest-titles`, { text });
  return response.data.titles;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    trending: [],
    manualSearchResults: [],
    selectedArticle: null,
    generatedText: '',
    generatedUrl: '',
    translatedText: '',
    suggestedTitles: [],
    imageUrl: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    setManualSearchResults(state, action) {
      state.manualSearchResults = action.payload || []; // Ensure it's always an array
    },
    setSelectedArticle(state, action) {
      state.selectedArticle = action.payload; // ✅ Replace selectedArticle instead of merging
    },
    updateGeneratedText(state, action) {
      state.generatedText = action.payload.text;
      state.generatedUrl = action.payload.url;
    },
    updateTranslatedText(state, action) {
      state.translatedText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrendingArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trending = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTrendingArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(generateArticle.pending, (state) => {
        state.status = 'loading'; // ✅ Show loading state when generating
      })
      .addCase(generateArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.generatedText = action.payload.article || "No article generated"; // ✅ Ensure text is set
        state.generatedUrl = action.payload.url || ""; // ✅ Ensure URL is set
        state.imageUrl = action.payload.imageUrl || "";
      })
      .addCase(generateArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to generate article';
      })
      .addCase(translateArticle.fulfilled, (state, action) => {
        state.translatedText = action.payload.translatedText;
      })
      .addCase(suggestTitles.fulfilled, (state, action) => {
        state.suggestedTitles = action.payload;
      });
  },
});

export const { setManualSearchResults, setSelectedArticle, updateGeneratedText, updateTranslatedText } = articlesSlice.actions;

export default articlesSlice.reducer;
