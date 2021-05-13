import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from "./components/Auth";
import { PrivateRoute } from "./components/PrivateRoute";
import { TableDetail } from "./components/TableDetail";
import { Endpoint } from "./components/Endpoint";
import { Welcome } from "./components/Welcome";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { AthenaNavBar } from "./components/AthenaNavBar";
import { Copyright } from "./components/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <Container className={classes.paper}>
      <Grid>
        <Router basename={process.env.PUBLIC_URL}>
          <Grid item>
            <AthenaNavBar />
          </Grid>
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
      </Grid>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
