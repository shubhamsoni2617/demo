import React from 'react';

const CustomImage = (props) => {
  return (
    <div style={{ height: 80 }}>
      <img
        style={{
          objectFit: 'contain',
          width: 80,
        }}
        src={props.value}
        alt={props.value}
      />
    </div>
  );
};

export default CustomImage;
