import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateArticle, setSelectedArticle } from '../features/articles/articlesSlice';

const GenerateArticleOptions = () => {
  const dispatch = useDispatch();
  const selectedArticle = useSelector((state) => state.articles.selectedArticle);

  const [editableTitle, setEditableTitle] = useState('');
  const [wordCount, setWordCount] = useState(1000);
  const [tone, setTone] = useState('Formal');
  const [llm, setLLM] = useState('gpt-3.5-turbo');
  const imageUrl = useSelector((state) => state.articles.imageUrl);

  useEffect(() => {
    if (selectedArticle) {
      setEditableTitle(selectedArticle.title || '');
    }
  }, [selectedArticle]);

  const handleTitleChange = (e) => {
    setEditableTitle(e.target.value);
  };

  const handleGenerateArticle = () => {
    if (!selectedArticle) {
      alert('Please select an article first!');
      return;
    }

    const updatedArticle = { ...selectedArticle, title: editableTitle };
    dispatch(setSelectedArticle(updatedArticle));

    setTimeout(() => {
      dispatch(generateArticle({
        text: updatedArticle.title,
        url: updatedArticle.url,
        wordCount: parseInt(wordCount, 10),
        tone,
        llm,
      })).then((res) => {
        const imageUrl = res.payload?.imageUrl;
        if (imageUrl) {
          setImageUrl(imageUrl);
        }
      });
    }, 0);
  };

  return (
    <section id="generate-options" className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Generate Article Options</h2>

      {/* Editable Input Field for Selected Article */}
      <div className="flex flex-col">
        <label htmlFor="selected-article" className="block text-lg font-medium mb-2">
          Selected Article:
        </label>
        {selectedArticle ? (
          <input
            id="selected-article"
            className="p-2 border rounded-md bg-gray-100"
            value={editableTitle}
            onChange={handleTitleChange}
          />
        ) : (
          <p className="p-2 border rounded-md bg-gray-100">
            No article selected yet. Please click on an article in search results.
          </p>
        )}
      </div>

      {/* Word Count Input */}
      <div className="flex flex-col mt-4">
        <label htmlFor="word-count" className="block text-lg font-medium mb-2">
          Number of Words:
        </label>
        <input
          type="number"
          id="word-count"
          className="p-2 border rounded-md focus:ring focus:ring-blue-300"
          value={wordCount}
          onChange={(e) => setWordCount(e.target.value)}
        />
      </div>

      {/* LLM Selection */}
      <div className="flex flex-col mt-4">
        <label htmlFor="llm" className="block text-lg font-medium mb-2">
          Name of LLM:
        </label>
        <select
          id="llm"
          className="p-2 border rounded-md focus:ring focus:ring-blue-300"
          onChange={(e) => setLLM(e.target.value)}
          value={llm}
        >
          <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
          <option value="chatgpt">ChatGPT</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Tone Selection */}
      <div className="flex flex-col mt-4">
        <label htmlFor="tone" className="block text-lg font-medium mb-2">
          Tone:
        </label>
        <select
          id="tone"
          className="p-2 border rounded-md focus:ring focus:ring-blue-300"
          onChange={(e) => setTone(e.target.value)}
          value={tone}
        >
          <option value="Formal">Formal</option>
          <option value="Informal">Informal</option>
          <option value="Persuasive">Persuasive</option>
          <option value="Inspirational">Inspirational</option>
          <option value="Descriptive">Descriptive</option>
          <option value="Narrative">Narrative</option>
          <option value="Humorous">Humorous</option>
        </select>
      </div>

      {/* Generate Button */}
      <div className="text-center mt-4">
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          onClick={handleGenerateArticle}
        >
          Write
        </button>
      </div>

      {/* Generated Image Section */}
      {imageUrl && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold mb-2">AI-Generated Image</h3>
          <img
            src={imageUrl}
            alt="Generated Visual"
            className="rounded-md shadow-md w-full max-w-md mx-auto"
          />
        </div>
      )}
    </section>
  );
};

export default GenerateArticleOptions;
