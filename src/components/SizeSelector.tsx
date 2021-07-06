import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { AppProvider } from '../state/AppProvider';

const data = require('../config/cardData.json');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export const SizeSelector = (props: any) => {
  const classes = useStyles();
  const [state, setState] = React.useState<{ size: string | number; name: string }>({
    size: '',
    name: 'hai',
  });

  const {value, setValue} = props;
  console.log('props', value, setValue);

  const getSelectorId = (selectorValue: string) =>
    data.selector.options.find((o: any) => o.value === selectorValue)?.id;

  const getImageIndex = (selectorValue: string) => 
    data.values.findIndex((v: any) => v.selectorId === getSelectorId(selectorValue));

  const handleChange = (setValue: any) => (event: React.ChangeEvent<{ name?: string; value: unknown }>, props: any) => {
    const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: event.target.value,
    });
    setValue(getImageIndex(event.target.value as any));
  };

  return (
    <AppProvider.Consumer>{(props: any) => (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="size-native-simple">{data?.selector?.label}</InputLabel>
          <Select
            native
            value={state.size}
            onChange={handleChange(props.setValue)}
            inputProps={{
              name: 'size',
              id: 'size-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            {data?.selector?.options?.map((o: any) => <option value={o?.value}>{o?.label}</option>)}
          </Select>
        </FormControl>
      </div>
    )}
    </AppProvider.Consumer>
  );
}
