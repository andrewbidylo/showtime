import React,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import CameraIcon from '@material-ui/icons/Camera';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import Movies from '../Movies/index';

const addStyles = withStyles(styles, { withTheme: true })

const TabContainer = ({ children, dir }) => (
  <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
    {children}
  </Typography>
);

const SimpleTabs = ({classes,theme, parsedMovies}) => {
 const[picked, setPicked]=useState(0)

  const handleChange = (event, picked) => { setPicked(picked); };
  const handleChangeIndex = index => { setPicked({ value: index }); };

  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs variant='fullWidth' value={picked} onChange={handleChange}>
            <Tab label="Movies" icon={<CameraIcon />} />
            <Tab label="Directors" icon={<MovieCreationIcon />} />
          </Tabs>
        </AppBar>
        <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={picked} onChangeIndex={handleChangeIndex} >
          <TabContainer dir={theme.direction}><Movies parsedMovies={parsedMovies}/></TabContainer>
          <TabContainer dir={theme.direction}></TabContainer>
        </SwipeableViews>
      </div>
    );
  }


export default addStyles(SimpleTabs);
