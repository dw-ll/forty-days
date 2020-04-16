import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import SignUp from "./containers/Signup";
import Confirm from "./containers/Confirm";
import CreateNote from "./containers/CreateNote";
import NoteEdit from "./containers/NoteEdit";
import Unknown from "./containers/Unknown";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute
        path="/login"
        exact
        component={Login}
        appProps={appProps}
      />
      <UnauthenticatedRoute
        path="/signup"
        exact
        component={SignUp}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/notes/new"
        exact
        component={CreateNote}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/notes/:id"
        exact
        component={NoteEdit}
        appProps={appProps}
      />
      <Route exact component={Unknown} />
    </Switch>
  );
}
