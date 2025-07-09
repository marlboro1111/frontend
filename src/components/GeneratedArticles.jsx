import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import html2canvas from "html2canvas";
import {
  generateArticle,
  suggestTitles,
} from "../features/articles/articlesSlice"; // ✅ Correct imports

const GeneratedArticles = () => {
  const dispatch = useDispatch();
  const { generatedText, generatedUrl, status, error, suggestedTitles } =
    useSelector((state) => state.articles);
  const pageRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [titlePrompt, setTitlePrompt] = useState(""); // ✅ Custom prompt for suggesting titles

  // ** Generate article **
  const handleGenerateArticle = () => {
    setLoading(true);
    dispatch(generateArticle())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  // ** Suggest titles based on user input **
  const handleSuggestTitles = () => {
    if (generatedText) {
      const promptText = titlePrompt.trim()
        ? `${titlePrompt}: ${generatedText}`
        : generatedText;
      dispatch(suggestTitles(promptText));
    }
  };

  // ** Effect to track Redux state updates after API call **
  useEffect(() => {
    if (status === "succeeded") {
      setLoading(false);
    } else if (status === "failed") {
      setLoading(false);
    }
  }, [status]);

  // ** Run Python script (if required) **
  const handleRunPythonFunction = async () => {
    try {
      const element = document.querySelector(
        ".p-4.border.rounded-md.bg-gray-50"
      );
      if (!element) {
        throw new Error(
          'Element with the class "p-4 border rounded-md bg-gray-50" not found.'
        );
      }

      const canvas = await html2canvas(element);
      const dataURL = canvas.toDataURL("image/png");
      const extractedText = element.innerText;

      await navigator.clipboard.writeText(extractedText);
      console.log("Extracted text copied to clipboard:", extractedText);

      const response = await fetch(
        "https://44e4a0a7d308.ngrok-free.app/run-python-function",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: extractedText,
            screenshot: dataURL,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        console.log("Python function output:", result.message);
      } else {
        console.error("Python function error:", result.error);
      }
    } catch (error) {
      console.error("Error during Python function execution:", error);
    }
  };

  return (
    <section
      id="generated-articles"
      ref={pageRef}
      className="p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Generated Articles</h2>

      {/* Generate Article Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        onClick={handleGenerateArticle}
        disabled={loading || status === "loading"}
      >
        {loading || status === "loading" ? "Generating..." : "Generate Article"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Display Generated Article */}
      <div className="p-4 border rounded-md bg-gray-50 mt-4">
        {generatedText ? (
          <div dangerouslySetInnerHTML={{ __html: generatedText }} />
        ) : (
          <p className="text-gray-500">No article generated yet.</p>
        )}
      </div>

      {/* Article URL */}
      <div className="mt-4">
        <label className="block text-lg font-medium">URL of the Article:</label>
        {generatedUrl ? (
          <a
            href={generatedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {generatedUrl}
          </a>
        ) : (
          <p>No URL available</p>
        )}
      </div>

      {/* Suggested Titles Section */}
      <div className="mt-4">
        <label className="block text-lg font-medium">Suggested Titles:</label>

        {/* Input Box for Custom Prompt to Suggest Titles */}
        <input
          type="text"
          className="border p-2 rounded-md w-full mt-2"
          placeholder="Enter prompt for title suggestions (e.g., 'Suggest 5 SEO-friendly titles')"
          value={titlePrompt}
          onChange={(e) => setTitlePrompt(e.target.value)}
        />

        {/* Suggest Titles Button */}
        <button
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={handleSuggestTitles}
          disabled={!generatedText}
        >
          Suggest Titles
        </button>

        {/* Display Suggested Titles */}
        <div className="p-2 border rounded-md bg-gray-100 mt-3">
          {suggestedTitles && suggestedTitles.length > 0 ? (
            suggestedTitles.map((title, index) => (
              <div key={index} className="text-gray-700">
                - {title}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No titles suggested yet.</p>
          )}
        </div>
      </div>

      {/* Run Python Function Button */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          onClick={handleRunPythonFunction}
        >
          Run Python Function
        </button>
      </div>
    </section>
  );
};

export default GeneratedArticles;
