"use client"; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/signin');
  }, [router]); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <p className="text-xl text-gray-700 dark:text-gray-200">Mengarahkan ke halaman Sign In...</p>
    </div>
  );
}