import { useState, useEffect } from 'react';

const useDeviceDetect = () => {
  const [isMobile, setMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 320px)');
    const handleResize = () => setMobile(mediaQuery.matches);

    mediaQuery.addListener(handleResize);
    return () => mediaQuery.removeListener(handleResize);
  }, []);

  return { isMobile };
}

export default useDeviceDetect;
