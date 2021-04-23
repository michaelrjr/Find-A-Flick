import React from "react";
import { useAuth } from "../context/Context";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { isLoading, currentUser } = useAuth();
  const { component: Component, ...rest } = props;

  if (isLoading) {
    return (
      <div className="container-fluid">
        <div className="d-flex">
          <strong className="mr-3">
            <h3>Loading..</h3>
          </strong>
          <div className="spinner-border" role="status" aria-hidden="true"></div>
        </div>
      </div>
    );
  }

  if (currentUser) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  return <Redirect to="/sign-in" />;
}
