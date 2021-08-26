import React from "react";
import { useEffect } from "react";
import { useItems } from "../../contexts/ItemContext";
import ItemCard from "../ItemCard/ItemCard";
import { Container } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { Grid, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginTop: "30px",
  },
  review: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  seeMore: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
const ItemsListPreview = () => {
  const classes = useStyles();
  const { getItemsData, itemsData, history } = useItems();

  useEffect(() => {
    getItemsData();
  }, []);

  let counter = 0;

  return (
    <Container className={classes.container}>
      <Grid className={classes.seeMore}>
        <h4 style={{ color: "white", fontFamily: "Noto Sans JP" }}>
          All items
        </h4>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/itemslist");
          }}
        >
          See More
        </Button>
      </Grid>
      <Grid className={classes.review}>
        {itemsData &&
          itemsData.map((item) => {
            if (counter < 5) {
              counter++;
              return <ItemCard item={item} />;
            }
          })}
      </Grid>
    </Container>
  );
};

export default ItemsListPreview;
