import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        if (window.gtag) {
            window.gtag('event', 'page_view', {
                page_path: location.pathname,
            });
        }
    }, [location]);
};

export default usePageTracking;