import { inject, observer } from "mobx-react";
import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IAuthModel } from "modules/auth/AuthModel";
import { getHeaderTitleLayout } from "utils";
import { IAppModel } from "AppModel";
import { Grid } from "components/common";
import { StyleSheet } from "constants/interface";
import { Typography } from "@material-ui/core";

interface IHeaderLayout extends RouteComponentProps<any> {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}

@inject("authStore", "appStore")
@observer
class HeaderLayout extends React.Component<IHeaderLayout> {
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
        <Grid
          item
          container
          width={12}
          justify={"center"}
          style={styles.headerTitleContainer}
        >
          <Typography>
            {`${appStore!.headerTitleLayout ||
              getHeaderTitleLayout(location.pathname)}`}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

const styles: StyleSheet = {
  container: {
    height: "100%",
    paddingRight: "4em"
  },
  headerTitleContainer: {
    textAlign: "center",
    fontWeight: "bold"
  }
};
export default withRouter(HeaderLayout);
