import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingArticles } from "../features/articles/articlesSlice";

const TrendingArticles = () => {
  const dispatch = useDispatch();
  const { trending, status, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchTrendingArticles());
  }, [dispatch]);

  // ✅ Debug the data structure
  console.log("TRENDING ARTICLES DATA:", trending);

  return (
    <section className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Trending Articles</h2>

      <div className="scrollable p-2 border rounded-md h-80 overflow-y-auto">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p className="text-red-500">{error}</p>}
        {status === "succeeded" && trending.length === 0 && (
          <p>No articles available.</p>
        )}

        {status === "succeeded" &&
          trending.map((article, index) => (
            <div
              key={article.id || article.url || index}
              className="p-2 border-b"
            >
              <h3 className="font-bold">
                {article.title || article.headline || "Untitled"}
              </h3>
              <p className="text-gray-600 text-sm">
                {article.summary ||
                  article.description ||
                  "No summary available."}
              </p>
            </div>
          ))}
      </div>

      <div className="text-center mt-4">
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          onClick={() => dispatch(fetchTrendingArticles())}
        >
          Refresh
        </button>
      </div>
    </section>
  );
};

export default TrendingArticles;
