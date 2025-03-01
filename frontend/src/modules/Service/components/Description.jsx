import React, { useRef, useCallback, useState } from "react";
import {
  MDXEditor,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  InsertTable,
  linkDialogPlugin,
  markdownShortcutPlugin,
  frontmatterPlugin,
  ListsToggle,
  InsertThematicBreak,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

const Description = ({ formData, setFormData }) => {
  const ref = useRef(null);
  const { description, faqs } = formData;

  // Separate state for handling editing and open state of FAQs
  const [faqStates, setFaqStates] = useState({});

  const useDebounce = (callback, delay) => {
    const timerRef = useRef(null);

    return useCallback(
      (...args) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => callback(...args), delay);
      },
      [callback, delay]
    );
  };

  const debouncedDescriptionChange = useDebounce((markdown) => {
    setFormData((prev) => ({ ...prev, description: markdown }));
  }, 300);

  const handleFaqChange = (index, key, value) => {
    setFormData((prev) => {
      const updatedFaqs = [...prev.faqs];
      updatedFaqs[index] = { ...updatedFaqs[index], [key]: value };
      return { ...prev, faqs: updatedFaqs };
    });
  };

  // Toggle open/close state for FAQ dynamically
  const toggleFaq = (index) => {
    setFaqStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], isOpen: !prev[index]?.isOpen },
    }));
  };

  // Start editing FAQ
  const editFaq = (index) => {
    setFaqStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], isEditing: true },
    }));
  };

  // Stop editing FAQ
  const saveFaq = (index) => {
    setFaqStates((prev) => ({
      ...prev,
      [index]: { ...prev[index], isEditing: false },
    }));
  };

  // Delete FAQ
  const deleteFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
    setFaqStates((prev) => {
      const updatedStates = { ...prev };
      delete updatedStates[index];
      return updatedStates;
    });
  };

  // Add new FAQ
  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  return (
    <div className="w-full bg-gray-50 p-8 flex flex-col items-center">
      {/* Description Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Description</h1>
        <hr className="mb-6" />
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Briefly Describe Your Gig</h2>
        <MDXEditor
          className="my-2 bg-gray-50 max-h-60 overflow-y-auto rounded-lg border border-gray-200"
          ref={ref}
          markdown={description}
          plugins={[
            toolbarPlugin({
              toolbarClassName: "bg-gray-100 p-2 rounded-t-lg border-b border-gray-200",
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <InsertTable />
                  <ListsToggle />
                  <InsertThematicBreak />
                </>
              ),
            }),
            linkPlugin(),
            linkDialogPlugin(),
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            tablePlugin(),
            frontmatterPlugin(),
          ]}
          onChange={(markdown) => debouncedDescriptionChange(markdown)}
        />
        <span className="text-sm text-gray-500 mt-2">{description.length} / 1200 characters</span>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h1>
          <button
            onClick={addFaq}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            + Add FAQ
          </button>
        </div>
        <hr className="mb-6" />
        <p className="text-gray-600 mb-6">Add Questions & Answers for Your Buyers.</p>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item bg-gray-50 rounded-lg border border-gray-200 p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-semibold text-gray-700">{faq.question || "New Question"}</span>
                <span className="text-gray-500">{faqStates[index]?.isOpen ? "▲" : "▼"}</span>
              </div>
              {faqStates[index]?.isOpen && (
                <div className="mt-4 space-y-4">
                  {faqStates[index]?.isEditing ? (
                    <>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Question..."
                        value={faq.question}
                        onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                      />
                      <textarea
                        maxLength={300}
                        placeholder="Add an Answer..."
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                      />
                      <span className="text-sm text-gray-500">{300 - faq.answer.length} characters remaining</span>
                      <button
                        onClick={() => saveFaq(index)}
                        disabled={!faq.question.trim() || !faq.answer.trim()}
                        className={`px-4 py-2 text-white rounded-lg ${
                          faq.question.trim() && faq.answer.trim()
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-700">{faq.answer}</p>
                      <button
                        onClick={() => editFaq(index)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => deleteFaq(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;
