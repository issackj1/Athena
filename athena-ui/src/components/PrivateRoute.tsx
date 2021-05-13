// @ts-nocheck
import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!localStorage.getItem("my-jwt")) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/auth", state: { from: props.location } }}
          />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);
