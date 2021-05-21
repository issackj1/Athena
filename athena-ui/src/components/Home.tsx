// @ts-nocheck
import React from "react";
import { AthenaCard } from "./AthenaCard";
import { Grid } from "@material-ui/core";

interface Props {}

export const Home: React.FC<Props> = (props) => {
  return (
    <Grid container direction={"row"} spacing={3}>
      <Grid item xs={12} sm={6}>
        <AthenaCard
          title={"See all tables"}
          description={
            "Complete inventory of data tables available through this Statistics Canada API"
          }
          to={"/athena/seeAll"}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AthenaCard
          title={"Meta data table search"}
          description={
            "Retrieve the metadata supporting the data at table level"
          }
          to={"/athena/searchAll"}
        />
      </Grid>
    </Grid>
  );
};
