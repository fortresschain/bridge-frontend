'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { usePage } from './index.hook';
import SelectToken from './partial/SelectToken';
import Connect from './partial/Connect';
import Disconnect from './partial/Disconnect';

const Navbar = () => {
  const {
    open,
    disconnect,
    address,
    selectedNetworkName,
    status,
    tokensChain,
    setSelectedToken,
    selectedToken,
    balanceNative,
  } = usePage();

  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="bg-black flex justify-between items-center h-24 mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">
        <Image
          src="/logodefault.png"
          alt="React Logo"
          width={200}
          height={100}
          className="object-contain"
        />
      </h1>

      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        <SelectToken
          tokensChain={tokensChain}
          balanceNative={balanceNative}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          status={status}
        />
        <Connect
          status={status}
          open={open}
        />
        <Disconnect
          status={status}
          address={address}
          selectedNetworkName={selectedNetworkName}
          disconnect={disconnect}
        />
      </div>

      {/* Mobile Navigation Icon */}
      <div
        onClick={handleNav}
        className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }>
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-white m-4">MENU</h1>

        {/* Mobile Navigation Items */}
        <li className="p-4 border-b rounded-xl text-center duration-300 cursor-pointer">
          <Connect
            status={status}
            open={open}
          />
        </li>
        <li className="p-4 border-b rounded-xl text-center duration-300 cursor-pointer">
          <SelectToken
            tokensChain={tokensChain}
            balanceNative={balanceNative}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            status={status}
          />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
