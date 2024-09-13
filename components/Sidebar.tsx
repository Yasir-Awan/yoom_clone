'use client';
import React, { useEffect, useState } from 'react';
import { mergedSidebarLinks as staticMergedSidebarLinks, getMergedSidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  // Initially set the sidebar links to static links for immediate display
  const [sidebarLinks, setSidebarLinks] = useState(staticMergedSidebarLinks);
  const pathname = usePathname();

  // Function to update sidebar links with dynamic links
  const updateSidebarLinks = () => {
    const newLinks = getMergedSidebarLinks(); // Regenerate the links
    setSidebarLinks((prevLinks) => {
      // Only update if there are changes to avoid unnecessary state updates
      if (JSON.stringify(prevLinks) !== JSON.stringify(newLinks)) {
        return newLinks;
      }
      return prevLinks;
    });
  };

  useEffect(() => {
    // Call the update function to get dynamic links when the component mounts
    updateSidebarLinks();

    // Add event listener to detect storage changes across tabs
    const handleStorageChange = () => {
      updateSidebarLinks();
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Detect local storage changes (like login) in the same tab and update sidebar
    const checkLoginStatusAndUpdateSidebar = () => {
      const token = localStorage.getItem('token');
      if (token) {
        updateSidebarLinks(); // Update the sidebar after login
      }
    };

    checkLoginStatusAndUpdateSidebar();

    // Use a throttled interval to avoid frequent calls
    const interval = setInterval(() => {
      checkLoginStatusAndUpdateSidebar();
    }, 2000); // Increased the interval to 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className='sticky left-0 top-0 flex w-[264px] flex-col justify-between bg-dark-1 p-6 pt-28 text-white min-h-screen max-h-screen'>
      <div className='sidebar-content flex-1 overflow-y-auto'>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                'bg-blue-1': isActive, // Active background
                'bg-dark-1': !isActive, // Default background for non-active links
              })}
            >
              <Image src={link.imgUrl} alt={link.label} height={24} width={24} />
              <p className='text-lg font-semibold'>{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
