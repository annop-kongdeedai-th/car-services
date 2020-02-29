import { inject, observer } from "mobx-react";
import React, { Suspense } from "react";
import { IAppModel } from "../../AppModel";
import HeaderLayout from "./partials/HeaderLayout";
import MobileHeaderLayout from "./partials/MobileHeaderLayout";
import { COLORS, SCREEN } from "constants/index";
import { LinearProgress } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { RouteComponentProps, withRouter } from "react-router";
import { StyleSheet } from "constants/interface";

interface IPageLayout extends RouteComponentProps<any> {
  width: Breakpoint;
  children?: any;
  appStore?: IAppModel;
}

@inject("appStore")
@observer
class PageLayout extends React.Component<IPageLayout> {
  public render() {
    const { width } = this.props;
    return (
      <React.Fragment>
        {width === "xs" ? (
          <div style={styles.topMobile}>
            <MobileHeaderLayout />
          </div>
        ) : (
          <div style={styles.top}>
            <HeaderLayout />
          </div>
        )}

        <div style={styles.content}>
          <Suspense fallback={<LinearProgress />}>
            <div style={styles.children}>{this.props.children}</div>
          </Suspense>
        </div>
      </React.Fragment>
    );
  }
}
const styles: StyleSheet = {
  top: {
    position: "fixed",
    top: 0,
    left: SCREEN.sideBarWidth,
    height: SCREEN.topBarHeight,
    width: "100%",
    zIndex: 1000,
    backgroundColor: COLORS.white,
    // '-webkitBoxShadow': '0px 13px 17px -7px rgba(181,179,181,0.1)',
    // '-mozBoxShadow': '0px 13px 17px -7px rgba(181,179,181,0.1)',
    boxShadow: "0px 13px 17px -7px rgba(181,179,181,0.1)"
  },
  topMobile: {
    position: "fixed",
    top: 0,
    height: SCREEN.topBarHeight,
    width: "100%",
    zIndex: 1000,
    backgroundColor: COLORS.white,
    // '-webkitBoxShadow': '0px 13px 17px -7px rgba(181,179,181,0.1)',
    // '-mozBoxShadow': '0px 13px 17px -7px rgba(181,179,181,0.1)',
    boxShadow: "0px 13px 17px -7px rgba(181,179,181,0.1)"
  },
  content: {
    marginTop: SCREEN.topBarHeight,
    height: "auto",
    width: "100%",
    backgroundColor: COLORS.transparent
  },
  children: {
    // padding: 28
  }
};
export default withRouter(PageLayout);
