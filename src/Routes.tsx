import React, { lazy } from "react";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";
import MainLayout from "pages/layouts/MainLayout";
import { inject, observer } from "mobx-react";

const HomePage = lazy(() => import("./pages/HomePage"));
const ServiceHistoryPage = lazy(() => import("./pages/ServiceHistoryPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));

@inject("authStore")
@observer
class Routes extends React.Component<any> {
  public render() {
    return (
      <Switch>
        <MainLayout>
          <Switch>
            <Route exact path="/home" component={HomePage} />
            <Route
              exact
              path="/service-history"
              component={ServiceHistoryPage}
            />
            <Route
              exact
              path="/service-history/:id"
              component={ServiceDetailPage}
            />
            <Redirect to="/home" />
          </Switch>
        </MainLayout>
      </Switch>
    );
  }
}

export default withRouter(Routes);
