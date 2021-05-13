// @ts-nocheck
import React from "react";
import { Home } from "./Home";
import { Box, Container, Typography } from "@material-ui/core";

interface Props {}

export const Welcome: React.FC<Props> = (props) => {
  return (
    <Box my={20}>
      <Typography
        color={"textPrimary"}
        component={"h5"}
        variant={"h2"}
        align={"center"}
      >
        What would you like to do?
      </Typography>
      <Home />
    </Box>
  );
};
