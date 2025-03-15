import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">About Us</h2>
          <p className="text-sm">
            We are committed to providing the best products and services to our
            customers. Explore a wide range of items crafted with care.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">Contact Us</h2>
          <p className="text-sm">Email: support@ecommerce.com</p>
          <p className="text-sm">Phone: +1 (800) 123-4567</p>
          <p className="text-sm">Address: 123 E-commerce St., Shop City</p>
        </div>

        {/* Newsletter Section */}
        <div>
          <h2 className="text-lg font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mb-4 text-gray-800 rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="bg-gray-700 text-center p-4 text-sm">
        <p>
          &copy; {new Date().getFullYear()} E-commerce Co. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
