import React from "react";

const Card = ({
  imageUrl,
  sellerImage,
  sellerName,
  serviceTitle,
  rating,
  reviews,
  price,
  width = "260px",
}) => {
  return (
    <div
      className={`w-full md:w-[${width}] bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300`}
    >
      {/* Image Section */}
      <div className="relative w-full h-[160px] overflow-hidden">
        <img
          src={imageUrl}
          alt="services"
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        {/* Overlay for Hover Effect */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Seller Info Section */}
      <div className="p-4 flex items-center gap-3">
        <img
          src={sellerImage}
          alt="seller_picture"
          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
        />
        <div>
          <h2 className="font-bold text-md text-gray-800">{sellerName}</h2>
          {/* <p className='text-sm text-gray-500'>Top Rated Seller</p> */}
        </div>
      </div>

      {/* Service Title */}
      <p className="px-4 text-md font-medium text-gray-800 hover:text-blue-600 transition-colors duration-300">
        {serviceTitle}
      </p>

      {/* Rating and Reviews */}
      <div className="px-4 py-2 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-yellow-400"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="font-semibold text-gray-700">
            {rating} (<span className="text-gray-500">{reviews} reviews</span>)
          </p>
        </div>
      </div>

      {/* Price Section */}
      <div className="px-4 pb-4">
        <p className="text-lg font-bold text-gray-900">From {price}</p>
      </div>
    </div>
  );
};

export default Card;
