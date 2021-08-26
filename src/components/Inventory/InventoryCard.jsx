import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { ITEMS_API, JSON_API_USERS } from "../../helper/consts";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  cardImg: {
    width: "230px",
    height: "230px",
    objectFit: "cover",
    position: "absolute",
    zIndex: "1",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    height: "100%",
  },
  content: {
    width: "230px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "10px !important",
  },

  itemTitle: {
    textAlign: "center",
    color: "white",
    fontSize: "20px",
  },
  itemCreator: {
    textAlign: "center",
    color: "grey",
    fontSize: "15px",
  },
  itemDescr: {
    color: "white",
    fontSize: "15px",
  },
  noItem: {
    color: "white",
    height: "80vh",
    textAlign: "center",
    marginTop: "20px",
  },
  inventoryText: {
    color: "white",
    margin: "20px",
  },
  playBtn: {
    color: "white",
    backgroundColor: "green",
    border: "0",
    borderRadius: "5px",
    zIndex: "0",

    width: "100%",
  },
}));

const InventoryCard = () => {
  const [inventoryItem, setInventoryItem] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  let inventory = [];
  const curUser = JSON.parse(localStorage.getItem("user"));
  const getItems = async () => {
    const { data } = await axios(ITEMS_API);

    data.map((item) => {
      curUser.inventory.map((libItem) => {
        if (item.id === libItem) {
          inventory.push(item);
        }
      });
    });

    setInventoryItem(inventory);
  };
  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <h2 className={classes.inventoryText}>Your inventory</h2>
      {curUser.inventory.length > 0 ? (
        <Container className={classes.container}>
          {inventoryItem.map((item) => (
            <div className="card">
              <img
                src={item.image}
                alt={item.name}
                className={classes.cardImg}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <div>
                    <Typography className={classes.itemTitle}>
                      {item.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      className={classes.itemCreator}
                    >
                      {item.creator}
                    </Typography>
                    <Typography className={classes.itemDescr}>
                      {item.description.length > 60
                        ? item.description.slice(0, 60) + "..."
                        : item.description}
                    </Typography>
                  </div>
                  <Button className={classes.playBtn}>Play</Button>
                </CardContent>
              </div>
              {/* <CardMedia className={classes.cover} image={item.image} /> */}
            </div>
          ))}
        </Container>
      ) : (
        <h2 className={classes.noItem}>There isn't items in your inventory</h2>
      )}
    </>
  );
};

export default InventoryCard;
