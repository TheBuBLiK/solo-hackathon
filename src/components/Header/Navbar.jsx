import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {
  Button,
  Link,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  ClickAwayListener,
} from "@material-ui/core";
import { useItems } from "../../contexts/ItemContext";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import zIndex from "@material-ui/core/styles/zIndex";
import { useAuth } from "../../contexts/AuthContext";
const useStyles = makeStyles((theme) => ({
  menuBtn: {
    textDecoration: "none",
  },
  grow: {
    flexGrow: 1,
  },
  navbarBtn: {
    color: "white",
    textDecoration: "none",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#1a1a1a",
    height: "20%",
  },
  appBar: {
    backgroundColor: "#1a1a1a",
    opacity: "90%",
  },

  menu: {
    position: "absolute",
    left: 15,
    backgroundColor: "white",
    color: "black",
    opacity: "80%",
  },
  priceInputs: {
    width: "100px",
  },

  menuMobile: {
    position: "absolute",
    left: 15,
    position: "absolute",
    backgroundColor: "white",
    color: "black",
    opacity: "80%",
    zIndex: 1,
  },
  mobileMenuItem: {
    marginTop: "-15px",
  },
  mobilePriceFilter: {
    display: "flex",
  },
  mobileBurger: {
    position: "relative",
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const { logged } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { getItemsData, history, isAllItems, toHome, toItemsList } = useItems();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <>
      <Menu
        className={classes.mobileBurger}
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          {logged ? (
            <Button
              className={classes.menuBtn}
              onClick={() => history.push("/inventory")}
            >
              Inventory
            </Button>
          ) : null}
        </MenuItem>
        <MenuItem onClick={() => history.push("/cart")}>
          <Button>Cart</Button>
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.navbar}>
          <div className={classes.navbarSel}>
            <div className={classes.sectionDesktop}></div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
}
