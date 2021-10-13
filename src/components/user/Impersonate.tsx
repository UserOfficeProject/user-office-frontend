import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import { UserContext } from 'context/UserContextProvider';
import { useDataApi } from 'hooks/common/useDataApi';

const useStyles = makeStyles({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

export function Impersonate(props: { id: number }) {
  const api = useDataApi();
  const { handleLogin } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" component="h2" gutterBottom>
        Impersonate
      </Typography>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            api()
              .getTokenForUser({ userId: props.id })
              .then((data) => {
                const { token, rejection } = data.getTokenForUser;
                if (rejection) {
                  enqueueSnackbar(rejection, { variant: 'error' });
                } else {
                  handleLogin(token);
                  history.push('/home');
                }
              })
          }
        >
          Connect as this user...
        </Button>
      </div>
    </React.Fragment>
  );
}
