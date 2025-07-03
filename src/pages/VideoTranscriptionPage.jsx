// import React from 'react';
// import VideoTranscription from '../components/VideoTranscription';

// const VideoTranscriptionPage = () => {
//   return (
//     <div>
//       <h1>Video Transcription</h1>
//       <VideoTranscription />
//     </div>
//   );
// };

// export default VideoTranscriptionPage;

import React from 'react';
import VideoTranscription from '../components/VideoTranscription';

const VideoTranscriptionPage = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Video Transcription</h1>
      <VideoTranscription />
    </div>
  );
};

export default VideoTranscriptionPage;
