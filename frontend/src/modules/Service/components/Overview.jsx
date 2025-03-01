import React, { useState } from "react";

const Overview = ({ formData, setFormData, category }) => {
  const maxLength = 80;
  const maxTags = 5;
  const maxEventTypes = 3;

  const eventTypes = [
    "Wedding",
    "Party",
    "Business",
    "Birthday",
    "Engagement",
    "Honeymoon",
    "Graduation",
    "Art & music",
  ];

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      category: e.target.value,
      subcategory: subcategories[e.target.value][0],
    }));
  };

  const handleSubcategoryChange = (e) => {
    setFormData((prev) => ({ ...prev, subcategory: e.target.value }));
  };


  const handleEventTypeChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => {
      const selected = prev.eventType || [];
      return {
        ...prev,
        eventType: e.target.checked
          ? selected.length < maxEventTypes
            ? [...selected, value]
            : selected
          : selected.filter((type) => type !== value),
      };
    });
  };

  const addTag = () => {
    if (inputValue.trim() && (formData.tags || []).length < maxTags) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), inputValue.trim()],
      }));
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 space-y-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Gig Overview</h2>

        {/* Gig Title */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">
            Gig Title
          </label>
          <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <div className="flex items-center">
              <span className="text-gray-500 font-medium mr-2">I will</span>
              <textarea
                maxLength={maxLength}
                placeholder="do something I'm really good at"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full resize-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
                rows={2}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {formData.title.length}/{maxLength} characters
          </p>
        </div>

        {/* Category and Subcategory */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">
            Category
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
            >
              {category.map((cat) => (
                <option key={cat} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              value={formData.subcategory}
              onChange={handleSubcategoryChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
            >
              {category.find((cat) => cat._id === formData.category)?.subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Event Type */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">
            Event Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventTypes.map((type) => (
              <label
                key={type}
                className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:border-blue-500 transition-all cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={type}
                  checked={formData.eventType?.includes(type)}
                  onChange={handleEventTypeChange}
                  disabled={
                    formData.eventType?.length >= maxEventTypes &&
                    !formData.eventType.includes(type)
                  }
                  className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Search Tags */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-700">
            Search Tags
          </label>
          <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <div className="flex flex-wrap gap-2">
              {formData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-500 text-white rounded-full px-3 py-1 flex items-center space-x-2"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => removeTag(index)}
                    className="ml-1 text-white hover:text-gray-200 focus:outline-none"
                  >
                    ✕
                  </button>
                </span>
              ))}
              {formData.tags?.length < maxTags && (
                <input
                  type="text"
                  placeholder="Add a tag"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
