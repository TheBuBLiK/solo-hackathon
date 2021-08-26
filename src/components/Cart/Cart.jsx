import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Button,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ITEMS_API, JSON_API_USERS } from "../../helper/consts";
import DeleteIcon from "@material-ui/icons/Delete";
import { useItems } from "../../contexts/ItemContext";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "white",
    marginLeft: "10px",
    fontSize: "20px",
  },
  img: {
    width: "15%",
    borderRadius: "10px",
  },
  grids: {
    margin: "20px 0",
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgb(32 32 32)",
  },
  title: {
    color: "white",
  },
  container: {
    display: "flex",
  },
  price: {
    color: "white",
  },
  deleteBtn: {
    color: "white",
  },
  noItem: {
    color: "white",
    height: "80vh",
    textAlign: "center",
    marginTop: "20px",
  },
  buyGrid: {
    display: "flex",
    justifyContent: "space-between",
  },
  buyBtn: {
    color: "white",
    backgroundColor: "green",
  },
  main: {
    minHeight: "100vh",
    margin: "20px auto",
  },
}));
const Cart = () => {
  const classes = useStyles();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { deleteCartItem, history } = useItems();
  let cart = [];

  const getItemFromCart = async () => {
    const curUser = JSON.parse(localStorage.getItem("user"));
    const itemsData = await axios(ITEMS_API);
    let sum = 0;
    itemsData.data.map((item) => {
      curUser.cart.map((itemId) => {
        if (item.id == itemId) {
          cart.push(item);
          sum += item.price;
          setTotalPrice(sum);
        }
      });
    });
    setCartItems(cart);
  };
  useEffect(() => {
    getItemFromCart();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {cartItems.length > 0 ? (
        <Container className={classes.main}>
          <h2 className={classes.title}>Your cart</h2>
          {cartItems.map((item) => (
            <Container className={classes.container}>
              <Grid className={classes.grids}>
                <img src={item.image} className={classes.img} />
                <div className={classes.text}>{item.name}</div>
              </Grid>
              <Grid className={classes.grids}>
                <div className={classes.price}>{item.price}$</div>
                <IconButton
                  onClick={async () => {
                    await deleteCartItem(item.id);
                    getItemFromCart();
                  }}
                >
                  <DeleteIcon className={classes.deleteBtn} />
                </IconButton>
              </Grid>
            </Container>
          ))}
          <Grid className={classes.buyGrid}>
            <h2 className={classes.title}>Total price: {totalPrice}</h2>
            <Button
              className={classes.buyBtn}
              onClick={() => history.push("/purchase")}
            >
              Buy
            </Button>
          </Grid>
        </Container>
      ) : (
        <h2 className={classes.noItem}>There isn't items in your cart</h2>
      )}
    </>
  );
};

export default Cart;
