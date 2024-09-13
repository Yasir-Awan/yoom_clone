"use client"; // Ensure this component is a Client Component

import './Navbar.css'; // Assuming you have a CSS file for custom styles

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MobielNav from './MobielNav';
import { SignedIn, UserButton, useClerk } from '@clerk/nextjs';

import logoutSvg from '../public/icons/logout.svg'; // Adjust the path as needed
const Navbar = () => {
  const { signOut } = useClerk(); // Get signOut method from Clerk

  // Function to handle sign-out and clear local storage
  const handleSignOut = async () => {
    // Clear local storage items
    localStorage.removeItem('token');
    localStorage.removeItem('fname');
    localStorage.removeItem('lname');
    localStorage.removeItem('bio_id');
    localStorage.removeItem('site');
    localStorage.removeItem('designation');
    localStorage.removeItem('role');
    localStorage.removeItem('employees');
    localStorage.removeItem('sites');
    localStorage.removeItem('tabNameToIndex');
    localStorage.removeItem('indexToTabName');
    localStorage.removeItem('read_permission');
    localStorage.removeItem('write_permission');
    localStorage.removeItem('edit_permission');
    localStorage.removeItem('approval_permission');
    localStorage.removeItem('delete_permission');

    // Then sign out the user
    await signOut();
  };

  return (
    <nav className='flex flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href="/" className='flex items-center gap-1'>
        <Image
          src="/icons/nha_logo.png"
          width={48}
          height={48}
          alt='Yoom Logo'
          className='max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden ml-3'>NTOC HRIS</p>
      </Link>
      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              {/* Manage Account - This is optional and can be reordered if needed */}
              <UserButton.Action label="manageAccount" />
              {/* You can add additional custom items here if needed */}
              {/* Custom Sign-Out Button */}
              <UserButton.Action
                label="Sign Out"
                onClick={handleSignOut}
                labelIcon={<Image src={logoutSvg} width={24} height={24} alt="Logout Icon" />} // Use the imported SVG
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
        <MobielNav />
      </div>
    </nav>
  );
};

export default Navbar;