/* eslint-disable @typescript-eslint/no-var-requires */
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MuiLink from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { SettingsContext } from 'context/SettingsContextProvider';
import { UserContext } from 'context/UserContextProvider';
import { SettingsId } from 'generated/sdk';

import AccountActionButton from './AccountActionButton';

const drawerWidth = 250;

type AppToolbarProps = {
  /** Content of the information modal. */
  open: boolean;
  /** Text of the button link in the information modal. */
  handleDrawerOpen: () => void;
  header: string;
};

const AppToolbar: React.FC<AppToolbarProps> = ({
  open,
  handleDrawerOpen,
  header,
}) => {
  const { settings } = useContext(SettingsContext);

  const isTabletOrMobile = useMediaQuery('(max-width: 1224px)');
  const isPortraitMode = useMediaQuery('(orientation: portrait)');

  const logoFilename = settings.get(SettingsId.HEADER_LOGO_FILENAME)
    ?.settingsValue;
  let logo;
  if (logoFilename) {
    logo = require('images/' + logoFilename).default;
  }

  const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: isTabletOrMobile ? 0 : drawerWidth,
      width: isTabletOrMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
      transition: isTabletOrMobile
        ? 'none'
        : theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
    },
    menuButton: {
      marginRight: 15,
    },
    menuButtonHidden: {
      display: isTabletOrMobile ? 'inline-flex' : 'none',
    },
    title: {
      flexGrow: 1,
    },
    profileLink: {
      color: theme.palette.common.white,
      textDecoration: 'none',
      borderBottom: '1px dashed',
      borderBottomColor: theme.palette.common.white,
      padding: '3px',
      '&:hover': {
        textDecoration: 'none',
      },
    },
    horizontalSpacing: {
      marginLeft: 'auto',
      margin: theme.spacing(0, 0.5),
    },
  }));
  const classes = useStyles();
  const { user, roles, currentRole } = useContext(UserContext);
  const settingsContext = useContext(SettingsContext);
  const humanReadableActiveRole = useMemo(
    () =>
      roles.find(({ shortCode }) => shortCode.toUpperCase() === currentRole)
        ?.title ?? 'Unknown',
    [roles, currentRole]
  );
  const externalProfileLink = settingsContext.settings.get(
    SettingsId.PROFILE_PAGE_LINK
  )?.settingsValue;

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          data-cy="open-drawer"
        >
          <MenuIcon />
        </IconButton>
        {(!isTabletOrMobile || !isPortraitMode) && logo && (
          <Link className={'header-logo-container'} to="/">
            <img src={logo} alt="Organisation logo" className={'header-logo'} />
          </Link>
        )}
        {(!isTabletOrMobile || !isPortraitMode) && (
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {'| User Office / ' + header}
          </Typography>
        )}
        <div className={classes.horizontalSpacing}>
          Logged in as{' '}
          {externalProfileLink ? (
            <a
              href={externalProfileLink}
              target="_blank"
              rel="noreferrer"
              className={classes.profileLink}
            >
              {user.email}
            </a>
          ) : (
            <MuiLink
              data-cy="active-user-profile"
              component={Link}
              to={`/ProfilePage/${user.id}`}
              className={classes.profileLink}
            >
              {user.email}
            </MuiLink>
          )}
          {roles.length > 1 && ` (${humanReadableActiveRole})`}
        </div>
        <AccountActionButton />
      </Toolbar>
    </AppBar>
  );
};

AppToolbar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};

export default AppToolbar;
