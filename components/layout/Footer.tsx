import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-brand_primary-50 text-white">
      <footer className="contain py-10">
        <div className="flex flex-wrap flex-col items-center justify-center gap-4 border-b-2 border-white pb-6">
          <Image
            src="/logo.png"
            alt="logo"
            width={280}
            height={40}
            className="logo"
          />
          <ul className="flex flex-wrap flex-col md:flex-row justify-between items-center gap-16">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Products</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </div>

        <p className="text-center mt-6">Powered by SpaceX API</p>
      </footer>
    </div>
  );
};

export default Footer;
