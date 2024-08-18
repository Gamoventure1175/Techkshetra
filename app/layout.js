'use client';

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
import { useMediaQuery, useTheme } from '@mui/material';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [showScrollAnimation, setShowScrollAnimation] = useState(false);
  const [hasVisitedHomePage, setHasVisitedHomePage] = useState(false);
  const pathname = usePathname();
  const lenisRef = useRef(null);

  // Get the theme object
  const theme = useTheme();
  // Check if the screen size is larger than 'lg' breakpoint
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const authPathRegex = /^\/auth\/.*/;
  const noNavFooterPaths = ['/highlights', '/profile', '/profile/change-password'];
  const shouldExcludeNavFooter = authPathRegex.test(pathname) || noNavFooterPaths.includes(pathname);

  useEffect(() => {
    if (isDesktop) {
      // Initialize Lenis only if screen size is larger than 'lg'
      if (!lenisRef.current) {
        lenisRef.current = initLenis();
      }
    } else {
      // Clean up Lenis if screen size is smaller than 'lg'
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    }
  }, [isDesktop]);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
    const isHomePage = pathname === '/';

    if (isHomePage && !hasSeenPreloader) {
      // Show preloader on first visit to the home page
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasSeenPreloader', 'true');
        setHasVisitedHomePage(true); // Mark that the home page has been visited
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      // For subsequent visits or other pages
      setLoading(false);
      setShowScrollAnimation(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (!loading && pathname !== '/') {
      // Show scroll animation when navigating to other pages
      setShowScrollAnimation(true);
    }
  }, [loading, pathname]);

  const handleAnimationComplete = () => {
    setShowScrollAnimation(false); // Reset flag after animation completes
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
