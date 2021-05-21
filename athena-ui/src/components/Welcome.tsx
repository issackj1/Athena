import React from "react";
import { Home } from "./Home";
import { Grid, Typography } from "@material-ui/core";

interface Props {}

export const Welcome: React.FC<Props> = () => {
  return (
    <Grid
      container
      direction={"column"}
      justify={"space-around"}
      alignItems={"center"}
    >
      <Grid item>
        <Typography
          color={"textPrimary"}
          component={"h5"}
          variant={"h2"}
          align={"center"}
        >
          What would you like to do?
        </Typography>
      </Grid>
      <Grid item>
        <Home />
      </Grid>
    </Grid>
  );
};
