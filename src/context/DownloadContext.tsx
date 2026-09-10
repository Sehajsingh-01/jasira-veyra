'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface DownloadNotificationDetails {
  filename?: string;
  title?: string;
  message?: string;
  format?: string;
}

interface DownloadContextType {
  isOpen: boolean;
  details: DownloadNotificationDetails;
  notifyDownload: (details?: DownloadNotificationDetails) => void;
  closeNotification: () => void;
}

const defaultDetails: DownloadNotificationDetails = {
  filename: 'Jas_of_Duskbloom_FULL.pdf',
  title: 'Oh, Thank You for Downloading!',
  message: 'The Duskbloom Manuscript is now yours. May Jasira’s quiet memories and blooming petals guide your path.',
  format: 'PDF',
};

const DownloadContext = createContext<DownloadContextType>({
  isOpen: false,
  details: defaultDetails,
  notifyDownload: () => {},
  closeNotification: () => {},
});

export function DownloadProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<DownloadNotificationDetails>(defaultDetails);

  const notifyDownload = useCallback((customDetails?: DownloadNotificationDetails) => {
    setDetails({
      filename: customDetails?.filename || defaultDetails.filename,
      title: customDetails?.title || defaultDetails.title,
      message: customDetails?.message || defaultDetails.message,
      format: customDetails?.format || defaultDetails.format,
    });
    setIsOpen(true);
  }, []);

  const closeNotification = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Listen for global window custom events so direct vanilla JS triggers also work seamlessly
  useEffect(() => {
    const handleGlobalDownloadEvent = (e: Event) => {
      const customEvent = e as CustomEvent<DownloadNotificationDetails>;
      notifyDownload(customEvent.detail);
    };

    window.addEventListener('magic-download-trigger', handleGlobalDownloadEvent);
    return () => {
      window.removeEventListener('magic-download-trigger', handleGlobalDownloadEvent);
    };
  }, [notifyDownload]);

  return (
    <DownloadContext.Provider
      value={{
        isOpen,
        details,
        notifyDownload,
        closeNotification,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownloadNotification() {
  return useContext(DownloadContext);
}

/**
 * Global helper to trigger the magical download notification from anywhere,
 * including non-React utility modules.
 */
export function triggerGlobalDownloadNotification(details?: DownloadNotificationDetails) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('magic-download-trigger', {
        detail: details || defaultDetails,
      })
    );
  }
}
