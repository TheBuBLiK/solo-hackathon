import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useHistory } from "react-router-dom";
import { useItems } from "../../contexts/ItemContext";
const useStyles = makeStyles((theme) => ({
  btns: {
    backgroundColor: "#0099ff",
    color: "white",
    padding: "10px 20px",
  },
  inps: {
    margin: "10px 0",

    borderBottom: "1px white solid",
  },
  inpColor: {
    color: "white",
  },
  cont: {
    margin: "50px",
  },
  visBtn: {
    color: "white",
    marginLeft: "-50px",
  },
  grids: {
    display: "flex",
    alignItems: "center",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const {
    regUser,
    visible,
    handleVisible,
    typePass,
    handleInpType,
    setVisible,
    setInpType,
    history,
  } = useAuth();
  const [newUser, setNewUser] = useState({
    nickname: "",
    name: "",
    password: "",
    cart: [],
    inventory: [],
    isAdmin: false,
  });
  return (
    <Container component="main" maxWidth="xs">
      <form action="" className={classes.cont}>
        <Grid container>
          <div>
            <Typography component="h1" variant="h5" style={{ color: "white" }}>
              Registration
            </Typography>
          </div>
          <Grid>
            <TextField
              variant="filled"
              className={classes.inps}
              name="nickname"
              required
              label="Nickname"
              InputProps={{
                className: classes.inpColor,
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              onChange={(e) =>
                setNewUser({ ...newUser, nickname: e.target.value })
              }
            />
            <TextField
              variant="filled"
              className={classes.inps}
              name="email"
              required
              label="Email Address"
              InputProps={{
                className: classes.inpColor,
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Grid className={classes.grids}>
              <TextField
                variant="filled"
                className={classes.inps}
                name="password"
                type={typePass}
                required
                label="Password"
                InputProps={{
                  className: classes.inpColor,
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <IconButton
                className={classes.visBtn}
                onClick={() => {
                  handleVisible();
                  handleInpType();
                }}
              >
                {!visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Grid>
            <Grid className={classes.grids}>
              <TextField
                variant="filled"
                className={classes.inps}
                name="passwordTwo"
                type={typePass}
                required
                label="Confirm password"
                InputProps={{
                  className: classes.inpColor,
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                onChange={(e) =>
                  setNewUser({ ...newUser, passwordSec: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Button
            className={classes.btns}
            style={{ marginRight: "25px" }}
            variant="contained"
            color="secondary"
            onClick={() => {
              history.goBack();
            }}
          >
            Close
          </Button>
          <Button
            className={classes.btns}
            variant="contained"
            color="primary"
            onClick={async () => {
              await regUser(newUser);
              setVisible(false);
              setInpType(false);
            }}
          >
            Sign up
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;
