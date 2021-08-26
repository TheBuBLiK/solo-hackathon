import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
const useStyles = makeStyles((theme) => ({
  container: {
    margin: "40px",
    minHeight: "80vh",

    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  icons: {
    width: "200px",
    height: "200px",
  },
  card: {
    width: "400px",
    maxHeight: "400px",
    margin: "30px",
  },
  cards: {
    width: "100%",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  hrefs: {
    textDecoration: "none",
  },
}));
const Contacts = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.cards}>
            <PhoneIcon className={classes.icons} />
          </div>
          <div className={classes.cards}>
            <Typography variant="h5" component="h5">
              Amantay: +996(559)-88-55-80
              <br />
              Tynai: +996(703)-81-15-73
            </Typography>
          </div>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.cards}>
            <PermContactCalendarIcon className={classes.icons} />
          </div>
          <div className={classes.cards}>
            <Typography variant="h5" component="h5">
              Youtube:{" "}
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCzUYaZdrDfefH1vmzCMYfbA"
                className={classes.hrefs}
              >
                Тынай Сманов
              </a>
              <br />
              Instagram:{" "}
              <a
                target="_blank"
                href="https://www.instagram.com/akvamantai/"
                className={classes.hrefs}
              >
                @akvamantai
              </a>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;
