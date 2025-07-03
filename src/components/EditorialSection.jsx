// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const EditorialSection = ({ onSave, onClose, initialContent }) => {
//   const [content, setContent] = useState(initialContent);

//   const modules = {
//     toolbar: [
//       [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//       [{ 'size': [] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' },
//       { 'indent': '-1' }, { 'indent': '+1' }],
//       ['link', 'image'],
//       [{ 'color': [] }, { 'background': [] }],
//       [{ 'align': [] }],
//       ['clean']
//     ],
//   };

//   const formats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image',
//     'color', 'background', 'align'
//   ];

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
//         <h2 className="text-2xl font-semibold mb-4">Edit Article</h2>
//         <ReactQuill
//           value={content}
//           onChange={setContent}
//           modules={modules}
//           formats={formats}
//         />
//         <div className="flex justify-end mt-4">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mr-2"
//             onClick={() => onSave(content)}
//           >
//             Save
//           </button>
//           <button
//             className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditorialSection;

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditorialSection = ({ onSave, onClose, initialContent }) => {
  const [content, setContent] = useState(initialContent);

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
      [{ 'align': [] }],
      ['clean']                                         
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background', 'align'
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
        <h2 className="text-2xl font-semibold mb-4">Edit Article</h2>
        <ReactQuill 
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mr-2"
            onClick={() => onSave(content)}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
            onClick={onClose}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorialSection;
