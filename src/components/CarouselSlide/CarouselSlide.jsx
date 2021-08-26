import { Carousel } from "react-bootstrap";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useItems } from "../../contexts/ItemContext";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  carousel: {
    width: "100%",
    height: "100%",
  },
  slides: {
    height: "100%",
    width: "100%",
    objectFit: "fill",
  },
  btns: {
    backgroundColor: "#0099ff",
    color: "white",
    padding: "10px 30px",
  },
}));
const CarouselSlide = () => {
  const classes = useStyles();
  const { getItemsData, itemsData, changeId } = useItems();

  useEffect(() => {
    getItemsData();
  }, []);

  return (
    <Container style={{ maxHeight: "800px", maxWidth: "1300px" }}>
      <Carousel className={classes.carousel}>
        <Carousel.Item className={classes.slides}>
          <img
            className="d-block w-100"
            src={itemsData[0]?.image}
            alt="First slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className={classes.btns} onClick={() => changeId(1)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className={classes.slides}>
          <img
            className="d-block w-100"
            src={itemsData[1]?.image}
            alt="Second slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className={classes.btns} onClick={() => changeId(2)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={classes.slides}>
          <img
            className="d-block w-100"
            src={itemsData[2]?.image}
            alt="Third slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className={classes.btns} onClick={() => changeId(3)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className={classes.slides}>
          <img
            className="d-block w-100"
            src={itemsData[3]?.image}
            alt="Third slide"
          />
          <Carousel.Caption style={{ display: "flex" }}>
            <Button className={classes.btns} onClick={() => changeId(4)}>
              See more
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default CarouselSlide;
