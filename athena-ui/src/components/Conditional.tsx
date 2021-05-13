import React from "react";
import { CircularProgress, Fade } from "@material-ui/core";

interface Props {
  isLoading: boolean;
}

export const Conditional: React.FC<Props> = (props) => {
  const { isLoading } = props;

  return (
    <div>
      <Fade
        in={isLoading}
        style={{ transitionDelay: isLoading ? "800ms" : "0ms" }}
        unmountOnExit
      >
        <CircularProgress />
      </Fade>
    </div>
  );
};
