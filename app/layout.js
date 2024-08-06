'use client';

import React, { useState, useEffect } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "@/components/AppAppBar";
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import Preloader from '@/components/Preloader';
import { ThemeProviderComponent } from "@/context/ThemeContext";
import '@/style/layout.css'

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const noNavFooter = ['/auth/signup', '/auth/signin', '/highlights', '/profile'];

  useEffect(() => {
    const hasSeenPreloader = localStorage.getItem('hasSeenPreloader');

    if (!hasSeenPreloader) {
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('hasSeenPreloader', 'true');
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <html lang="en">
      <body className='noSelection'>
        <SessionProvider>
          <ThemeProviderComponent>
            <CssBaseline />
            {loading && <Preloader />}
            { (
              <>
                {!noNavFooter.includes(pathname) && <AppAppBar />}
                {children}
                {!noNavFooter.includes(pathname) && <Footer />}
              </>
            )}
          </ThemeProviderComponent>
        </SessionProvider>
      </body>
    </html>
  );
}
