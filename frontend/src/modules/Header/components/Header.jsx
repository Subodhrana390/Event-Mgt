import React, { useState, useRef, useEffect } from "react";

const Header = ({ categories }) => {
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const dropdownRef = useRef(null);

  const handleCategoryClick = (categoryId) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenCategoryId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="Header" className="bg-white shadow-sm">
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Hamburger Menu and Logo */}
          <div className="flex items-center">
            {/* Hamburger Menu */}
            <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="19"
                viewBox="0 0 23 19"
                fill="#555"
              >
                <rect y="16" width="23" height="3" rx="1.5" />
                <rect width="23" height="3" rx="1.5" />
                <rect y="8" width="23" height="3" rx="1.5" />
              </svg>
            </button>

            {/* Logo */}
            <a href="/" className="ml-4">
              <svg
                width="89"
                height="27"
                viewBox="0 0 89 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#404145">
                  <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z" />
                </g>
                <g fill="#1dbf73">
                  <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z" />
                </g>
              </svg>
            </a>
          </div>

          {/* Middle: Search Bar */}
          <div className="flex-1 mx-6">
            <form className="w-full max-w-md">
              <div className="relative">
                <input
                  type="search"
                  placeholder="What service are you looking for today?"
                  className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 px-4 bg-green-600 rounded-r-lg hover:bg-green-700 focus:outline-none"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                  >
                    <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Notifications */}
            <button className="p-2 text-gray-700 hover:text-gray-900 relative">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M3.494 6.818a6.506 6.506 0 0 1 13.012 0v2.006c0 .504.2.988.557 1.345l1.492 1.492a3.869 3.869 0 0 1 1.133 2.735 2.11 2.11 0 0 1-2.11 2.11H2.422a2.11 2.11 0 0 1-2.11-2.11c0-1.026.408-2.01 1.134-2.735l1.491-1.492c.357-.357.557-.84.557-1.345V6.818Zm-1.307 7.578c0 .13.106.235.235.235h15.156c.13 0 .235-.105.235-.235 0-.529-.21-1.036-.584-1.41l-1.492-1.491a3.778 3.778 0 0 1-1.106-2.671V6.818a4.63 4.63 0 1 0-9.262 0v2.006a3.778 3.778 0 0 1-1.106 2.671L2.77 12.987c-.373.373-.583.88-.583 1.41Zm4.49 4.354c0-.517.419-.937.937-.937h4.772a.938.938 0 0 1 0 1.875H7.614a.937.937 0 0 1-.938-.938Z" />
              </svg>
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Messages */}
            <button className="p-2 text-gray-700 hover:text-gray-900">
              <svg
                width="16"
                height="16"
                viewBox="0 0 18 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M.838 4.647a.75.75 0 0 1 1.015-.309L9 8.15l7.147-3.812a.75.75 0 0 1 .706 1.324l-7.5 4a.75.75 0 0 1-.706 0l-7.5-4a.75.75 0 0 1-.309-1.015Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.5 2.25a.25.25 0 0 0-.25.25v11c0 .138.112.25.25.25h13a.25.25 0 0 0 .25-.25v-11a.25.25 0 0 0-.25-.25h-13ZM.75 2.5c0-.966.784-1.75 1.75-1.75h13c.966 0 1.75.784 1.75 1.75v11a1.75 1.75 0 0 1-1.75 1.75h-13A1.75 1.75 0 0 1 .75 13.5v-11Z"
                />
              </svg>
            </button>

            {/* Lists */}
            <button className="p-2 text-gray-700 hover:text-gray-900">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M14.325 2.00937C12.5188 0.490623 9.72813 0.718748 8 2.47812C6.27188 0.718748 3.48125 0.487498 1.675 2.00937C-0.674996 3.9875 -0.331246 7.2125 1.34375 8.92187L6.825 14.5062C7.1375 14.825 7.55625 15.0031 8 15.0031C8.44688 15.0031 8.8625 14.8281 9.175 14.5094L14.6563 8.925C16.3281 7.21562 16.6781 3.99062 14.325 2.00937ZM13.5875 7.86875L8.10625 13.4531C8.03125 13.5281 7.96875 13.5281 7.89375 13.4531L2.4125 7.86875C1.27188 6.70625 1.04063 4.50625 2.64063 3.15937C3.85625 2.1375 5.73125 2.29062 6.90625 3.4875L8 4.60312L9.09375 3.4875C10.275 2.28437 12.15 2.1375 13.3594 3.15625C14.9563 4.50312 14.7188 6.71562 13.5875 7.86875Z" />
              </svg>
            </button>

            {/* Orders */}
            <button className="p-2 text-gray-700 hover:text-gray-900">
              <span>Orders</span>
            </button>

            {/* Fiverr Go */}
            <a
              href="/go/hub/explore"
              className="text-gray-700 hover:text-gray-900"
            >
              Try Fiverr Go
            </a>

            {/* Switch to Selling */}
            <a
              href="/users/subodhrana390/seller_dashboard"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Switch to Selling
            </a>

            {/* Profile */}
            <button className="p-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                S
              </div>
            </button>
          </nav>
        </div>

        <div className="flex justify-start items-center bg-gray-50 p-2 border-t border-gray-200">
          {categories.map((category) => (
            <div key={category._id} className="group relative" ref={dropdownRef}>
              {/* Category Header */}
              <div
                className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-gray-900"
                onClick={() => handleCategoryClick(category._id)}
              >
                <img src={category.icon} alt={category.name} className="w-6 h-6" />
                <span>{category.name}</span>
              </div>

              {/* Subcategories Dropdown */}
              {(openCategoryId === category._id || openCategoryId === null) && (
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-1   min-w-[200px] p-4">
                  {category.subcategories.map((subcategory) => (
                    <a
                      key={subcategory._id}
                      href={`/category/${category._id}/${subcategory._id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                    >
                      {subcategory.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Header;