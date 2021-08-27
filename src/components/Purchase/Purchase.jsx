import {
  Button,
  Container,
  makeStyles,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import Cards from "react-credit-cards";

import "react-credit-cards/es/styles-compiled.css";
import { useItems } from "../../contexts/ItemContext";
const useStyles = makeStyles((theme) => ({
  inps: {
    margin: "10px 0",
    borderBottom: "1px white solid",
  },
  inpColor: {
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    marginTop: "20px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "60px 0",
  },
  payBtn: {
    backgroundColor: "green",
    color: "white",
  },
}));
const Purchase = () => {
  const [open, setOpen] = useState(false);
  const { toInventory, history } = useItems();
  const classes = useStyles();
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const buyNow = JSON.parse(localStorage.getItem("buyNow"));

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleInputNumber = (e) => {
    if (e.target.value.length < 17) setNumber(e.target.value);
  };
  const handleInputExpiry = (e) => {
    if (e.target.value.length < 5) {
      setExpiry(e.target.value);
    }
  };
  const handleInputCvc = (e) => {
    if (e.target.value.length < 5) {
      setCvc(e.target.value);
    }
  };
  const handleInputName = (e) => {
    setName(e.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const curUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div id="PaymentForm" className={classes.container}>
      <Cards
        cvc={cvc}
        expiry={expiry}
        focused={focus}
        name={name}
        number={number}
      />
      <form className={classes.form}>
        <TextField
          className={classes.inps}
          required
          InputProps={{
            className: classes.inpColor,
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          type="tel"
          name="number"
          value={number}
          placeholder="Card Number"
          onChange={(e) => handleInputNumber(e)}
          onFocus={(e) => handleInputFocus(e)}
        />
        <TextField
          className={classes.inps}
          required
          value={expiry}
          InputProps={{
            className: classes.inpColor,
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          type="tel"
          name="expiry"
          placeholder="Card Expiry"
          onChange={(e) => handleInputExpiry(e)}
          onFocus={(e) => handleInputFocus(e)}
        />
        <TextField
          className={classes.inps}
          required
          value={cvc}
          InputProps={{
            className: classes.inpColor,
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          type="tel"
          name="cvc"
          placeholder="Card Cvc"
          onChange={(e) => handleInputCvc(e)}
          onFocus={(e) => handleInputFocus(e)}
        />
        <TextField
          className={classes.inps}
          required
          value={name}
          InputProps={{
            className: classes.inpColor,
          }}
          InputLabelProps={{
            style: { color: "#fff" },
          }}
          type="tel"
          name="name"
          placeholder="Name"
          onChange={(e) => handleInputName(e)}
          onFocus={(e) => handleInputFocus(e)}
        />
        <Button
          className={classes.payBtn}
          onClick={() => {
            if (
              number.length == 16 &&
              expiry.length == 4 &&
              cvc.length == 4 &&
              name.length > 2
            ) {
              {
                +buyNow > 0 ? toInventory(+buyNow) : toInventory(curUser.cart);
              }

              localStorage.setItem("buyNow", JSON.stringify([]));
              handleOpen();
              setTimeout(() => {
                history.push("/inventory");
              }, 1500);
            } else {
              alert("Type valid information");
            }
          }}
        >
          Pay
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Item has been added to your inventory!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Purchase;
