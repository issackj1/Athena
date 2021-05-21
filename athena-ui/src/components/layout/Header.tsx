// @ts-nocheck
import React from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Link,
  SvgIcon,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
interface Props {
  auth: boolean;
  logout: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { logout, auth } = props;

  const handleLogout = () => {
    logout();
    history.push("/");
  };
  return (
    <div className={classes.root}>
      <AppBar position={"static"}>
        <Toolbar>
          <Container>
            <Grid container direction={"row"} alignItems={"center"}>
              <Typography variant="h6" className={classes.title}>
                <Link underline={"none"} color={"inherit"} href={"/"}>
                  Issack John
                </Link>
              </Typography>
              {auth && (
                <Button
                  color="inherit"
                  startIcon={<SvgIcon component={ExitToApp} />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};
