import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from "./components/Auth";
import { PrivateRoute } from "./components/PrivateRoute";
import { TableDetail } from "./components/TableDetail";
import { Endpoint } from "./components/Endpoint";
import { Welcome } from "./components/Welcome";
import { Box } from "@material-ui/core";
import { AthenaNavBar } from "./components/AthenaNavBar";
import { Copyright } from "./components/Copyright";

export default function App() {
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <AthenaNavBar />
        <Switch>
          <Route path={"/auth"} component={Auth} />
          <PrivateRoute
            path={"/:name/detail/:productId"}
            component={TableDetail}
          />
          <PrivateRoute path={"/athena/:name"} component={Endpoint} />
          <PrivateRoute path={"/"} component={Welcome} />
        </Switch>
      </Router>
      <Box mt={8}>
        <Copyright />
      </Box>
    </>
  );
}
