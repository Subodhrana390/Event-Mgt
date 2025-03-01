import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Card from "./card"; // Import your Card component

const Basedonyourbrowsinghistory = () => {
  // Create a ref for the Slider component
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);

  // Slider settings
  const settings = {
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 4, // Number of cards to show at once
    slidesToScroll: 1, // Number of cards to scroll
    responsive: [
      {
        breakpoint: 1280, // Adjust for tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Adjust for tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Adjust for mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Adjust for mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const secondsettings = {
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 5, // Number of cards to show at once
    slidesToScroll: 1, // Number of cards to scroll
    responsive: [
      {
        breakpoint: 1280, // Adjust for tablets
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Adjust for tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Adjust for mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Adjust for mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full p-6">
      {/* Heading */}
      <div className="flex justify-between px-10">
        <h1 className="text-sm md:text-2xl font-bold mb-6">
          Based on your browsing history
        </h1>
        <div className="flex gap-10">
          {/* Previous Arrow */}
          <button
            onClick={() => slider1Ref.current.slickPrev()}
            className="p-2 border rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          {/* Next Arrow */}
          <button
            onClick={() => slider1Ref.current.slickNext()}
            className="p-2 border rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="mt-1 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Keep Exploring Section */}
        <div className="col-span-1 flex justify-center items-center ">
          <div className="flex items-center mb-6 border p-4 rounded-lg border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>
            <span className="text-gray-700 font-semibold">Keep exploring</span>
          </div>
        </div>

        {/* Slider Section */}
        <div className="col-span-1 md:col-span-4 relative">
          <Slider ref={slider1Ref} {...settings}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="px-2">
                <Card
                  imageUrl="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/364619355/original/9ed6cfb0d447d4ee25f1d4a525bdc7f56c031e3c.jpg"
                  sellerImage="https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/824cba135857ed94e1d38049c08138fd-1731656600189/393fd095-a2dc-41bd-be37-6441fa926bb6.jpg"
                  sellerName="Subodh Rana"
                  serviceTitle="I will create adobe lightroom presets for you"
                  rating="5.0"
                  reviews="3"
                  price="₹9,096"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Gigs you may like  */}
      <div className="mt-10 relative">
        {/* Heading */}
        <h1 className="font-bold text-2xl my-8">Gigs you may like</h1>

        {/* Previous Arrow */}
        <button
          onClick={() => slider2Ref.current.slickPrev()}
          className="absolute top-[60%] -left-5 transform -translate-y-1/2 p-2 border rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 z-10"
          aria-label="Previous Slide"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        {/* Next Arrow */}
        <button
          onClick={() => slider2Ref.current.slickNext()}
          className="absolute top-[60%] -right-5 transform -translate-y-1/2 p-2 border rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 z-10"
          aria-label="Next Slide"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Slider */}
        <Slider ref={slider2Ref} {...secondsettings}>
          {[1, 2, 3, 4, 5].map((e, i) => (
            <div key={i} className="px-2">
              <Card
                imageUrl="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/364619355/original/9ed6cfb0d447d4ee25f1d4a525bdc7f56c031e3c.jpg"
                sellerImage="https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/824cba135857ed94e1d38049c08138fd-1731656600189/393fd095-a2dc-41bd-be37-6441fa926bb6.jpg"
                sellerName="Subodh Rana"
                serviceTitle="I will create adobe lightroom presets for you"
                rating="5.0"
                reviews="3"
                price="₹9,096"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Basedonyourbrowsinghistory;
