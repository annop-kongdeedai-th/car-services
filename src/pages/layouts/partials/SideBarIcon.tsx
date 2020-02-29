import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { COLORS } from "../../../constants";
import { inject } from "mobx-react";
import { IAppModel } from "AppModel";
import { StyleSheet } from "constants/interface";

interface ISideBarIcon extends RouteComponentProps<any> {
  icon: any;
  to: string;
  onClick?: () => void;
  appStore?: IAppModel;
}

@inject("appStore")
class SideBarIcon extends React.Component<ISideBarIcon> {
  public render() {
    const { to, icon, onClick, appStore } = this.props;
    const { pathname } = this.props.location;
    const active = pathname.includes(to);
    return (
      <Link to={to} onClick={onClick} style={styles.containerStyle}>
        <Button
          onClick={appStore!.toggerDrawer}
          style={{
            ...styles.buttonStyle,
            borderLeft: active ? `3px solid ${COLORS.black}` : "none"
          }}
        >
          <div
            style={{
              ...styles.iconAndTextStyle,
              color: active ? COLORS.black : COLORS.lightGrey
            }}
          >
            {icon}
          </div>
        </Button>
      </Link>
    );
  }
}

const styles: StyleSheet = {
  containerStyle: { paddingLeft: 3, width: "100%" },
  buttonStyle: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingTop: 28,
    paddingBottom: 28,
    width: "100%"
  },
  iconAndTextStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
};
export default withRouter(SideBarIcon);
