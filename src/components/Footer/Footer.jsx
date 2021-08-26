import {
  Container,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import EjectIcon from "@material-ui/icons/Eject";

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100%",

    backgroundColor: "#2a295b",
  },
  icons: {
    color: "white",
  },
  text: {
    color: "grey",
    width: "100%",
    textAlign: "center",
    padding: "10px 0",
  },
  iconsFooter: {
    padding: "10px 0",
    display: "flex",
    justifyContent: "space-between",
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Container>
        <div className={classes.iconsFooter}>
          <div className={classes.icons2}>
            <IconButton onClick={() => window.scrollTo(0, 0)}>
              <EjectIcon className={classes.icons} />
            </IconButton>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
