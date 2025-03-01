import { useEffect, useState } from "react";

const PricingTable = ({ formData, setFormData }) => {
   const [packages, setPackages] = useState(() =>
    formData.packages.map((pkg) => ({
      featureInput: "",
      ...pkg,
    }))
  );

  useEffect(() => {
    const cleanedPackages = packages.map(({ featureInput, ...rest }) => rest);
    setFormData({ ...formData, packages: cleanedPackages });
  }, [packages]);

  const handleInputChange = (index, field, value) => {
    setPackages((prevPackages) => {
      const updatedPackages = [...prevPackages];
      updatedPackages[index][field] = value;
      return updatedPackages;
    });
  };

  const handleFeatureKeyPress = (e, index) => {
    const inputValue = packages[index].featureInput?.trim();

    if (e.key === "Enter" && inputValue) {
      e.preventDefault();

      setPackages((prevPackages) => {
        const updatedPackages = [...prevPackages];
        const packageToUpdate = updatedPackages[index];

        if (
          !packageToUpdate.features.some(
            (feature) => feature.toLowerCase() === inputValue.toLowerCase()
          )
        ) {
          packageToUpdate.features.push(inputValue);
          packageToUpdate.featureInput = "";
        } else {
          packageToUpdate.featureInput = "";
        }

        return updatedPackages;
      });
    }
  };

  const removeFeature = (index, featureIndex) => {
    setPackages((prevPackages) => {
      const updatedPackages = [...prevPackages];
      updatedPackages[index].features.splice(featureIndex, 1);
      return updatedPackages;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Pricing Packages
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {pkg.name || "Package Name"}
              </h3>
              <input
                type="text"
                value={pkg.title}
                onChange={(e) =>
                  handleInputChange(index, "title", e.target.value)
                }
                disabled
                placeholder="Package Name"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-gray-700"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={pkg.description}
                onChange={(e) =>
                  handleInputChange(index, "description", e.target.value)
                }
                placeholder="Describe your package"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                rows={3}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {pkg.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                    <button
                      onClick={() => removeFeature(index, featureIndex)}
                      className="ml-2 text-blue-800 hover:text-blue-900 focus:outline-none"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a feature & press Enter"
                value={pkg.featureInput}
                onChange={(e) =>
                  handleInputChange(index, "featureInput", e.target.value)
                }
                onKeyPress={(e) => handleFeatureKeyPress(e, index)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                value={pkg.price}
                min={0}
                onChange={(e) =>
                  handleInputChange(index, "price", e.target.value)
                }
                placeholder="e.g., $50"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;