import {
  CardContent,
  Container,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { ITEMS_API, JSON_API_USERS } from "../../helper/consts";
const useStyles = makeStyles(() => ({
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

  gameTitle: {
    textAlign: "center",
    color: "white",
    fontSize: "20px",
  },
  gameCreator: {
    textAlign: "center",
    color: "grey",
    fontSize: "15px",
  },
  gameDescr: {
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
  gameRarity: {
    textAlign: "center",

    fontSize: "16px",
  },
  noItem: {
    color: "white",
    height: "80vh",
    textAlign: "center",
    marginTop: "20px",
  },
}));
const Favourites = () => {
  const [favItem, setFavItem] = useState([]);
  const classes = useStyles();
  let fav = [];
  const curUser = JSON.parse(localStorage.getItem("user"));
  const getItems = async () => {
    const { data } = await axios(ITEMS_API);

    data.map((game) => {
      curUser.favourites.map((favItem) => {
        if (game.id === favItem) {
          fav.push(game);
        }
      });
    });

    setFavItem(fav);
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
      }
    });
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <div style={{ height: "80vh", backgroundColor: "#252550" }}>
      {curUser.favourites.length > 0 ? (
        <Container className={classes.container}>
          {favItem.map((game) => (
            <div
              className="card"
              style={{
                border:
                  game.rarity == "Rare"
                    ? "1px solid orange"
                    : game.rarity == "Mythical"
                    ? "1px solid red"
                    : game.rarity == "Legendary"
                    ? "1px solid yellow"
                    : "1px solid white",
              }}
            >
              <img
                src={game.image}
                alt={game.name}
                className={classes.cardImg}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <div>
                    <Typography className={classes.gameTitle}>
                      {game.name}
                    </Typography>
                    <Typography
                      className={classes.gameRarity}
                      style={{
                        color:
                          game.rarity == "Rare"
                            ? "orange"
                            : game.rarity == "Mythical"
                            ? "red"
                            : game.rarity == "Legendary"
                            ? "yellow"
                            : "white",
                      }}
                    >
                      {game.rarity}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      className={classes.gameCreator}
                    >
                      {game.genre}
                    </Typography>
                    <Typography className={classes.gameDescr}>
                      {game.description.length > 60
                        ? game.description.slice(0, 60) + "..."
                        : game.description}
                    </Typography>
                    <Button
                      style={{ color: "white", backgroundColor: "#2a295b" }}
                      onClick={() => {
                        delFav(game.id);
                        getItems();
                      }}
                    >
                      Delete from favourites
                    </Button>
                  </div>
                </CardContent>
              </div>
              {/* <CardMedia className={classes.cover} image={game.image} /> */}
            </div>
          ))}
        </Container>
      ) : (
        <h2 className={classes.noItem}>There is no favourites games</h2>
      )}
    </div>
  );
};

export default Favourites;
