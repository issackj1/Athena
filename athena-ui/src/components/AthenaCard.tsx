// @ts-nocheck
import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  to: string;
}

const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
  },
});

export const AthenaCard: React.FC<Props> = (props: Props) => {
  const { title, description, to } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        style={{ textDecoration: "none" }}
        component={Link}
        to={to}
      >
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
