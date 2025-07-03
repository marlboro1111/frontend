import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedArticle } from '../features/articles/articlesSlice';

const SearchResults = () => {
  const { manualSearchResults } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleArticleClick = (article, index) => {
    console.log("Article clicked:", article); // Log clicked article
    dispatch(setSelectedArticle(article)); // Update Redux state
    setClickedIndex(index); // Highlight clicked article
  };

  return (
    <section id="manual-search-results" className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Results from Manual Search</h2>
      <div className="scrollable p-2 border rounded-md h-48 overflow-y-auto">
        {manualSearchResults.length === 0 && <p>No search results available.</p>}
        {manualSearchResults.map((result, index) => (
          <div
          key={index}
          className={`p-2 border-b cursor-pointer hover:bg-orange-200 ${
            clickedIndex === index ? 'bg-orange-300' : ''
          }`}
          onClick={() => handleArticleClick(result, index)}
        
          >
            <h3 className="font-bold">{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchResults;


