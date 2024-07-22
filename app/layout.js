'use client';

import React, { useState, useEffect } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "@/components/AppAppBar";
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import Preloader from '@/components/Preloader';
import { ThemeProviderComponent } from "@/context/ThemeContext";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const noNavFooter = ['/auth/signup', '/auth/signin'];

  useEffect(() => {
    // Check if the preloader has already been shown
    const hasSeenPreloader = localStorage.getItem('hasSeenPreloader');

    if (!hasSeenPreloader) {
      // Show preloader if not seen before
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('hasSeenPreloader', 'true');
      }, 5000); // Duration of the preloader

      return () => {
        clearTimeout(timer);
      };
    } else {
      // Skip preloader if already seen
      setLoading(false);
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProviderComponent>
            <CssBaseline />
            {loading && <Preloader />}
            {!loading && (
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
