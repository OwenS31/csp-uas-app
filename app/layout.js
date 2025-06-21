import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aplikasi Dashboard',
  description: 'Aplikasi web sederhana dengan fitur sign-in dan dashboard.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="h-full bg-gray-50 dark:bg-gray-900 antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body className={`h-full ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}