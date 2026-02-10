"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { COOKIE_CONSENT_KEY } from "@/types/correlation";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent !== "true") {
      queueMicrotask(() => setIsVisible(true));
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary text-secondary-foreground p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-3 sm:mb-0">
          <Cookie className="h-6 w-6 mr-3 text-primary" />
          <p className="text-sm">
            This website uses browser `localStorage` to save your study progress
            and preferences. This is essential for the study to function
            correctly. By continuing to use this site, you consent to this use.
            Please see our Research Study Notice on the introduction page for
            more details on data handling.
          </p>
        </div>
        <Button
          onClick={handleAccept}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Accept & Close
        </Button>
      </div>
    </div>
  );
}
