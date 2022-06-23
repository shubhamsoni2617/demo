import React from 'react';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const styles = () => ({
  img: {
    objectPosition: 'top',
  },
});

const useStyles = makeStyles(styles);

// const stringToColor = (string) => {
//   let hash = 0;
//   let i;

//   /* eslint-disable no-bitwise */
//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash);
//   }

//   let color = '#';

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff;
//     color += `00${value.toString(16)}`.substr(-2);
//   }
//   /* eslint-enable no-bitwise */

//   return color;
// };

const stringAvatar = (name) => {
  const nameWords = name.split(' ');
  return {
    sx: {
      bgcolor: '#bdbdbd',
    },
    children: `${nameWords && nameWords[0] ? nameWords[0][0] : ''}${
      nameWords && nameWords[1] ? nameWords[1][0] : ''
    }`,
  };
};

const ProfileAvatar = (props) => {
  const { src, name, height, width } = props;
  const classes = useStyles();

  return (
    <div>
      {src && src !== '' ? (
        <Avatar
          src={src}
          style={{ height, width }}
          classes={{ img: classes.img }}
        />
      ) : (
        <Avatar {...stringAvatar(name)} style={{ height, width }} />
      )}
    </div>
  );
};

ProfileAvatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default ProfileAvatar;
