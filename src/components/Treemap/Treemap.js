import React from 'react';
import { makeStyles } from '@mui/styles';
import { Checkbox } from '@mui/material';

import UnCheckedIcon from '../../assets/svg/unchecked.svg';
import CheckedIcon from '../../assets/svg/check.svg';
import { theme } from '../../theme';

const styles = (theme) => ({
  container: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    padding: 32,
    width: '100%',
    height: '100%',
  },
  mapDataContainer: {
    ...theme.typography.fontSizes.normalText,
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignEnd,
    padding: 16,
    color: theme.palette.textWhite,
    cursor: theme.content.cursor.pointer,
    fontWeight: theme.typography.fontWeight.bold,
    textTransform: theme.typography.textTransform.uppercase,
    border: `2px solid ${theme.palette.textWhite}`,
    borderRadius: 4,
    position: theme.content.positions.absolute,
  },
  customCheckbox: {
    position: theme.content.positions.absolute,
    top: 8,
    left: 8,
  },
});

const useStyles = makeStyles(styles);

const background = {
  track: theme.palette.bgSuccess,
  over: '#B2BEFF',
  under: theme.palette.bgDanger,
};

const Treemap = (props) => {
  const { data, state, categoryId, height, width, handleMapItemClick } = props;
  const classes = useStyles();

  const viewMapDetails = (state, id) => {
    if (!categoryId) {
      handleMapItemClick(state, id);
    } else {
      handleMapItemClick(state, categoryId, id);
    }
  };

  return (
    <div className={classes.container}>
      <div style={{ height, width, position: 'relative' }}>
        {data?.map((box) => (
          <div
            key={`treemap-${box.data.name}-${box.data.value}`}
            className={classes.mapDataContainer}
            style={{
              height: box.height,
              width: box.width,
              transform: `translate(${box.x}px, ${box.y}px)`,
              background: background[box.data.status],
            }}
            onClick={() => {
              box.data.is_selectable
                ? viewMapDetails(2, box.data.id)
                : viewMapDetails(parseInt(state), box.data.id);
            }}
          >
            {box.data.is_selectable && (
              <Checkbox
                icon={<img src={UnCheckedIcon} alt='unchecked' />}
                checkedIcon={<img src={CheckedIcon} alt='unchecked' />}
                name={box.data.name}
                className={classes.customCheckbox}
                onClick={(event) => event.stopPropagation()}
              />
            )}
            <span>{box?.data.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Treemap;
