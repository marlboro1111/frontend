import React, { useState } from 'react';
import axios from 'axios';

const VideoTranscription = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUrl('');
    setTranscription('');
    setError('');
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setFile(null);
    setTranscription('');
    setError('');
  };

  const handleTranscribe = async () => {
    setIsLoading(true);
    setError('');
    setTranscription('');

    const headers = {};
    let data;

    if (file) {
      data = new FormData();
      data.append('video', file);
      headers['Content-Type'] = 'multipart/form-data';
    } else if (url) {
      data = { url };
      headers['Content-Type'] = 'application/json';
    } else {
      setError('Please provide a file or a URL.');
      setIsLoading(false);
      return;
    }

    console.log('debug1:', data, headers);
    try {
      const response = await axios.post('/api/transcribe', data, { headers });
      setTranscription(response.data.transcription);
    } catch (err) {
      console.error('Error transcribing video:', err.response?.data || err.message);
      setError('Failed to transcribe video. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Video Transcription</h2>
      <input
        type="file"
        accept="video/*,audio/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <input
        type="text"
        placeholder="Enter video URL"
        value={url}
        onChange={handleUrlChange}
        className="w-full p-2 border rounded-md mb-4"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleTranscribe}
        disabled={isLoading}
      >
        {isLoading ? 'Transcribing...' : 'Transcribe'}
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {transcription && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <h3 className="text-xl font-semibold">Transcription</h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default VideoTranscription;
