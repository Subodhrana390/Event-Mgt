import React from "react";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FaEarthAsia, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] text-black py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Categories */}
          <nav aria-label="Categories">
            <h3 className="font-bold text-xl mb-4">Categories</h3>
            <ul className="space-y-2">
              {[
                "Graphics & Design",
                "Digital Marketing",
                "Writing & Translation",
                "Video & Animation",
                "Music & Audio",
                "Programming & Tech",
                "AI Services",
                "Consulting",
                "Data",
                "Business",
                "Personal Growth & Hobbies",
                "Photography",
                "Finance",
                "End-to-End Projects",
                "Service Catalog",
              ].map((category, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-500 font-semibold hover:text-gray-400 transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 2: For Clients */}
          <nav aria-label="For Clients">
            <h3 className="font-bold text-lg mb-4">For Clients</h3>
            <ul className="space-y-2">
              {[
                "How Fiverr Works",
                "Customer Success Stories",
                "Trust & Safety",
                "Quality Guide",
                "Fiverr Learn",
                "Online Courses",
                "Fiverr Guides",
                "Fiverr Answers",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-500 font-semibold hover:text-gray-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: For Freelancers */}
          <nav aria-label="For Freelancers">
            <h3 className="font-bold text-lg mb-4">For Freelancers</h3>
            <ul className="space-y-2">
              {[
                "Become a Fiverr Freelancer",
                "Become an Agency",
                "Freelancer Equity Program",
                "Kickstart",
                "Community Hub",
                "Forum",
                "Events",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-500 font-semibold hover:text-gray-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Business Solutions */}
          <nav aria-label="Business Solutions">
            <h3 className="font-bold text-lg mb-4">Business Solutions</h3>
            <ul className="space-y-2">
              {[
                "Fiverr Pro",
                "Project Management Service",
                "ClearVoice",
                "Content Marketing",
                "Working Not Working",
                "Creative Talent",
                "AutoDS",
                "Dropshipping Tool",
                "Fiverr Logo Maker",
                "Contact Sales",
                "Fiverr Go",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-500 font-semibold hover:text-gray-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 5: Company */}
          <nav aria-label="Company">
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                "About Fiverr",
                "Help & Support",
                "Social Impact",
                "Careers",
                "Terms of Service",
                "Privacy Policy",
                "Partnerships",
                "Creator Network",
                "Affiliates",
                "Invite a Friend",
                "Press & News",
                "Investor Relations",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-500 font-semibold hover:text-gray-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-gray-800 mt-8 pt-8 text-cente text-gray-400">
          {/* Copyright Notice */}
          <p className="text-sm mb-4 text-center">
            &copy; {new Date().getFullYear()} Fiverr. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-gray-400 hover:text-pink-500 transition-colors"
            >
              <FaInstagramSquare className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <FaLinkedinIn className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com"
              aria-label="YouTube"
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <FaYoutube className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
          </div>

          {/* Language Selector */}
          <div className="flex justify-center items-center space-x-2">
            <FaEarthAsia className="w-5 h-5 text-gray-500" />
            <span className="text-gray-400">English</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
