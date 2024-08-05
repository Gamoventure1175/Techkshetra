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
  const noNavFooter = ['/auth/signup', '/auth/signin', '/highlights', '/profile'];
  
  useEffect(() => {
    const preloaderTimeout = 4000;
    const lastVisitKey = 'lastVisit';
    const preloaderKey = 'hasSeenPreloader';

    const currentTimestamp = Date.now();
    const lastVisitTimestamp = localStorage.getItem(lastVisitKey);
    const hasSeenPreloader = localStorage.getItem(preloaderKey);

    if (!hasSeenPreloader || !lastVisitTimestamp || currentTimestamp - lastVisitTimestamp > preloaderTimeout * 2) {
      // Show preloader if:
      // - The user hasn't seen the preloader (new session)
      // - It's been a long time since the last visit (e.g., greater than twice the preloader timeout)
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem(preloaderKey, 'true');
        localStorage.setItem(lastVisitKey, currentTimestamp.toString());
      }, preloaderTimeout);

      return () => clearTimeout(timer);
    } else {
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
