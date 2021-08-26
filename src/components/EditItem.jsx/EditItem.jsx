import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useItems } from "../../contexts/ItemContext";
const useStyles = makeStyles((theme) => ({
  modalMarg: {
    marginTop: "40px",
  },
}));
const EditItem = () => {
  const { modal, itemDetails, saveEditedItem, toggleModal } = useItems();
  const [priceRadios, setPriceRadios] = useState(false);
  const classes = useStyles();
  let [editedItem, setEditedItem] = useState({
    name: itemDetails.name,
    description: itemDetails.description,
    creator: itemDetails.creator,
    image: itemDetails.image,
    price: itemDetails.price,
    genre: itemDetails.genre,
    rarity: itemDetails.rarity,
    comments: itemDetails.comments,
    likes: itemDetails.likes,
  });

  return (
    <Modal show={modal} className={classes.modalMarg}>
      <Modal.Header>
        <Modal.Title>Redacting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <input
            onChange={(e) => {
              setEditedItem({ ...editedItem, name: e.target.value });
              itemDetails.name = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="Name"
            value={itemDetails.name}
          />
        </div>

        <div>
          <input
            onChange={(e) => {
              setEditedItem({ ...editedItem, description: e.target.value });
              itemDetails.description = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="Description"
            value={itemDetails.description}
          />
        </div>

        <div>
          <input
            onChange={(e) => {
              setEditedItem({ ...editedItem, image: e.target.value });
              itemDetails.image = e.target.value;
            }}
            type="text"
            name=""
            id=""
            placeholder="Phono"
            value={itemDetails.image}
          />
        </div>

        <div>
          <input
            onChange={(e) => {
              setEditedItem({ ...editedItem, price: Number(e.target.value) });
              itemDetails.price = e.target.value;
            }}
            type="number"
            name=""
            id=""
            placeholder="Price"
            value={itemDetails.price}
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
                setEditedItem({ ...editedItem, rarity: "Common" });
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
                setEditedItem({ ...editedItem, rarity: "Rare" });
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
                setEditedItem({ ...editedItem, rarity: "Mythical" });
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
                setEditedItem({ ...editedItem, rarity: "Legendary" });
              }}
            />
            Legendary
          </div>
        </div>
        <div>
          <div>
            Choose item genre:
            <div>
              <input
                type="radio"
                name="genreRadio"
                id=""
                onChange={() => {
                  setEditedItem({ ...editedItem, genre: "Minecraft" });
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
                  setEditedItem({ ...editedItem, genre: "Genshin Impact" });
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
                  setEditedItem({ ...editedItem, genre: "Terraria" });
                }}
              />
              Terraria
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => saveEditedItem(itemDetails.id, editedItem)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditItem;
