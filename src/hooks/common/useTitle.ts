import { useEffect } from 'react';

/** Hook for changing title */
export function useTitle(title: string, header: string) {
  useEffect(() => {
    const oldTitle = document.title;
    title && (document.title = title);
    // following line is optional, but will reset title when component unmounts
  }, [title, header]);
}
