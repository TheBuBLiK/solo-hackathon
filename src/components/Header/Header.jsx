import React from "react";

import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";

import MoreIcon from "@material-ui/icons/MoreVert";
import Navbar from "./Navbar";
import { Button } from "@material-ui/core";
import ContactsIcon from "@material-ui/icons/Contacts";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useItems } from "../../contexts/ItemContext";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: "#2a295b",
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
  navbarBtn: {
    color: "white",
  },
  logo: {
    color: "inherit",
    textDecoration: "none",
    width: "100px",
  },
  a: {
    textDecoration: "none",
    color: "black",
  },
}));

export default function Header() {
  const classes = useStyles();
  const { logout, logged } = useAuth();
  const { toItemsList, history, getItemsData } = useItems();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
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
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!localStorage.getItem("user") ? (
        <div>
          <Link to="/login" className={classes.a}>
            <MenuItem onClick={handleMenuClose}>Log in</MenuItem>
          </Link>
          <Link to="/signup" className={classes.a}>
            <MenuItem onClick={handleMenuClose}>Sign up</MenuItem>
          </Link>
        </div>
      ) : (
        <MenuItem onClick={(handleMenuClose, logout)}>Log out</MenuItem>
      )}
    </Menu>
  );
  const searching = (e) => {
    history.push("/");
    const search = new URLSearchParams(history.location.search);
    search.set("q", e.target.value);
    history.push(`${history.location.pathname}?${search.toString()}`);
    getItemsData();
  };
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => history.push("/inventory")}>INVENTORY</MenuItem>
      <MenuItem onClick={() => history.push("/cart")}>CART</MenuItem>
      <MenuItem onClick={() => history.push("/favourites")}>
        FAVOURITES
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {logged ? <>{logged.nickname}</> : "Profile"}
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar position="sticky" className={classes.navbar}>
          <Toolbar>
            <Link to="/" onClick={toItemsList} className={classes.logo}>
              <Typography className={classes.title} noWrap>
                CyberShop
              </Typography>
            </Link>
            <div className={classes.navbarSer}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>

                <InputBase
                  onChange={(e) => searching(e)}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {logged ? (
                <>
                  <Button
                    className={classes.navbarBtn}
                    onClick={() => history.push("/inventory")}
                  >
                    Inventory
                  </Button>
                  <Button
                    className={classes.navbarBtn}
                    onClick={() => history.push("/favourites")}
                  >
                    Favourites
                  </Button>
                </>
              ) : null}
              <Button
                onClick={() => history.push("/cart")}
                className={classes.navbarBtn}
              >
                Cart
              </Button>

              <Button
                className={classes.navbarBtn}
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {logged ? <>{logged.nickname}</> : "Account"}
              </Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </>
  );
}
