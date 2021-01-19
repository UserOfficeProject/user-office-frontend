import {
  Checkbox,
  MenuItem,
  MenuItemProps,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import React from 'react';

const styles = () => ({
  container: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
});

class MultiMenuItem extends React.Component<
  MenuItemProps & WithStyles<typeof styles>
> {
  render() {
    const { classes, ...rest } = this.props;

    return (
      <MenuItem {...rest} button={false}>
        <div className={classes.container}>
          <Checkbox checked={this.props.selected} />
          <div>{this.props.children}</div>
        </div>
      </MenuItem>
    );
  }
}

export default withStyles(styles)(MultiMenuItem);
