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
    backgroundColor: "#2a295b",
    color: "white",
  },
  mobileMenuItem: {
    backgroundColor: "#262626",
    paddingRight: "15px",
    margin: "0",
    marginRight: "5px",
    marginBottom: "5px",
  },
  menuMobile: {
    display: "flex",
    left: 15,
    backgroundColor: "inherit",
    color: "black",
    opacity: "80%",
    zIndex: "1",
    flexDirection: "column",
  },
  genres: {
    flexDirection: "row",
    color: "white",
  },
  priceInputs: {
    backgroundColor: "#2a295b",
    color: "white",
    marginRight: "5px",
  },
  inpColor: {
    color: "white",
  },
  resetBtn: {
    color: "white",
    backgroundColor: "#2a295b",
    borderRadius: "0",
    padding: "10px 20px",
  },
}));
const ItemsList = () => {
  const { logged } = useAuth();
  const classes = useStyles();
  const { getItemsData, itemsData, modal, pages, history } = useItems();
  const [page, setPage] = useState(getCurrentPage());
  const [sortMenu, setSortMenu] = useState(false);
  const [genre, setGenre] = useState(getGenre());
  const [minPrice, setMinPrice] = useState(getMinPrice());
  const [maxPrice, setMaxPrice] = useState(getMaxPrice());
  useEffect(() => {
    getItemsData();
    window.scrollTo(0, 0);
  }, []);
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

  const changeMinPrice = (value) => {
    const search = new URLSearchParams(history.location.search);
    search.set("price_gte", value);
    console.log(search);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getItemsData();
    setMinPrice(value);
  };

  const changeMaxPrice = (value) => {
    const search = new URLSearchParams(history.location.search);
    search.set("price_lte", value);
    console.log(search);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getItemsData();
    setMaxPrice(value);
  };

  const resetPrice = () => {
    const search = new URLSearchParams(history.location.search);
    search.delete("price_gte");
    search.delete("price_lte");
    history.push(`${history.location.pathname}?${search.toString()}`);
    getItemsData();
    setMinPrice(getMinPrice());
    setMaxPrice(getMaxPrice());
  };
  const handlePage = (e, page) => {
    const search = new URLSearchParams(window.location.search);
    search.set("_page", page);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getItemsData();
    setPage(page);
  };

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <>
      <Container className={classes.container}>
        {modal ? <EditItem /> : null}
        <Grid
          className={classes.grids}
          style={{ justifyContent: "space-between", margin: "20px 0" }}
        >
          {logged ? (
            <Link to="/additem" className={classes.addItem}>
              <Button variant="contained" className={classes.addBtn}>
                Add item to marketplace
              </Button>
            </Link>
          ) : null}
          <div className={classes.mobilePriceFilter}>
            <TextField
              className={classes.priceInputs}
              value={minPrice}
              onChange={(e) => changeMinPrice(e.target.value)}
              type="number"
              label="Min Price($)"
              defaultValue="100"
              InputProps={{
                className: classes.inpColor,
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
            <TextField
              className={classes.priceInputs}
              value={maxPrice}
              onChange={(e) => changeMaxPrice(e.target.value)}
              type="number"
              label="Max Price($)"
              defaultValue="1000"
              InputProps={{
                className: classes.inpColor,
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />

            <Button
              variant="outlined"
              onClick={resetPrice}
              className={classes.resetBtn}
            >
              Reset Price Filter
            </Button>
          </div>
        </Grid>
        <Grid className={classes.grids}>
          {itemsData.length > 0 ? (
            itemsData.map((item) => {
              return <ItemCard item={item} />;
            })
          ) : (
            <h2 className={classes.sorryH1}>
              Sorry, there are no such items...
            </h2>
          )}
        </Grid>
        <div style={{ margin: "20px auto" }}>
          <Pagination
            size="large"
            color="secondary"
            count={pages}
            variant="outlined"
            shape="rounded"
            page={+page}
            onChange={handlePage}
          />
        </div>
      </Container>
    </>
  );
};

export default ItemsList;
