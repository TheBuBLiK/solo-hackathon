import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useItems } from "../../contexts/ItemContext";
import { Button, IconButton, makeStyles } from "@material-ui/core";
import axios from "axios";
import { JSON_API_USERS } from "../../helper/consts";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderSharpIcon from "@material-ui/icons/Favorite";
const useStyles = makeStyles(() => ({
  editBtn: {
    backgroundColor: "inherit",
    color: "white",
    border: "1px white solid",
    borderRadius: "5px",
    marginLeft: "10px",
  },
  deleteBtn: {
    border: "0",
    borderRadius: "5px",
    backgroundColor: "red",
    color: "white",
  },
  itemImgDiv: {
    width: "100px",
    height: "100px",
  },
  cardPinnacle: {
    display: "flex",
    flexWrap: "wrap",
    margin: "10px",
    justifyContent: "space-between",
  },
}));
const ItemCard = ({ item }) => {
  const classes = useStyles();
  const { deleteItem, setEditItemInfo, history } = useItems();
  const { logged } = useAuth();
  const [isLiked, setIsLiked] = useState();
  const curUser = JSON.parse(localStorage.getItem("user"));
  const toBuyNow = (id) => {
    if (!localStorage.getItem("buyNow")) {
      localStorage.setItem("buyNow", []);
      localStorage.setItem("buyNow", JSON.stringify(id));
    }
    localStorage.setItem("buyNow", JSON.stringify(id));
  };

  const addItemCart = async (itemToCart) => {
    const usersCart = await axios(JSON_API_USERS);
    usersCart.data.map((user) => {
      if (curUser.name == user.name) {
        const newUser = { ...user };
        newUser.cart.push(itemToCart);

        axios.patch(`${JSON_API_USERS}/${user.id}`, newUser);

        localStorage.setItem("user", JSON.stringify(newUser));
      }
    });
  };
  const addFav = async (fav) => {
    const usersFav = await axios(JSON_API_USERS);
    usersFav.data.map((user) => {
      if (curUser.name == user.name) {
        const newUser = { ...user };
        newUser.favourites.push(fav);
        axios.patch(`${JSON_API_USERS}/${user.id}`, newUser);

        localStorage.setItem("user", JSON.stringify(newUser));
        setIsLiked(true);
      }
    });
  };
  const delFav = async (fav) => {
    const users = await axios(JSON_API_USERS);
    users.data.map(async (user) => {
      if (curUser.name == user.name) {
        const newFavs = user.favourites.filter((favs) => favs != fav);
        console.log(newFavs);
        const newData = { ...user, favourites: newFavs };
        await axios.patch(`${JSON_API_USERS}/${user.id}`, newData);
        localStorage.setItem("user", JSON.stringify(newData));
        setIsLiked(false);
      }
    });
  };
  return (
    <>
      <div
        className="item-card"
        style={{
          border:
            item.rarity == "Rare"
              ? "1px solid orange"
              : item.rarity == "Mythical"
              ? "1px solid red"
              : item.rarity == "Legendary"
              ? "1px solid yellow"
              : "1px solid white",
        }}
      >
        <div className={classes.cardPinnacle}>
          <div
            className={classes.itemImgDiv}
            style={{
              border:
                item.rarity == "Rare"
                  ? "1px solid orange"
                  : item.rarity == "Mythical"
                  ? "1px solid red"
                  : item.rarity == "Legendary"
                  ? "1px solid yellow"
                  : "1px solid white",
            }}
          >
            <img
              className="item-card-img"
              src={item.image}
              alt={`${item.name} img`}
            />
          </div>
          <div className="item-card-info">
            <div style={{ fontFamily: "Roboto", color: "gainsboro" }}>
              {item.name}
            </div>

            <div
              style={{
                color:
                  item.rarity == "Rare"
                    ? "orange"
                    : item.rarity == "Mythical"
                    ? "red"
                    : item.rarity == "Legendary"
                    ? "yellow"
                    : "white",
              }}
            >
              {item.rarity}
            </div>
            <div style={{ color: "silver", fontSize: "12px" }}>
              {item.creator}
            </div>
            <div style={{ color: "gainsboro", fontSize: "15px" }}>
              {item.price == 0 ? "Free to play" : item.price + "$"}
            </div>
          </div>
        </div>
        <div style={{ color: "white", margin: "0 10px 0 10px" }}>
          {item.description.length > 100
            ? item.description.slice(0, 100) + "..."
            : item.description}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "5px",
          }}
        >
          <div className={classes.buyBtns}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push("/purchase");
                toBuyNow(item.id);
              }}
            >
              Buy now
            </Button>
          </div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              addItemCart(item.id);
            }}
          >
            Add to cart
          </Button>
        </div>
        <div style={{ margin: "10px 0 0 10px", display: "flex" }}>
          {(logged && logged.isAdmin) ||
          (logged && logged.nickname == item.creator) ? (
            <>
              <button
                className={classes.deleteBtn}
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
              <button
                className={classes.editBtn}
                onClick={() => setEditItemInfo(item.id)}
              >
                Edit
              </button>
            </>
          ) : null}
          {logged ? (
            <div style={{ color: "white" }}>
              {isLiked ? (
                <FavoriteIcon
                  onClick={() => delFav(item.id)}
                  style={{ color: "red" }}
                />
              ) : (
                <FavoriteBorderSharpIcon
                  onClick={() => addFav(item.id)}
                  style={{ color: "white" }}
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ItemCard;
