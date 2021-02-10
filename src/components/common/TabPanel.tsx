import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import useTheme from '@material-ui/core/styles/useTheme';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { StyledPaper } from 'styles/StyledComponents';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs(props: {
  children: React.ReactNode[];
  tabNames: string[];
  shouldPreventTabChange?: boolean;
  setShouldPreventTabChange?: Function;
}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (props.shouldPreventTabChange && value !== newValue) {
      if (
        window.confirm(
          'Changes you recently made in this tab will be lost! Are you sure?'
        )
      ) {
        setValue(newValue);
        props.setShouldPreventTabChange?.(false);
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <StyledPaper>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {props.tabNames.map((tabName, i) => (
            <Tab key={i} label={tabName} {...a11yProps(i)} />
          ))}
        </Tabs>
      </AppBar>

      {props.children.map((tabContent, i) => (
        <TabPanel key={i} value={value} index={i} dir={theme.direction}>
          {tabContent}
        </TabPanel>
      ))}
    </StyledPaper>
  );
}
