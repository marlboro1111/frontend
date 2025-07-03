// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { setManualSearchResults } from '../features/articles/articlesSlice';
// // import 'dotenv/config';

// const ManualSearch = () => {
//   const dispatch = useDispatch();
//   const { manualSearchResults, status, error } = useSelector((state) => state.articles);
//   const [manualQuery, setManualQuery] = useState('');
//   const [keywords, setKeywords] = useState('');

//   const handleManualSearch = async (query, isKeywordSearch) => {
//     try {
//       const queryType = isKeywordSearch ? keywords : manualQuery;
//       const results = await axios.get(https://newsapi.org/v2/everything?q=${queryType}&apiKey=345f2afa94314119b35db52e01c09da1);
//       dispatch(setManualSearchResults(results.data.articles));
//     } catch (error) {
//       console.error('Error with manual search:', error);
//     }
//   };

//   return (
//     <section id="manual-search" className="p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Manual Search</h2>
//       <div className="space-y-4">
//         <div className="flex space-x-4">
//           <input
//             type="text"
//             className="flex-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
//             placeholder="Type title"
//             value={manualQuery}
//             onChange={(e) => setManualQuery(e.target.value)}
//           />
//           <button
//             className="flex-none w-1/4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//             onClick={() => handleManualSearch(manualQuery, true)}
//           >
//             Search by Title
//           </button>
//         </div>
//         <div className="flex space-x-4">
//           <input
//             type="text"
//             className="flex-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
//             placeholder="Type keywords"
//             value={keywords}
//             onChange={(e) => setKeywords(e.target.value)}
//           />
//           <button
//             className="flex-none w-1/4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//             onClick={() => handleManualSearch(keywords, true)}
//           >
//             Search by Keywords
//           </button>
//         </div>
//       </div>
//       <div className="mt-4">
//         <h2 className="text-2xl font-semibold mb-4">Results from Manual Search</h2>
//         <div className="scrollable p-2 border rounded-md h-48 overflow-y-auto">
//           {status === 'loading' && <p>Loading...</p>}
//           {status === 'failed' && <p>Error: {error}</p>}
//           {manualSearchResults.length === 0 && status === 'succeeded' && (
//             <p>No search results available.</p>
//           )}
//           {manualSearchResults.map((result, index) => (
//             <div key={index} className="p-2 border-b">
//               <h3 className="font-bold">{result.title}</h3>
//               <p>{result.description}</p>
//               <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read more</a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ManualSearch;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setManualSearchResults,setSelectedArticle } from '../features/articles/articlesSlice';

const ManualSearch = () => {
  const dispatch = useDispatch();
  const { trending, manualSearchResults, status, error } = useSelector((state) => state.articles);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories] = useState(['Technology', 'Business', 'Startups', 'Science', 'Health', 'Lifestyle']); // Example categories

  // Ensure trending is an array to avoid undefined errors
  useEffect(() => {
    if (Array.isArray(trending)) {
      filterArticlesByCategory(selectedCategory);
    } else {
      console.error('Trending is not an array:', trending);
    }
  }, [trending, selectedCategory]);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    filterArticlesByCategory(category);
  };

  const filterArticlesByCategory = (category) => {
    if (!Array.isArray(trending)) {
      console.error('Trending is not an array');
      return;
    }

    const filtered = category
      ? trending.filter((article) =>
          article?.category?.toLowerCase() === category.toLowerCase()
        )
      : trending;

    dispatch(setManualSearchResults(filtered));
  };
  // Define the handleTitleClick function
  const handleTitleClick = (article) => {
    console.log('Selected Article:', article); // Debug log
    dispatch(setSelectedArticle(article)); // Update Redux state
  };

  return (
    <section id="manual-search" className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Manual Search</h2>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <select
            className="flex-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            value={selectedCategory}
            onChange={(e) => handleCategorySelection(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === 'loading' && <p>Loading articles...</p>}
      {status === 'failed' && <p>Error loading articles: {error}</p>}

      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-4">Results from Manual Search</h2>
        <div className="scrollable p-2 border rounded-md h-48 overflow-y-auto">
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {manualSearchResults.length === 0 && status === 'succeeded' && (
            <p>No search results available.</p>
          )}
          {manualSearchResults.map((result, index) => (
  <div key={index} className="p-2 border-b">
    <h3
      className="font-bold cursor-pointer text-blue-500 hover:underline"
      onClick={() => handleTitleClick(result, index)} // Example click handler
    >
      {result.title}
    </h3>
    <p>{result.description}</p>
  </div>


          ))}
        </div>
      </div>
    </section>
  );
};

export default ManualSearch;
