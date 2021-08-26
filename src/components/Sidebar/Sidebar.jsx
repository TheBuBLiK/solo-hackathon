import React from "react";
import { useEffect } from "react";
import { useItems } from "../../contexts/ItemContext";
import ItemCard from "../ItemCard/ItemCard";
import { Link } from "react-router-dom";
import SvgIcon from "@material-ui/core/SvgIcon";
import {
  Grid,
  makeStyles,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import { Pagination } from "@material-ui/lab";
import { Carousel, Container } from "react-bootstrap";
import EditItem from "../EditItem.jsx/EditItem";
import { getCurrentPage } from "../../helper/functions";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  grids: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  addItem: {
    textDecoration: "none",
    color: "white",
  },
  sorryH1: {
    color: "white",
    height: "80vh",
  },
  addBtn: {
    backgroundColor: "green",
    color: "white",
  },
  mobileMenuItem: {
    paddingRight: "15px",
    margin: "0",
    marginRight: "5px",
    marginBottom: "5px",
  },
  sideBar: {
    display: "flex",
    left: 15,
    backgroundColor: "#2a295b",
    color: "black",
    opacity: "80%",
    zIndex: "1",
    flexDirection: "column",
    width: "200px",
  },
  genres: {
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
  priceInputs: {
    backgroundColor: "#262626",
    color: "white",
    marginRight: "5px",
  },
  inpColor: {
    color: "white",
  },
  resetBtn: {
    color: "white",
    backgroundColor: "#262626",
    borderRadius: "0",
    padding: "10px 20px",
  },
  labelImg: {
    width: "100%",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px 10px 0 0",
  },
  labelDesc: {
    height: "60px",
    textAlign: "center",
  },
  labelText: {
    fontSize: "20px",
  },
  labelCont: {
    marginTop: "10px",
    borderRadius: "10px",
    backgroundColor: "#34346b",
  },
}));

const Leftbar = () => {
  const { logged } = useAuth();
  const classes = useStyles();
  const { getItemsData, itemsData, modal, pages, history } = useItems();
  const [page, setPage] = useState(getCurrentPage());
  const [sortMenu, setSortMenu] = useState(false);
  const [genre, setGenre] = useState(getGenre());
  const [minPrice, setMinPrice] = useState(getMinPrice());
  const [maxPrice, setMaxPrice] = useState(getMaxPrice());
  function getGenre() {
    const search = new URLSearchParams(history.location.search);
    return search.get("genre");
  }

  function getMinPrice() {
    const search = new URLSearchParams(history.location.search);
    return search.get("price_gte");
  }

  function getMaxPrice() {
    const search = new URLSearchParams(history.location.search);
    return search.get("price_lte");
  }

  const changeGenre = (e) => {
    if (e.target.value == "all") {
      const search = new URLSearchParams(history.location.search);
      search.delete("genre");
      search.set("_page", "1");
      history.push(`${history.location.pathname}?${search.toString()}}`);
      getItemsData();
      setGenre(e.target.value);
      return;
    }
    const search = new URLSearchParams(history.location.search);
    search.set("genre", e.target.value);
    search.set("_page", "1");
    history.push(`${history.location.pathname}?${search.toString()}`);
    getItemsData();
    setGenre(e.target.value);
  };

  return (
    <div className={classes.sideBar}>
      <RadioGroup
        value={genre}
        onChange={changeGenre}
        className={classes.genres}
      >
        <FormControlLabel
          className={classes.mobileMenuItem}
          value="Minecraft"
          control={<Radio />}
          label={
            <div className={classes.labelCont}>
              <img
                src="https://images4.alphacoders.com/112/thumb-1920-1128578.jpg"
                className={classes.labelImg}
              />
              <div className={classes.labelDesc}>
                <p className={classes.labelText}>Minecraft</p>
              </div>
            </div>
          }
        />
        <FormControlLabel
          className={classes.mobileMenuItem}
          value="Genshin Impact"
          control={<Radio />}
          label={
            <div className={classes.labelCont}>
              <img
                src="https://static.zerochan.net/Genshin.Impact.full.3329059.jpg"
                className={classes.labelImg}
              />
              <div className={classes.labelDesc}>
                <p className={classes.labelText}>Genshin Impact</p>
              </div>
            </div>
          }
        />
        <FormControlLabel
          className={classes.mobileMenuItem}
          value="Terraria"
          control={<Radio />}
          label={
            <div className={classes.labelCont}>
              <img
                src="https://wallpapercave.com/wp/wp2233411.jpg"
                className={classes.labelImg}
              />
              <div className={classes.labelDesc}>
                <p className={classes.labelText}>Terraria</p>
              </div>
            </div>
          }
        />

        <FormControlLabel
          className={classes.mobileMenuItem}
          value="all"
          control={<Radio />}
          label="All"
        />
      </RadioGroup>
    </div>
  );
};

export default Leftbar;
