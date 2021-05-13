import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Link,
  SvgIcon,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";

interface Props {
  auth: boolean;
  logout: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const NavBar: React.FC<Props> = (props) => {
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
        <Toolbar variant={"dense"}>
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
        </Toolbar>
      </AppBar>
    </div>
  );
};
