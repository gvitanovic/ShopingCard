import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ImageGallery, SizeSelector, Button, TheModal } from './components';
import { useEffect, useState } from 'react';
import { AppProvider } from './state/AppProvider';

const data = require('./config/cardData.json');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '80%'
  },
}));

interface configData {
  items: any,
  text: {
    title: string;
    shortDescription: string;
    list: Array<string>;
  }
}

const configDataType = {
  text: {
    title: '',
    shortDescription: '',
    list: []
  }
};

export default function App() {
  const classes = useStyles();
  const [configData, setConfigData] = useState(configDataType);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(-1);
  const isOpenToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setConfigData(data);
  }, []);

  return (
    <AppProvider.Provider value={{ value, setValue }}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ImageGallery />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h4">
                    {configData.text.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {configData.text.shortDescription}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    <SizeSelector />
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <Button
                      title="Buy Now"
                      onSubmit={() => isOpenToggle()}
                    />
                    <TheModal
                      open={isOpen}
                      handleCloseModal={() => setIsOpen(false)}
                    />
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <ul>
                      {configData.text.list.map((l: string, idx: number) => {
                        return idx !== 4 ? <li>{l}</li> : <li><p style={{ paddingLeft: '20px' }}>{l}</p></li>
                      })}
                    </ul>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </AppProvider.Provider>
  );
}
