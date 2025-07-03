import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { translateArticle ,updateTranslatedText} from '../features/articles/articlesSlice';
import EditorialSection from '../components/EditorialSection';

const TranslateArticlePage = () => {
  const dispatch = useDispatch();
  const { translatedText, status, error } = useSelector((state) => state.articles);
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('en');
  const [tone, setTone] = useState('Formal');
  const [wordCount, setWordCount] = useState(300);
  const [llm, setLLM] = useState('gpt-4');
  const [isEditing, setIsEditing] = useState(false);

  const handleTranslate = async () => {
    const options = {
      url,
      language,
      tone,
      wordCount,
      llm,
    };
    dispatch(translateArticle(options));
  };

  const handleSave = (content) => {
    // Update the translated text in the store or local state
    // For simplicity, we're using local state here
    // In a real app, you might want to dispatch an action to update the store
    dispatch(updateTranslatedText(content));
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Translate Article</h2>
      <input
        type="text"
        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
        placeholder="Paste Article URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="flex flex-col mt-4">
        <label htmlFor="language" className="block text-lg font-medium mb-2">Translate to:</label>
        <select
          id="language"
          className="p-2 border rounded-md focus:ring focus:ring-blue-300"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="te">Telugu</option>
          <option value="hi">Hindi</option>
          <option value="ta">Tamil</option>
          {/* Add more languages as needed */}
        </select>
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="tone" className="block text-lg font-medium mb-2">Tone:</label>
        <select
          id="tone"
          className="p-2 border rounded-md focus:ring focus:ring-blue-300"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
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
      <div className="flex flex-col mt-4">
        <label htmlFor="word-count" className="block text-lg font-medium mb-2">Number of Words:</label>
        <input
          type="number"
          id="word-count"
          className="p-2 border rounded-md focus:ring focus:ring-blue-300"
          value={wordCount}
          onChange={(e) => setWordCount(e.target.value)}
        />
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="llm" className="block text-lg font-medium mb-2">Name of LLM:</label>
        <select
          id="llm"
          className="p-2 border rounded-md focus:ring focus:ring-blue-300"
          value={llm}
          onChange={(e) => setLLM(e.target.value)}
        >
          <option value="gpt-4">GPT-3.5-Turbo</option>
          <option value="chatgpt">ChatGPT</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="text-center mt-4">
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          onClick={handleTranslate}
        >
          Generate
        </button>
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {translatedText && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <h3 className="text-xl font-semibold">Translated Article</h3>
          <div dangerouslySetInnerHTML={{ __html: translatedText }} />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mt-2"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      )}
      {isEditing && (
        <EditorialSection 
          initialContent={translatedText} 
          onSave={handleSave} 
          onClose={() => setIsEditing(false)} 
        />
      )}
    </div>
  );
};

export default TranslateArticlePage;
