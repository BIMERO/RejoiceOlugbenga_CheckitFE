"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [Isdropdown, setIsdropdown] = useState(false);

  const Opendropdown = () => {
    setIsdropdown(true);
  };

  const Closedropdown = () => {
    setIsdropdown(false);
  };

  return (
    <>
      <div className="bg-brand_primary-50 text-white -mb-[1px]">
        <nav className="contain flex justify-between items-center py-8">
          <Image
            src="/logo.png"
            alt="logo"
            width={280}
            height={40}
            className="logo"
          />
          <ul className="justify-between items-center gap-16 hidden lg:flex">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Products</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>

          <div className="block lg:hidden">
            {Isdropdown ? (
              <CgClose onClick={Closedropdown} className="text-2xl" />
            ) : (
              <IoMenu onClick={Opendropdown} className="text-2xl" />
            )}
          </div>
        </nav>
      </div>

      {Isdropdown && (
        <div className="fixed right-0 z-20 top-0 mt-20 w-6/12 bottom-0 shadow-lg">
          <div className="bg-brand_primary-100 text-white z-40 w-full h-full shadow-custom_sm">
            <div className="px-4 py-8 bg-brand_primary-50 border border-white rounded-lg mr-2">
              <ul className="flex flex-col mt-5 items-center gap-10">
                <li onClick={Closedropdown}>Home</li>
                <li onClick={Closedropdown}>About</li>
                <li onClick={Closedropdown}>Services</li>
                <li onClick={Closedropdown}>Products</li>
                <li onClick={Closedropdown}>Projects</li>
                <li onClick={Closedropdown}>Contact</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
