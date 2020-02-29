import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { IAuthModel } from "modules/auth/AuthModel";
import { IAppModel } from "AppModel";
import { StyleSheet } from "constants/interface";

interface IHomePage extends RouteComponentProps {
  authStore?: IAuthModel;
  appStore?: IAppModel;
}
@inject("appStore", "authStore")
@observer
class HomePage extends Component<IHomePage> {
  public render() {
    const { authStore, appStore } = this.props;
    return (
      <div style={styles.container}>
        <Typography>{"HomePage"}</Typography>
      </div>
    );
  }
}
const styles: StyleSheet = {
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};
export default HomePage;
