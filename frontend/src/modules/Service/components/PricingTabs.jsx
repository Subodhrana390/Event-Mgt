import { useState } from "react";
import {
  InformationCircleIcon
} from "@heroicons/react/16/solid";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

const PricingTabs = ({ packages, onContinue }) => {
    const [activeTab, setActiveTab] = useState("Basic");
  
    // Get the selected package based on the active tab
    const selectedPackage = activeTab === "Basic" ? packages[0] : packages[1];
  
    return (
      <div className={`w-full col-span-2 bg-gray-100 rounded-lg shadow-lg`}>
        {/* Tabs */}
        <div className="grid grid-cols-2">
          <div
            className={`cursor-pointer p-4 text-center transition-all ${
              activeTab === "Basic"
                ? "bg-green-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("Basic")}
          >
            Basic
          </div>
          <div
            className={`cursor-pointer p-4 text-center transition-all ${
              activeTab === "premium"
                ? "bg-green-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("premium")}
          >
            Premium
          </div>
        </div>
  
        {/* Content */}
        <div className="mb-6 w-full bg-gray-100">
          {activeTab === "Basic" && (
            <div className="p-6 rounded-lg">
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="font-semibold">{packages[0].title}</span>
                  <span className="flex items-center text-blue-600">
                    ₹ {packages[0].price}{" "}
                    <InformationCircleIcon className="w-5 h-5 ml-2" />
                  </span>
                </li>
                {packages[0].features.map((feat, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}
  
          {activeTab === "premium" && (
            <div className="p-6 rounded-lg">
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="font-semibold">{packages[1].title}</span>
                  <span className="flex items-center text-blue-600">
                    ₹ {packages[1].price}{" "}
                    <InformationCircleIcon className="w-5 h-5 ml-2" />
                  </span>
                </li>
                {packages[1].features.map((feat, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
  
        <div className="p-2">
          <button
            onClick={() => onContinue(selectedPackage)} // Pass the selected package
            className="w-full mb-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all flex items-center justify-center"
          >
            Continue <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
          <button className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
            Compare packages
          </button>
        </div>
      </div>
    );
  };

  export default PricingTabs