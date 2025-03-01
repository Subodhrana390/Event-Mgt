import { Link } from "react-router-dom";

const Hero = () => {
    return (
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">Find & Offer Professional Services</h1>
            <p className="py-6 text-lg text-gray-600">
              Connect with top service providers and get the best solutions for your needs. From design to development, photography to marketing, find everything in one place.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/services" className="btn btn-primary">Explore Services</Link>
              <Link to="/register" className="btn btn-outline">Become a Seller</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Hero;