
"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase'; 
import NotificationModal from '@/components/NotificationModal'; 

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Email dan password tidak boleh kosong!');
      setMessageType('error');
      return;
    }

    try {
      
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        
        setMessage(`Kesalahan sign-in: ${error.message}`);
        setMessageType('error');
      } else {
        
        setMessage('Sign-in berhasil!');
        setMessageType('success');
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      }
    } catch (error) {
      
      setMessage(`Terjadi kesalahan: ${error.message}`);
      setMessageType('error');
    }
  };
  
  const handleCloseModal = () => {
    setMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Sign In</h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-white sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
      <NotificationModal message={message} type={messageType} onClose={handleCloseModal} />
    </div>
  );
}
