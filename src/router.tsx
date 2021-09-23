import React from "react";
import { Switch, Route } from "react-router";
import Login from "./views/Login";
import UserCenter from "./views/User";
import Task from "./views/Task";
import AppContainer from "./components/app-container";

const RouterComp = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <AppContainer>
          <>
            <Route path="/task" exact component={Task} />
            <Route path="/" exact component={UserCenter} />
          </>
        </AppContainer>
      </Switch>
    </>
  );
};

export default RouterComp;
