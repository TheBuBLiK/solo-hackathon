import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useItems } from "../../contexts/ItemContext";
import { makeStyles } from "@material-ui/core";

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
  },
}));
const ItemCard = ({ item }) => {
  const classes = useStyles();
  const { deleteItem, setEditItemInfo, history } = useItems();
  const { logged } = useAuth();

  return (
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
        <div className={classes.itemImgDiv}>
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
      {logged && logged.isAdmin ? (
        <div>
          <button
            className={classes.deleteBtn}
            onClick={() => deleteItem(item.id)}
          >
            DELETE
          </button>
          <button
            className={classes.editBtn}
            onClick={() => setEditItemInfo(item.id)}
          >
            EDIT
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ItemCard;
