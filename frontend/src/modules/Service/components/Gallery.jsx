import React, { useEffect } from "react";

const Gallery = ({ formData, setFormData }) => {
  const handleFileChange = (event, key) => {
    const files = event.target.files ? Array.from(event.target.files) : [];

    // Validation checks remain the same
    if (key === "video" && files.length > 1) {
      alert("You can only upload one video.");
      return;
    }
    if (key === "images" && files.length + formData.images.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }
    if (key === "documents" && files.length + formData.documents.length > 2) {
      alert("You can only upload up to 2 documents.");
      return;
    }

    // Generate preview URLs for new files
    const processedFiles = files.map((file) => {
      file.preview = URL.createObjectURL(file); // Attach preview URL
      return file;
    });

    setFormData((prev) => {
      if (key === "video") {
        return { ...prev, video: processedFiles[0] };
      }
      return {
        ...prev,
        [key]: [...prev[key], ...processedFiles],
      };
    });
  };

  const removeFile = (key, index) => {
    setFormData((prev) => {
      // Revoke URL when removing a file
      if (key === "video") {
        URL.revokeObjectURL(prev.video?.preview);
        return { ...prev, video: null };
      }

      const updatedFiles = [...prev[key]];
      const [removedFile] = updatedFiles.splice(index, 1);
      URL.revokeObjectURL(removedFile.preview); // Cleanup removed file's URL

      return { ...prev, [key]: updatedFiles };
    });
  };

  // Cleanup Object URLs when files are removed
  useEffect(() => {
    return () => {
      formData.images.forEach((file) => URL.revokeObjectURL(file.preview));
      if (formData.video) URL.revokeObjectURL(formData.video.preview);
      formData.documents.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Showcase Your Services
      </h3>

      {/* Images Section */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">
          Images (Max: 3)
        </h4>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, "images")}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all"
          >
            Upload Images
          </label>
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: JPEG, PNG
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          {formData.images.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={file.preview}
                alt={file.name}
                className="w-24 h-24 object-cover rounded-lg shadow-sm"
              />
              <button
                onClick={() => removeFile("images", index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">
          Video (1 Only)
        </h4>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e, "video")}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all"
          >
            Upload Video
          </label>
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: MP4, AVI
          </p>
        </div>
        {formData.video && (
          <div className="mt-4 relative">
            <video
              src={formData.video.preview} // Use stored preview URL
              controls
              className="w-full max-h-64 rounded-lg shadow-sm"
            />
            <button
              onClick={() => removeFile("video")}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Documents Section */}
      <div>
        <h4 className="text-xl font-semibold text-gray-700 mb-4">
          Documents (Max: 2 PDFs)
        </h4>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={(e) => handleFileChange(e, "documents")}
            className="hidden"
            id="document-upload"
          />
          <label
            htmlFor="document-upload"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-all"
          >
            Upload Documents
          </label>
          <p className="text-sm text-gray-500 mt-2">Supported format: PDF</p>
        </div>
        <div className="mt-4 space-y-2">
          {formData.documents.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
            >
              <span className="text-gray-700">📄 {file.name}</span>
              <button
                onClick={() => removeFile("documents", index)}
                className="text-red-500 hover:text-red-600 transition-all"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
