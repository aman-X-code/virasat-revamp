'use client';

import { useCallback } from 'react';

interface ErrorHandlerOptions {
  onError?: (error: Error, context?: string) => void;
  logError?: boolean;
}

export function useErrorHandler(options: ErrorHandlerOptions = {}) {
  const { onError, logError = true } = options;

  const handleError = useCallback((error: Error, context?: string) => {
    if (logError && process.env.NODE_ENV === 'development') {
      console.error(`Error in ${context || 'unknown context'}:`, error);
    }

    if (onError) {
      onError(error, context);
    }

    // In production, you might want to send this to an error reporting service
    // Example: Sentry.captureException(error, { tags: { context } });
  }, [onError, logError]);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error instanceof Error ? error : new Error(String(error)), context);
      return null;
    }
  }, [handleError]);

  return {
    handleError,
    handleAsyncError,
  };
}

export default useErrorHandler;
