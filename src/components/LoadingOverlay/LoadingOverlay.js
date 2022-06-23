import LoadingOverlay from 'react-loading-overlay';
import React from 'react';

const LoadingOverlayWrapper = ({
  loader,
  color,
  text,
  position = 'fixed',
  height = '100vh',
  minHeight,
  maxHeight,
  background = '#fff',
}) => {
  return (
    <LoadingOverlay
      active={loader}
      spinner
      text={text || 'Loading...'}
      styles={{
        overlay: (base) => ({
          ...base,
          background,
          color: 'black',
          zIndex: 3,
          borderRadius: '0px',
          width: '100%',
          height: !minHeight && !maxHeight && height,
          minHeight,
          maxHeight,
          position: position,
        }),
        spinner: (base) => ({
          ...base,
          width: '50px',
          '& svg circle': {
            stroke: color ? color : '#44677b',
          },
          zIndex: 999,
        }),
        content: (base) => ({
          ...base,
          color: color ? color : '#44677b',
        }),
      }}
    />
  );
};

export default LoadingOverlayWrapper;
