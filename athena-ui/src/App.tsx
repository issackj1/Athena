import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from "./components/Auth";
import { PrivateRoute } from "./components/PrivateRoute";
import { TableDetail } from "./components/TableDetail";
import { Endpoint } from "./components/Endpoint";
import { Welcome } from "./components/Welcome";
import { Box } from "@material-ui/core";
import { NavBar } from "./components/NavBar";
import { Copyright } from "./components/Copyright";
import axios from "axios";

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const confirmLoggedIn = async () => {
      const res = await axios.post(
        "/api/confirm-token",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("my-jwt"),
          },
        }
      );

      if (res.status === 200) setAuth(true);
    };

    confirmLoggedIn();
  }, [auth]);

  const logout = () => {
    localStorage.removeItem("my-jwt");
    setAuth(false);
  };

  const login = () => {
    setAuth(true);
  };

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <NavBar auth={auth} logout={logout} />
        <Switch>
          <Route
            path={"/auth"}
            render={(props: any) => (
              <Auth {...props} auth={auth} login={login} />
            )}
          />
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
