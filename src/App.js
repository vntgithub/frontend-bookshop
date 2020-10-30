import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./pages/login.page";
import HomePgae from "./pages/home.page";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePgae} />
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
