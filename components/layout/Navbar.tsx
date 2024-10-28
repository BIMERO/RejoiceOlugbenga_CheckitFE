import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="bg-brand_primary-50 text-white -mb-[1px]">
      <nav className="contain flex justify-between items-center py-8">
        <Image src="/logo.png" alt="logo" width={280} height={40} />
        <ul className="flex justify-between items-center gap-16">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Products</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
