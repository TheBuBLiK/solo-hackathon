import { Container, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useItems } from "../../contexts/ItemContext";
import { ITEMS_API } from "../../helper/consts";

const useStyles = makeStyles(() => ({
  container: {
    minHeight: "300px",
    backgroundColor: "#242424",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },

  card: {
    width: "355px",
    height: "250px",
    margin: "30px 0",
  },
  title: {
    color: "white",
    fontFamily: "Roboto",
    color: "gainsboro",
    fontSize: "20px",
  },
  creator: { color: "silver", fontSize: "16px" },
}));

const FreeItems = () => {
  let counter = 0;
  const { history } = useItems();
  const { itemsData, getItemsData } = useItems();
  //   const [items, setItems] = useState([]);
  //   const getItems = async () => {
  //     const { data } = await axios(ITEMS_API);
  //     setItems(data);
  //   };
  useEffect(() => {
    getItemsData();
  }, []);
  //   console.log(items);
  const classes = useStyles();
  return (
    <Container style={{ margin: "30px 0" }}>
      <h4
        style={{ color: "white", margin: "20px 0", fontFamily: "Noto Sans JP" }}
      >
        Free items
      </h4>
      <div className={classes.container}>
        <div className={classes.innerContainer}>
          {itemsData &&
            itemsData.map((item) => {
              if (item.price == 0 && counter < 4) {
                counter++;
                return (
                  <div className={classes.card}>
                    <img
                      src={item.image}
                      className="free-card-img"
                      onClick={() => {
                        history.push(`itemDetails/${item.id}`);
                      }}
                    />

                    <div className={classes.title}>{item.name}</div>
                    <div className={classes.creator}>{item.creator}</div>
                  </div>
                );
              }
            })}
        </div>
      </div>
      ;
    </Container>
  );
};

export default FreeItems;
