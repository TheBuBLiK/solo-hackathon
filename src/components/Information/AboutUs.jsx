import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  left: {
    display: "flex",
    flexWrap: "wrap",
    margin: "20px 0",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    minHeight: "80vh",
  },
  mainContainer: {
    width: "100%",
  },
  grids: {
    margin: "20px 0",
    width: "100%",
  },
  imgs: {
    maxWidth: "200px",
    maxHeight: "250px",
  },
  text: {
    color: "white",
    marginBottom: "10px",
    fontSize: "20px",
  },
  information: {
    marginLeft: "20px",
    display: "flex",
    flexDirection: "column",
  },
  mainGrid: {
    width: "100%",
    height: "600px",
  },
  mainImg: {
    width: "100%",
    height: "600px",
    backgroundImage: `url(
      "https://besthqwallpapers.com/img/original/134454/dark-walnut-board-4k-dark-wooden-texture-macro-dark-walnut.jpg"
    )`,
    objectFit: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: "50px",
    color: "white",
  },
  part: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
}));
const AboutUs = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <Grid className={classes.mainGrid}>
        <div className={classes.mainImg}>
          <Typography className={classes.mainText}>WELCOME</Typography>
        </div>
      </Grid>
      <Container className={classes.container}>
        <Grid className={classes.grids}>
          <h2 style={{ color: "white" }}>About us</h2>
          <Typography className={classes.text} style={{ fontSize: "20px" }}>
            Hello there! Here is information about team, that worked on this
            project. This team's name is projector. Our team consists of 2
            participants: Amantay and Tynai. There is information about us, look
            below.
          </Typography>
        </Grid>
        <Grid className={classes.grids}>
          <h2 style={{ color: "white" }}>Participants</h2>
          <div className={classes.part}>
            <div className={classes.left}>
              <img
                className={classes.imgs}
                src="https://images.unsplash.com/photo-1586083702768-190ae093d34d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              />
              <div className={classes.information}>
                <p className={classes.text}>Name: Tynai</p>
                <p className={classes.text}>Age: 16</p>
                <p className={classes.text}>Language: JS, Python</p>
                <p className={classes.text}>Nationality: Kyrgyz</p>
              </div>
            </div>
            <div className={classes.left}>
              <img
                className={classes.imgs}
                src="https://www.meme-arsenal.com/memes/6bb1c05df00b0dfd4fdda878e5858d29.jpg"
              />
              <div className={classes.information}>
                <p className={classes.text}>Name: Amantay</p>
                <p className={classes.text}>Age: 16</p>
                <p className={classes.text}>Language: JS</p>
                <p className={classes.text}>Nationality: Kyrgyz</p>
              </div>
            </div>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutUs;
