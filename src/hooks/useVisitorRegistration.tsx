import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "moonlight_visitor_registered";
const SCROLL_THRESHOLD = 0.5; // Show after scrolling 50% of page

export const useVisitorRegistration = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Check if user has already registered
  useEffect(() => {
    const registered = localStorage.getItem(STORAGE_KEY);
    if (registered === "true") {
      setHasRegistered(true);
    }
  }, []);

  // Track scroll to show form after 50% scroll
  useEffect(() => {
    if (hasRegistered || hasTriggered) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      if (scrollPercent >= SCROLL_THRESHOLD && !hasTriggered) {
        setHasTriggered(true);
        // Small delay for better UX
        setTimeout(() => {
          setIsFormOpen(true);
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasRegistered, hasTriggered]);

  const openForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    // Mark as registered so form doesn't appear again this session
    localStorage.setItem(STORAGE_KEY, "true");
    setHasRegistered(true);
  }, []);

  return {
    isFormOpen,
    openForm,
    closeForm,
    hasRegistered,
  };
};
