import {
  ClipboardDocumentCheckIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ServiceListing = () => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const navigate = useNavigate();

  const fetchServices = async (pageNum) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/v1/services?page=${pageNum}&pageSize=5`
      );
      const data = await response.json();

      const newServices = data.services;
      setServices((prevServices) => [...prevServices, ...newServices]);

      setHasMore(services.length < data.totalServices);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch services", error);
      setLoading(false);
    }
  };

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasMore, loading]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  useEffect(() => {
    fetchServices(page);
  }, [page]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        </div>

        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200"
              onClick={() => navigate(`/service/${service._id}`)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 mt-2">{service.description}</p>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-gray-700">
                      {service.rating || "New"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    {service.packages &&
                      service.packages.map((pkg) => (
                        <div
                          key={pkg._id}
                          className="border border-gray-200 rounded-lg p-4 bg-white"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <ClipboardDocumentCheckIcon className="h-4 w-4" />
                            <h3 className="font-semibold">{pkg.title}</h3>
                          </div>
                          {pkg.features && (
                            <ul className="text-sm text-gray-600 space-y-1 mb-3">
                              {pkg.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="mr-2">•</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          )}
                          <p className="text-lg font-bold text-gray-900">
                            {formatPrice(pkg.price)}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={loader}
          className="h-10 flex items-center justify-center mt-4"
        >
          {loading && (
            <div className="text-gray-600">Loading more services...</div>
          )}
          {!hasMore && (
            <div className="text-gray-600">No more services to load</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceListing;
