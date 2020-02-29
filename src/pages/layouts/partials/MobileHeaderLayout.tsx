import { inject, observer } from "mobx-react";
import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IAuthModel } from "modules/auth/AuthModel";
import { Grid } from "components/common";
import { getHeaderTitleLayout } from "utils";
import { GoThreeBars } from "react-icons/go";
import { IAppModel } from "AppModel";
import { StyleSheet } from "constants/interface";

interface IMobileHeaderLayout extends RouteComponentProps<any> {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}

@inject("authStore", "appStore")
@observer
class MobileHeaderLayout extends React.Component<IMobileHeaderLayout> {
  state = { anchorEl: null };
  public render() {
    const { location, appStore } = this.props;
    return (
      <Grid
        container
        direction={"row"}
        justify={"space-between"}
        alignItems={"center"}
        style={styles.container}
      >
        <Grid item width={8} style={styles.headerTitleContainer}>
          <Typography>
            {`${appStore!.headerTitleLayout ||
              getHeaderTitleLayout(location.pathname)}`}
          </Typography>
        </Grid>
        <Grid container item width={4} justify={"flex-end"}>
          {this.renderThreeBars()}
        </Grid>
      </Grid>
    );
  }

  private renderThreeBars = () => {
    const { appStore } = this.props;
    return (
      <IconButton
        onClick={appStore!.toggerDrawer}
        edge="start"
        color="inherit"
        aria-label="open drawer"
      >
        <GoThreeBars
          color={"disabled"}
          size={28}
          style={styles.threeDotBarStyle}
        />
      </IconButton>
    );
  };
}
const styles: StyleSheet = {
  container: {
    height: "100%",
    paddingLeft: 8,
    paddingRight: 8
  },
  headerTitleContainer: {
    //
  },
  threeDotBarStyle: {
    marginLeft: 8
    // color: COLORS.black
    // backgroundColor: 'red'
  }
};
export default withRouter(MobileHeaderLayout);
