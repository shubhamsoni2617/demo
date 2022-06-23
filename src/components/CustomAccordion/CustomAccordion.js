import React from 'react';
import { makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const styles = (theme) => ({
  accordionSummaryRoot: {
    minHeight: '48px !important',
    cursor: 'unset !important',
  },
  accordionSummaryContent: {
    margin: '12px 0 !important',
  },
  accordionDetails: {
    borderTop: `0.2px solid ${theme.palette.stroke}`,
  },
});

const useStyles = makeStyles(styles);

const CustomAccordion = (props) => {
  const { summary, details, expanded } = props;
  const classes = useStyles();

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        classes={{
          root: classes.accordionSummaryRoot,
          content: classes.accordionSummaryContent,
        }}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails classes={{ root: classes.accordionDetails }}>
        {details}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
