import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "../containers/Home";
import LogIn from "../containers/LogIn";
import Register from "../containers/Register";
import Test from "../containers/Test";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LogIn} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/signup" component={Register} />
      <Route component={Test} />
    </Switch>
  </BrowserRouter>
);

export default App;
