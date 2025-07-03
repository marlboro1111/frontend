// import React from "react";
import TrendingArticles from "../components/TrendingArticles";
import ManualSearch from "../components/ManualSearch";
// import GeneratedArticles from "../components/GeneratedArticles";
// import GenerateArticleOptions from "../components/GenerateArticleOptions";
import React, { Suspense } from 'react';

const GeneratedArticles = React.lazy(() => import('../components/GeneratedArticles'));
const GenerateArticleOptions = React.lazy(() => import('../components/GenerateArticleOptions'));

const TrendingArticlesPage = () => {
  return (
    <div>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2">
          <TrendingArticles />
        </div>
        <div className="w-full md:w-1/2 px-2">
          <ManualSearch />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
      <GenerateArticleOptions />
      <GeneratedArticles />
      </Suspense>
    </div>
  );
};

export default TrendingArticlesPage;
