import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from "./components/Auth";
import { PrivateRoute } from "./components/PrivateRoute";
import { TableDetail } from "./components/TableDetail";
import { Endpoint } from "./components/Endpoint";
import { Welcome } from "./components/Welcome";
import axios from "axios";
import { Layout } from "./components/layout/Layout";
import { Container, Grid } from "@material-ui/core";

export default function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const confirmLoggedIn = async () => {
      const { status } = await axios.post(
        "/api/confirm-token",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("my-jwt"),
          },
        }
      );
      setAuth(status === 200);
    };

    confirmLoggedIn().catch((err) => err);
    setLoading(false);
  }, [auth]);

  const logout = () => {
    localStorage.removeItem("my-jwt");
    setAuth(false);
  };

  const login = () => {
    setAuth(true);
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <Layout auth={auth} logout={logout}>
      <Container>
        <Router basename={process.env.PUBLIC_URL}>
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
              auth={auth}
            />
            <PrivateRoute
              path={"/athena/:name"}
              component={Endpoint}
              auth={auth}
            />
            <PrivateRoute path={"/"} component={Welcome} auth={auth} />
          </Switch>
        </Router>
      </Container>
    </Layout>
  );
}
