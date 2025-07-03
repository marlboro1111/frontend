import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { updateGeneratedText } from '../features/articles/articlesSlice';
import EditorialSection from '../components/EditorialSection';

const EditorialSectionPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  // const { generatedText } = useSelector((state) => state.articles);
  const { generatedText, generatedUrl, suggestedTitles } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const handleSave = (content) => {
    dispatch(updateGeneratedText({ text: content, url: generatedUrl }));
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Editorial Section</h1>
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <div className="p-4 border rounded-md bg-gray-50">
          <div dangerouslySetInnerHTML={{ __html: generatedText }} />
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            onClick={() => setIsEditing(true)}
          >
            Edit <PencilIcon className="h-5 w-5 inline-block ml-1" />
          </button>
        </div>
      </div>

      <Transition.Root show={isEditing} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsEditing(false)}>
          <div className="fixed inset-0 flex items-center justify-center p-5">
            <Dialog.Panel className="w-full max-h-screen overflow-y-auto p-4 max-w-xl rounded bg-black dark:bg-gray-800">
              <div className="flex justify-end">
                <button onClick={() => setIsEditing(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="red"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </button>
              </div>
              <EditorialSection
                initialContent={generatedText}
                onSave={handleSave}
                onClose={() => setIsEditing(false)}
              />
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex justify-start mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EditorialSectionPage;
