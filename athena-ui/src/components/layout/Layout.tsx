import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Grid } from "@material-ui/core";

interface Props {
  auth: boolean;
  logout: () => void;
  children: any;
}

export const Layout: React.FC<Props> = ({ auth, logout, children }) => {
  return (
    <Grid container direction={"column"} justify={"space-between"}>
      <Grid item>
        <Header auth={auth} logout={logout} />
      </Grid>
      <Grid item>{children}</Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};
