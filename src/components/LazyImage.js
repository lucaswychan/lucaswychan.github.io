import React, { useState, useEffect } from 'react';

/**
 * LazyImage component for optimized image loading
 * - Uses Intersection Observer for lazy loading
 * - Provides proper loading states and error handling
 * - Implements blur-up technique for progressive loading
 */
const LazyImage = ({ src, alt, className, width, height, placeholderColor = "#e0e0e0" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Skip if already loaded or has error
    if (isLoaded || error) return;
    
    // Create intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading when within 200px of viewport
    );

    // Get current element to observe
    const element = document.getElementById(`lazy-image-${src.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (element) {
      observer.observe(element);
    }

    // Cleanup
    return () => observer.disconnect();
  }, [src, isLoaded, error]);

  // Handle image load success
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle image load error
  const handleError = () => {
    setError(true);
    setIsLoaded(true); // Consider it "loaded" to stop attempts
  };

  return (
    <div 
      id={`lazy-image-${src.replace(/[^a-zA-Z0-9]/g, '')}`}
      className={`lazy-image-container ${className || ''}`}
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: placeholderColor,
        width: width || '100%',
        height: height || 'auto',
      }}
      aria-busy={!isLoaded}
    >
      {/* Show a loading placeholder */}
      {!isLoaded && !error && (
        <div 
          className="lazy-image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div 
            className="spinner"
            style={{
              width: '30px',
              height: '30px',
              border: '3px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '50%',
              borderTop: '3px solid #767676',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      )}

      {/* Show error state if image failed to load */}
      {error && (
        <div
          className="lazy-image-error"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8d7da',
            color: '#721c24',
          }}
        >
          Failed to load image
        </div>
      )}

      {/* Only render actual image if in viewport */}
      {isInView && (
        <img
          src={src}
          alt={alt || ''}
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            display: isLoaded && !error ? 'block' : 'none',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease',
            opacity: isLoaded ? 1 : 0,
          }}
          loading="lazy"
          width={width}
          height={height}
        />
      )}

      <style jsx="true">{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LazyImage; 