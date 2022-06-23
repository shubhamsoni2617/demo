import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';

const CustomCard = (props) => {
  const { children, cardStyles, fullWidth, fullHeight } = props;

  return (
    <div
      style={
        fullWidth && !fullHeight
          ? { width: '100%' }
          : fullHeight && !fullWidth
          ? { height: '100%' }
          : fullHeight && fullWidth
          ? { width: '100%', height: '100%' }
          : null
      }
    >
      <Card classes={{ root: cardStyles }}>{children}</Card>
    </div>
  );
};

CustomCard.propTypes = {
  children: PropTypes.node,
  cardStyles: PropTypes.string,
};

export default CustomCard;
