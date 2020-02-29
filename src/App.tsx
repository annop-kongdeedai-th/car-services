import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from "./Routes";
import RootStore from "./RootStore";
import { Provider } from "mobx-react";
import { LoadingModal } from "components/common";

const history = createBrowserHistory();

const App = () => {
  return (
    <Provider {...RootStore}>
      <Router history={history}>
        <Routes />
        <LoadingModal />
      </Router>
    </Provider>
  );
};

export default App;
