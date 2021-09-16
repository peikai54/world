import React from "react";
import { Switch, Route } from "react-router";
import Login from "./views/Login";
import UserCenter from "./views/User";

const RouterComp = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={UserCenter} />
      </Switch>
    </>
  );
};

export default RouterComp;
