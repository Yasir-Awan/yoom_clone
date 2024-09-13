'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

function UserStorage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.primaryEmailAddress) {
        const email = user.primaryEmailAddress.emailAddress;
        const loginFormData = { username: email };

        try {
          const response = await fetch('https://ettm.nha.gov.pk/hris_cn/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginFormData),
          });

          if (!response.ok) throw new Error('Login failed');
          const data = await response.json();

          // Initialize localStorage items
          localStorage.setItem('token', data.access_token || '');
          localStorage.setItem('fname', data.fname || '');
          localStorage.setItem('lname', data.lname || '');
          localStorage.setItem('bio_id', data.user_id || '');
          localStorage.setItem('site', data.site || '');
          localStorage.setItem('designation', data.designation || '');
          localStorage.setItem('role', data.role || '');
          localStorage.setItem('employees', data.employees || '');
          localStorage.setItem('sites', data.sites || '');
          localStorage.setItem('tabNameToIndex', JSON.stringify(data.tabNameToIndex || {}));
          localStorage.setItem('indexToTabName', JSON.stringify(data.indexToTabName || {}));
          localStorage.setItem('read_permission', data.permissions?.read || '');
          localStorage.setItem('write_permission', data.permissions?.write || '');
          localStorage.setItem('edit_permission', data.permissions?.edit || '');
          localStorage.setItem('approval_permission', data.permissions?.approval || '');
          localStorage.setItem('delete_permission', data.permissions?.delete || '');


          // Redirect to home after setting localStorage
          // router.push('/home');
        } catch (error) {
          console.error('Login failed. Please try again.', error);
        }
      }
    };

    fetchData();

  }, [user, router]);

  return null;
}

export default UserStorage;
