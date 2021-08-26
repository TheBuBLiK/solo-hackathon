import { Container, makeStyles, TextField, Button } from "@material-ui/core";

import React from "react";
import { useState } from "react";
import { useItems } from "../../contexts/ItemContext";
import { RadioGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "slateblue",
  },

  btns: {
    backgroundColor: "#0099ff",
    color: "white",
    padding: "10px 20px",
    margin: "0 10px",
  },
}));
const AddItem = () => {
  const classes = useStyles();
  const { addNewItem, history } = useItems();
  const curUser = JSON.parse(localStorage.getItem("user"));
  const [itemInfo, setItemInfo] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    creator: curUser.nickname,
    genre: "",
    rarity: "",
    comments: [],
    likes: [],
  });
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "50px 0",
        color: "white",
      }}
    >
      <div className={classes.text}>
        <h1>Item creator</h1>
        <br />

        <input
          onChange={(e) => {
            setItemInfo({ ...itemInfo, name: e.target.value });
          }}
          type="text"
          placeholder="Name"
        />
        <br />

        <input
          onChange={(e) => {
            setItemInfo({ ...itemInfo, description: e.target.value });
          }}
          type="text"
          placeholder="Description"
        />
        <br />

        <input
          onChange={(e) => {
            setItemInfo({ ...itemInfo, image: e.target.value });
          }}
          type="text"
          placeholder="Image"
        />
        <br />

        <div>
          <input
            onChange={(e) => {
              setItemInfo({ ...itemInfo, price: Number(e.target.value) });
            }}
            type="number"
            placeholder="Price($)"
          />
          <br />
        </div>
        <div>
          <p>Rarity: </p>
          <div>
            <input
              type="radio"
              name="rarityRadio"
              id=""
              onChange={() => {
                setItemInfo({ ...itemInfo, rarity: "Common" });
              }}
            />
            Common
          </div>
          <div>
            <input
              type="radio"
              name="rarityRadio"
              id=""
              onChange={() => {
                setItemInfo({ ...itemInfo, rarity: "Rare" });
              }}
            />
            Rare
          </div>
          <div>
            <input
              type="radio"
              name="rarityRadio"
              id=""
              onChange={() => {
                setItemInfo({ ...itemInfo, rarity: "Mythical" });
              }}
            />
            Mythical
          </div>
          <div>
            <input
              type="radio"
              name="rarityRadio"
              id=""
              onChange={() => {
                setItemInfo({ ...itemInfo, rarity: "Legendary" });
              }}
            />
            Legendary
          </div>
        </div>
        <div>
          <p> Choose item genre:</p>

          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setItemInfo({ ...itemInfo, genre: "Minecraft" });
              }}
            />
            Minecraft
          </div>
          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setItemInfo({ ...itemInfo, genre: "Genshin Impact" });
              }}
            />
            Genshin Impact
          </div>
          <div>
            <input
              type="radio"
              name="genreRadio"
              id=""
              onChange={() => {
                setItemInfo({ ...itemInfo, genre: "Terraria" });
              }}
            />
            Terraria
          </div>
        </div>
        <br />
        <Button
          className={classes.btns}
          variant="secondary"
          onClick={() => history.push("/")}
        >
          Close
        </Button>
        <Button
          onClick={() => {
            addNewItem(itemInfo);
          }}
          className={classes.btns}
        >
          Add
        </Button>
      </div>
    </Container>
  );
};

export default AddItem;
