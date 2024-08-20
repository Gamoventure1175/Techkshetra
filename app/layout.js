'use client'

import React, { useState, useEffect, useRef } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "@/components/AppAppBar";
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import ScrollLogoAnimation from '@/components/ScrollLogoAnimation';
import { ThemeProviderComponent } from "@/context/ThemeContext";
import '@/style/layout.css';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { initLenis } from '@/libs/lenis';
import Preloader from '@/components/Preloader';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [showScrollAnimation, setShowScrollAnimation] = useState(false);
  const pathname = usePathname();
  const lenisRef = useRef(null);

  const authPathRegex = /^\/auth\/.*/;
  const noNavFooterPaths = ['/highlights', '/profile', '/profile/change-password'];
  const shouldExcludeNavFooter = authPathRegex.test(pathname) || noNavFooterPaths.includes(pathname);

  useEffect(() => {
    // Initialize Lenis
    if (!lenisRef.current) {
      lenisRef.current = initLenis();
    }
  }, []);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
    const isHomePage = pathname === '/';
    let contentLoadTimer;

    if (isHomePage && !hasSeenPreloader) {
      // Show preloader on first visit to the home page
      const timer = setTimeout(() => {
        setLoading(false);
        contentLoadTimer = setTimeout(() => {
          sessionStorage.setItem('hasSeenPreloader', 'true');
        }, 5000);
      }, 5000);

      // Ensure scroll animation does not show on first visit
      setShowScrollAnimation(false);

      return () => {
        clearTimeout(timer); // Clear the initial timer
        clearTimeout(contentLoadTimer); // Clear contentLoadTimer
      };
    } else {
      // Always show preloader on reload, then decide whether to show scroll animation
      const timer = setTimeout(() => {
        setLoading(false);
        setShowScrollAnimation(!hasSeenPreloader);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [pathname]);

  useEffect(() => {
    if (!loading && pathname !== '/') {
      setShowScrollAnimation(true);
    }
  }, [loading, pathname]);

  const handleAnimationComplete = () => {
    setShowScrollAnimation(false);
  };

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="description" content="TechKshetra" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className='noSelection'>
        <SessionProvider>
          <ThemeProviderComponent>
            <CssBaseline />
            <AnimatePresence mode="wait">
              {loading && <Preloader />}
              {!loading && showScrollAnimation && (
                <ScrollLogoAnimation onAnimationComplete={handleAnimationComplete} />
              )}
              {!loading && !showScrollAnimation && (
                <>
                  {!shouldExcludeNavFooter && <AppAppBar />}
                  <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.8 }}
                  >
                    {children}
                  </motion.div>
                  {!shouldExcludeNavFooter && <Footer />}
                </>
              )}
            </AnimatePresence>
          </ThemeProviderComponent>
        </SessionProvider>
      </body>
    </html>
  );
}
