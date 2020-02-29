import React from "react";
import { Typography, List, ListItem } from "@material-ui/core";
import SideBarIcon from "./partials/SideBarIcon";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { IAuthModel } from "modules/auth/AuthModel";
import { IAppModel } from "AppModel";
import { FaHome } from "react-icons/fa";
import { StyleSheet } from "constants/interface";

interface ISideBar extends RouteComponentProps<any> {
  mobileMode?: boolean;
  appStore?: IAppModel;
  authStore?: IAuthModel;
}

@inject("authStore", "appStore")
@observer
class SideBar extends React.Component<ISideBar, any> {
  public render() {
    const { location } = this.props;
    return (
      <List aria-label="mailbox folders" style={styles.listContainerStyle}>
        <List style={styles.listIconContainerStyle}>
          <ListItem style={styles.listItemStyle}>
            <SideBarIcon
              to={"/home"}
              icon={
                <React.Fragment>
                  <FaHome size={20} />
                  {this.renderIconLabelText("หน้าหลัก")}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </List>
    );
  }

  private renderIconLabelText = (label: string) => {
    const { mobileMode } = this.props;
    if (mobileMode) {
      return <Typography style={styles.textStyle}>{label}</Typography>;
    } else {
      return null;
    }
  };
}

const styles: StyleSheet = {
  listContainerStyle: { height: "100%" },
  listIconContainerStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  listItemStyle: {
    justifyContent: "center",
    paddingLeft: 0,
    paddingRight: 0
  },
  textStyle: {
    marginLeft: 8
  }
};
export default withRouter(SideBar);
