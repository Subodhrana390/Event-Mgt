import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import {
  Bars3Icon,
  CheckCircleIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  HomeIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import Card from "../Home/components/Card";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import SellerInfo from "./components/SellerInfo";
import PricingTabs from "./components/PricingTabs";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null)

  const fetchServices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/services/${id}`
      );
      const data = await response.json();
      setService(data);
      setAvailableDates(data.availableDates);
    } catch (error) {
      console.error("Failed to fetch services", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
  };

  const slider2Ref = useRef();

  const secondsettings = {
    infinite: false, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 3, // Number of cards to show at once
    slidesToScroll: 1, // Number of cards to scroll
    responsive: [
      {
        breakpoint: 1024, // Adjust for tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Adjust for mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleContinue = async (selectedPackage) => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    try {
      const bookingData = {
        service: id, // Service ID from URL
        packageId: selectedPackage._id, // Package ID
        amount: selectedPackage.price, // Package price
        date: selectedDate, // Selected date
      };

      // const bookingResponse = await axios.post("/api/bookings", {
      //   user: "64f1b2b3c9e77b001f8e4d1a", // Replace with the logged-in user's ID
      //   service: serviceId,
      //   date,
      //   amount: service.price, // Assuming the service has a price field
      // });

      // // Send booking data to the backend
      // const response = await fetch("http://localhost:3000/api/v1/bookings", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(bookingData),
      // });

      // if (!response.ok) throw new Error("Failed to book service");

      // const result = await response.json();
      // console.log("Booking successful:", result);

      // Redirect to a success page or show a success message
      alert("Booking successful!");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="relative py-10 px-4 bg-gray-50 sm:px-20 min-h-screen">
      {/* Top Bar */}
      <div className="top-bar flex justify-between items-centergap-6 mb-8">
        <div className="inline-flex items-center gap-2 text-gray-600">
          <HomeIcon className="w-4 h-4" />
          <span className="font-semibold">/{service?.category?.name}</span>
          <span className="font-semibold">/ {service?.subcategory?.name}</span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Bars3Icon className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
          <HeartIcon className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer" />
          <span className="text-gray-600">9</span>
          <ShareIcon className="w-5 h-5 text-gray-500 hover:text-blue-500 cursor-pointer" />
          <EllipsisHorizontalIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-2">
          {/* Service Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            {service?.title}
          </h1>

          {/* Seller Info */}
          <SellerInfo name={service?.seller?._id} reviews={3} rating={5} />

          {/* Service Image */}
          <div className="my-8 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={service?.images[0]}
              alt="Adobe Lightroom Presets"
              className="w-full h-auto aspect-video  transform hover:scale-105 transition-transform"
            />
          </div>
        </div>

        <div className="col-span-1">
          {service && (
            <PricingTabs
              packages={service?.packages}
              onContinue={handleContinue}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2">
          {/* About Service */}
          <div div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm mt-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              About this service
            </h1>
            <p className="text-gray-600 mb-4">{service?.description}</p>

            <hr className="my-4" />

            {/* Service Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
              <div>
                <h2 className="font-semibold text-gray-700">Style</h2>
                <p className="text-gray-600">
                  Bright & airy, Cool colors, Black & white
                </p>
              </div>
              <div>
                <h2 className="font-semibold text-gray-700">Device</h2>
                <p className="text-gray-600">PC, Mac</p>
              </div>
              <div>
                <h2 className="font-semibold text-gray-700">Software</h2>
                <p className="text-gray-600">LightRoom</p>
              </div>
            </div>
          </div>

          {/* Seller Details */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm mt-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Get to know {service?.seller?._id}
            </h1>
            <SellerInfo name={service?.seller?._id} reviews={7} rating={5} />

            <button className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all">
              Contact Me
            </button>

            <div className="mt-6 border border-gray-200 p-6 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-gray-600">From</span>
                  <span className="font-semibold">India</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-semibold">2015</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600">Avg. response time</span>
                  <span className="font-semibold">2 hours</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600">Last Delivery</span>
                  <span className="font-semibold">2 Weeks</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600">Language</span>
                  <span className="font-semibold">English</span>
                </div>
              </div>
              <hr className="my-4" />
              <p className="text-gray-600 text-justify font-semibold">
                I am a professional, published photographer, currently working
                as Head Creative Department at a local firm. <br />
                <br /> I have an extensive experience of over a decade with
                photo and video editing. <br /> <br /> I have over a decade of
                experience in post-processing, color grading, and editing
                pictures.
              </p>
            </div>
          </div>

          {/* Package Comparison */}
          <div
            id="comparePackages"
            className="bg-white p-6 sm:p-8 rounded-lg shadow-sm mt-8"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Compare packages
            </h1>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 font-semibold text-gray-700">Package</th>
                  <th className="py-3 font-semibold text-gray-700">Price</th>
                  <th className="py-3 font-semibold text-gray-700">Features</th>
                  <th className="py-3 font-semibold text-gray-700">
                    Action
                  </th>{" "}
                  {/* New column for the button */}
                </tr>
              </thead>
              <tbody>
                {service?.packages?.map((pkg, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 font-semibold text-gray-800">
                      {pkg?.title}
                    </td>
                    <td className="py-4 text-gray-600">{pkg?.price}</td>
                    <td className="py-4 text-gray-600">
                      <ul>
                        {pkg?.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleSelectPackage(pkg)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recommended Service */}
          <div className="grid-cols-1 mt-5 relative p-5 border border-gray-400 rounded-lg">
            {/* Heading */}
            <h1 className="font-bold text-2xl my-3">Recommended For you</h1>

            {/* Previous Arrow */}
            <button
              onClick={() => slider2Ref.current.slickPrev()}
              className="absolute top-[60%] left-3 transform -translate-y-1/2 p-2 border rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 z-10"
              aria-label="Previous Slide"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={() => slider2Ref.current.slickNext()}
              className="absolute top-[60%] right-3 transform -translate-y-1/2 p-2 border rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 z-10"
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
                    width="280px"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
