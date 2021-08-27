import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useHistory } from "react-router-dom";

import { ACTIONS, ITEMS_API, JSON_API_USERS } from "../helper/consts";

export const itemContext = createContext();

export const useItems = () => useContext(itemContext);

const INIT_STATE = {
  itemsData: [],
  itemDetails: {},
  modal: false,
  id: null,
  pages: 1,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_ITEM_DETAILS:
      return { ...state, itemDetails: action.payload };
    case ACTIONS.GET_ITEMS_DATA:
      return {
        ...state,
        itemsData: action.payload.data,
        pages: Math.ceil(action.payload.headers["x-total-count"] / itemsCount),
      };
    case ACTIONS.MODAL:
      return { ...state, modal: action.payload };
    case ACTIONS.CHANGE_ID:
      return { ...state, id: action.payload };
    case ACTIONS.GET_ITEMS:
      return { ...state, itemsData: action.payload };
    default:
      return state;
  }
};

let itemsCount = 5;

const ItemContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [isAllItems, setIsAllItems] = useState(false);
  const history = useHistory();
  const buyNow = JSON.parse(localStorage.getItem("buyNow"));

  useEffect(() => {
    localStorage.setItem("buyNow", JSON.stringify([]));
  }, []);

  const getItemsData = async () => {
    const search = new URLSearchParams(history.location.search);
    search.set("_limit", itemsCount);
    history.push(`${history.location.pathname}?${search.toString()}`);
    const data = await axios(`${ITEMS_API}/${window.location.search}`);
    dispatch({
      type: ACTIONS.GET_ITEMS_DATA,
      payload: data,
    });
  };

  const addNewItem = async (newItem) => {
    if (
      newItem.creator.trim().length > 0 &&
      newItem.description.trim().length > 0 &&
      newItem.genre.trim().length > 0 &&
      newItem.image.trim().length > 0 &&
      newItem.rarity.trim().length > 0 &&
      newItem.name.trim().length > 0
    ) {
      if (Number(newItem.price) >= 0) {
        await axios.post(ITEMS_API, newItem);
        await getItemsData();
        history.push("/");
      } else {
        alert("The price cannot be negative");
      }
    } else {
      alert("Fill all the fields");
    }
  };

  const deleteItem = async (id) => {
    await axios.delete(`${ITEMS_API}/${id}`);
    getItemsData();
  };

  const toggleModal = () => {
    dispatch({
      type: ACTIONS.MODAL,
      payload: !state.modal,
    });
  };

  const setEditItemInfo = async (id) => {
    await getItemDetails(id);
    dispatch({
      type: ACTIONS.MODAL,
      payload: true,
    });
  };

  const getItemDetails = async (id) => {
    const { data } = await axios(`${ITEMS_API}/${id}`);
    dispatch({
      type: ACTIONS.GET_ITEM_DETAILS,
      payload: data,
    });
  };

  const saveEditedItem = async (id, editedItem) => {
    console.log(editedItem);
    if (
      editedItem?.creator?.length > 0 &&
      editedItem?.description?.length > 0 &&
      editedItem?.genre?.length > 0 &&
      editedItem?.image?.length > 0 &&
      editedItem?.name?.length > 0 &&
      editedItem?.rarity?.length > 0
    ) {
      if (Number(editedItem.price) >= 0) {
        const data = await axios.patch(`${ITEMS_API}/${id}`, editedItem);
        toggleModal();
        getItemsData();
      } else {
        alert("The price cannot be negative");
      }
    } else {
      alert("Fill all the fields");
    }
  };

  const toggleComment = async (id, editedItem) => {
    console.log(editedItem);
    const data = await axios.patch(`${ITEMS_API}/${id}`, editedItem);
    getItemsData();
  };

  const changeId = (id) => {
    dispatch({
      type: ACTIONS.CHANGE_ID,
      payload: id,
    });
    history.push(`/itemdetails/${id}`);
  };

  const changeGenre = async (selectedGenre) => {
    const { data } = await axios(ITEMS_API);
    console.log(data);
    let newData = data.filter((item) => item.genre == selectedGenre);
    dispatch({
      type: ACTIONS.GET_ITEMS_DATA,
      payload: newData,
    });
  };

  const toHome = () => {
    setIsAllItems(false);
    history.push("/itemslist");
  };

  const toItemsList = () => {
    setIsAllItems(true);
    history.push("/");
  };

  const deleteCartItem = async (id) => {
    const curUser = JSON.parse(localStorage.getItem("user"));
    const newCart = curUser.cart.filter((item) => item !== id);
    const newUser = { ...curUser, cart: newCart };
    localStorage.setItem("user", JSON.stringify(newUser));
    axios.patch(`${JSON_API_USERS}/${curUser.id}`, newUser);
  };

  const toInventory = async (id) => {
    const curUser = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios(JSON_API_USERS);

    if (buyNow > 0) {
      data.map((user) => {
        if (user.name === curUser.name) {
          const edittedUser = { ...user };
          edittedUser.inventory.push(buyNow);
          axios.patch(`${JSON_API_USERS}/${user.id}`, edittedUser);
          localStorage.setItem("user", JSON.stringify(edittedUser));
        }
      });
    } else {
      data.map((user) => {
        if (Array.isArray(id)) {
          id.map((cartItem) => {
            if (user.name === curUser.name) {
              const edittedUser = { ...user };
              edittedUser.inventory.push(cartItem);
              edittedUser.cart = [];
              axios.patch(`${JSON_API_USERS}/${user.id}`, edittedUser);
              localStorage.setItem("user", JSON.stringify(edittedUser));
            }
          });
        } else if (!Array.isArray(id) && user.name === curUser.name) {
          const edittedUser = { ...user };
          edittedUser.inventory.push(id);
          axios.patch(`${JSON_API_USERS}/${user.id}`, edittedUser);
          localStorage.setItem("user", JSON.stringify(edittedUser));
        }
      });
    }
  };

  const values = {
    toInventory,
    deleteCartItem,
    getItemsData,
    addNewItem,
    deleteItem,
    setEditItemInfo,
    toggleModal,
    getItemDetails,
    saveEditedItem,
    changeId,
    changeGenre,
    toggleComment,
    setIsAllItems,
    toHome,
    toItemsList,
    isAllItems,
    pages: state.pages,
    history,
    id: state.id,
    itemsData: state.itemsData,
    modal: state.modal,
    itemDetails: state.itemDetails,
  };
  return <itemContext.Provider value={values}>{children}</itemContext.Provider>;
};

export default ItemContextProvider;
