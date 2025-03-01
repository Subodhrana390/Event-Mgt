import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Overview from "./components/Overview";
import PricingTable from "./components/Pricing";
import Description from "./components/Description";
import FiverrQuestions from "./components/Requirement";
import Gallery from "./components/Gallery";
import apiClient from "../../api/ApiClient";
import { useSelector } from "react-redux";

const CreateService = () => {
  const [category, setCategory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const getCategories = async () => {
    const res = await apiClient.get("/subcategories");
    setCategory(res.data.data);
  };

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    tags: [],
    eventType: [],
    images: [],
    video: null,
    documents: [],
    questions: [],
    packages: [
      {
        type: "Basic",
        title: "Basic",
        description: "",
        price: "",
        features: [],
      },
      {
        type: "Premium",
        title: "Premium",
        description: "",
        price: "",
        features: [],
      },
    ],
    description: "",
    faqs: [],
  });

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (category.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: category[0]._id,
        subcategory: category[0]?.subcategories[0]?._id,
      }));
    }
  }, [category]);

  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);

  const switchTab = (tabName) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("tab", tabName);
    navigate({ search: searchParams.toString() });
  };

  const currentTab =
    new URLSearchParams(location.search).get("tab") || "overview";

  const handleFormDataChange = (updatedFormData) => {
    setFormData(updatedFormData);
    // Clear validation errors for fields that have been filled
    const newValidationErrors = { ...validationErrors };
    Object.keys(updatedFormData).forEach((key) => {
      const value = updatedFormData[key];
      if (
        (typeof value === "string" && value.trim() !== "") ||
        (Array.isArray(value) && value.length > 0) ||
        (value !== null && typeof value === "object")
      ) {
        delete newValidationErrors[key];
      }
    });
    setValidationErrors(newValidationErrors);
  };

  const validateForm = () => {
    const errors = {};

    // Required text fields
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.subcategory) errors.subcategory = "Subcategory is required";
    if (!formData.description.trim())
      errors.description = "Description is required";

    // Required arrays
    if (formData.tags.length === 0)
      errors.tags = "At least one tag is required";
    if (formData.eventType.length === 0)
      errors.eventType = "At least one event type is required";
    if (formData.images.length === 0)
      errors.images = "At least one image is required";

    // Validate packages
    const invalidPackages = formData.packages.filter(
      (pkg) =>
        !pkg.title.trim() ||
        !pkg.description.trim() ||
        !pkg.price ||
        pkg.features.length === 0
    );

    if (invalidPackages.length > 0) {
      errors.packages =
        "All packages must have a name, description, price, and at least one feature";
    }

    // Validate questions (if required)
    if (formData.questions.length === 0) {
      errors.questions = "At least one question is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fill all required fields before submitting");

      // Switch to the tab with the first error
      const errorTabs = {
        title: "overview",
        category: "overview",
        subcategory: "overview",
        tags: "overview",
        eventType: "overview",
        packages: "pricing",
        description: "description",
        questions: "requirements",
        images: "gallery",
        video: "gallery",
        documents: "gallery",
      };

      const firstError = Object.keys(validationErrors)[0];
      if (
        firstError &&
        errorTabs[firstError] &&
        errorTabs[firstError] !== currentTab
      ) {
        switchTab(errorTabs[firstError]);
      }

      return;
    }

    setIsSubmitting(true);

    // Show loading toast
    const loadingToastId = toast.loading("Creating your service...");

    try {
      // Create a FormData object to handle the multipart form data
      const form = new FormData();

      // Add basic text fields
      form.append("title", formData.title);
      form.append("category", formData.category);
      form.append("subcategory", formData.subcategory);
      form.append("description", formData.description);

      // Add array fields as JSON strings
      form.append("tags", JSON.stringify(formData.tags));
      form.append("eventType", JSON.stringify(formData.eventType));
      form.append("questions", JSON.stringify(formData.questions));
      form.append("packages", JSON.stringify(formData.packages));
      form.append("faqs", JSON.stringify(formData.faqs));

      // Handle images - append each file with a unique name
      if (formData.images && formData.images.length) {
        formData.images.forEach((image, index) => {
          if (image instanceof File) {
            form.append(`images`, image);
          }
        });
      }

      // Handle video
      if (formData.video instanceof File) {
        form.append("video", formData.video);
      }

      // Handle documents - append each file with a unique name
      if (formData.documents && formData.documents.length) {
        formData.documents.forEach((doc, index) => {
          if (doc instanceof File) {
            form.append(`documents`, doc);
          }
        });
      }

      // Send the request
      const res = await apiClient.post(
        `${import.meta.env.VITE_API_BASE_URL}/services`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update the loading toast with success message
      toast.update(loadingToastId, {
        render: "Service created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      console.log("Service created:", res.data)  ;

      // Optional: Reset form or navigate to a success page
      // navigate("/services");
    } catch (error) {
      console.error("Error saving form data:", error);

      // Update the loading toast with error message
      toast.update(loadingToastId, {
        render: error.response?.data?.message || "Failed to save form data",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to display validation errors
  const renderValidationError = (field) => {
    if (validationErrors[field]) {
      return (
        <div className="text-red-500 text-sm mt-1">
          {validationErrors[field]}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="w-full bg-white shadow-sm">
        <nav className="container mx-auto px-4">
          <ul className="flex justify-between items-center py-4">
            {[
              "overview",
              "pricing",
              "description",
              "requirements",
              "gallery",
            ].map((name) => (
              <li
                key={name}
                className={`flex-1 text-center cursor-pointer transition-all duration-300 ${
                  currentTab === name
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                } ${
                  Object.keys(validationErrors).some(
                    (key) =>
                      [
                        "overview",
                        "pricing",
                        "description",
                        "requirements",
                        "gallery",
                      ].indexOf(name) ===
                      [
                        "title",
                        "category",
                        "subcategory",
                        "tags",
                        "eventType",
                        "packages",
                        "description",
                        "questions",
                        "images",
                        "video",
                        "documents",
                      ]
                        .filter((field) => validationErrors[field])
                        .map((field) => {
                          if (
                            [
                              "title",
                              "category",
                              "subcategory",
                              "tags",
                              "eventType",
                            ].includes(field)
                          )
                            return "overview";
                          if (field === "packages") return "pricing";
                          if (field === "description") return "description";
                          if (field === "questions") return "requirements";
                          if (["images", "video", "documents"].includes(field))
                            return "gallery";
                          return "";
                        })
                        .indexOf(name)
                  )
                    ? "border-red-500 border-b"
                    : ""
                }`}
                onClick={() => switchTab(name)}
              >
                <span className="py-2 block">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                  {Object.keys(validationErrors).some(
                    (key) =>
                      [
                        "overview",
                        "pricing",
                        "description",
                        "requirements",
                        "gallery",
                      ].indexOf(name) ===
                      [
                        "title",
                        "category",
                        "subcategory",
                        "tags",
                        "eventType",
                        "packages",
                        "description",
                        "questions",
                        "images",
                        "video",
                        "documents",
                      ]
                        .filter((field) => validationErrors[field])
                        .map((field) => {
                          if (
                            [
                              "title",
                              "category",
                              "subcategory",
                              "tags",
                              "eventType",
                            ].includes(field)
                          )
                            return "overview";
                          if (field === "packages") return "pricing";
                          if (field === "description") return "description";
                          if (field === "questions") return "requirements";
                          if (["images", "video", "documents"].includes(field))
                            return "gallery";
                          return "";
                        })
                        .indexOf(name)
                  ) && <span className="ml-1 text-red-500">•</span>}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentTab === "overview" && (
            <Overview
              formData={formData}
              setFormData={handleFormDataChange}
              category={category}
              errors={validationErrors}
              renderError={renderValidationError}
            />
          )}
          {currentTab === "pricing" && (
            <PricingTable
              formData={formData}
              setFormData={handleFormDataChange}
              errors={validationErrors}
              renderError={renderValidationError}
            />
          )}
          {currentTab === "description" && (
            <Description
              formData={formData}
              setFormData={handleFormDataChange}
              errors={validationErrors}
              renderError={renderValidationError}
            />
          )}
          {currentTab === "requirements" && (
            <FiverrQuestions
              formData={formData}
              setFormData={handleFormDataChange}
              errors={validationErrors}
              renderError={renderValidationError}
            />
          )}
          {currentTab === "gallery" && (
            <Gallery
              formData={formData}
              setFormData={handleFormDataChange}
              errors={validationErrors}
              renderError={renderValidationError}
            />
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
