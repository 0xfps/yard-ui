import { useState, useEffect } from 'react';

// For review.
export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function getWindowDimensions() {
            if (typeof window !== undefined) {
                const { innerWidth: width, innerHeight: height } = window;
                return {
                    width,
                    height
                };
            }
        }

        function handleResize() {
            setWindowDimensions(getWindowDimensions() ?? { width: 0, height: 0 });
        }

        setWindowDimensions(getWindowDimensions() ?? { width: 0, height: 0 });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}