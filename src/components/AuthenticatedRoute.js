import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthenticatedRoute({
  component: Comp,
  appProps,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        appProps.authenticatedUser ? (
          <Comp {...props} {...appProps} />
        ) : (
          <Redirect
            to={`/login?
            redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
}
