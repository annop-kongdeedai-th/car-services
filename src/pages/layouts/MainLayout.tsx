import { inject, observer } from "mobx-react";
import React from "react";
import { IAppModel } from "../../AppModel";
import PageLayout from "./PageLayout";
import SideBar from "./SideBar";
import { Hidden, SwipeableDrawer } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { IAuthModel } from "modules/auth/AuthModel";
import { StyleSheet } from "constants/interface";
import { COLORS, SCREEN } from "constants/index";

interface IMainLayout {
  width?: Breakpoint;
  location?: any;
  children: any;
  appStore?: IAppModel;
  authStore?: IAuthModel;
}

@inject("appStore", "authStore")
@observer
class MainLayout extends React.Component<IMainLayout, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { width, appStore } = this.props;
    return (
      <div style={styles.pageWrapper}>
        {/* Website / Tablet mode */}
        <Hidden xsDown>
          <div style={styles.left}>
            <SideBar />
          </div>
        </Hidden>
        {/* Mobile mode */}
        <Hidden only={["xl", "sm", "md", "lg"]}>
          <SwipeableDrawer
            onClose={appStore!.toggerDrawer}
            onOpen={appStore!.toggerDrawer}
            open={appStore!.isOpenDrawer}
            disableSwipeToOpen
          >
            <div style={styles.mobileLeft}>
              <SideBar mobileMode />
            </div>
          </SwipeableDrawer>
        </Hidden>

        <div
          style={{
            ...styles.right,
            paddingLeft: width === "xs" ? 0 : SCREEN.sideBarWidth
          }}
        >
          <PageLayout width={width!}>{this.props.children}</PageLayout>
        </div>
      </div>
    );
  }
}
const styles: StyleSheet = {
  pageWrapper: {
    overflow: "hidden",
    height: "100%",
    margin: 0,
    padding: 0
  },
  left: {
    position: "fixed",
    top: 0,
    width: SCREEN.sideBarWidth,
    height: "100vh",
    backgroundColor: COLORS.white,
    textAlign: "center",
    paddingTop: 14,
    borderRight: `1px ${COLORS.lightGreyShade2} solid`
  },
  mobileLeft: {
    top: 0,
    width: SCREEN.sideBarMobileWidth,
    height: "100vh",
    backgroundColor: COLORS.white,
    textAlign: "center",
    paddingTop: 14,
    borderRight: `1px ${COLORS.lightGreyShade2} solid`,
    overflowY: "auto"
  },
  right: {
    height: "100%"
  },
  top: {
    position: "fixed",
    top: 0,
    left: 250,
    right: 0,
    height: 54,
    zIndex: 1000,
    background: "#ff0",
    border: "2px solid red"
  }
};

export default withWidth()(MainLayout);
