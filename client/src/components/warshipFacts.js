import React from 'react'

import warshipInfo from '../Warship_stuff/warship_info.json'
import '../warshipFacts.css'


import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';






const tirpitzB = Object.values(warshipInfo.data[3667867440].name)
const tirpitzBInfo = Object.values(warshipInfo.data[3667867440].description)

const cali = Object.values(warshipInfo.data[3553572848].name)
const caliInfo = Object.values(warshipInfo.data[3553572848].description)

const rossiya = Object.values(warshipInfo.data[3551475152].name)
const rossiyaInfo = Object.values(warshipInfo.data[3551475152].description)

const ragnarok = Object.values(warshipInfo.data[3363780304].name)
const ragnarokInfo = Object.values(warshipInfo.data[3363780304].description)

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function WarshipFacts() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{tirpitzB}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src="https://glossary-wows-global.gcdn.co//icons////vehicle//medium//PGSB598_ec40b715953a361d320fe4061020d038256b639a37f036ab85d5efe807bb8d74.png" alt="Tirpitz B" />
          <Typography>
            {tirpitzBInfo}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>{cali}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src="https://glossary-wows-global.gcdn.co//icons////vehicle//medium//PASB707_5bc1fc222f0c6545ee1d5e31a3a870614b3193d692ab48b7e8bd8227e3e78413.png" alt="California" />
          <Typography>
            {caliInfo}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>{rossiya}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src="https://glossary-wows-global.gcdn.co//icons////vehicle//medium//PRSB709_db6c369f504e8f9f1dbd861b660db330bc14ff06d4f7802506a900e35c54c5b8.png" alt="Sovetskaya Rossiya" />
          <Typography>
            {rossiyaInfo}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>{ragnarok}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src="https://glossary-wows-global.gcdn.co//icons////vehicle//medium//PJSB888_5944761d519f9542edeb625abbeac08614d89cf5d133606b2c8f15cc65f7112e.png" alt="Ragnarok" />
          <Typography>
            {ragnarokInfo}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}


  
