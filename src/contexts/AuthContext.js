import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";
import { ACTIONS, JSON_API_USERS } from "../helper/consts";

const authContext = createContext();
export const useAuth = () => useContext(authContext);

const INIT_STATE = {
  isOffline: true,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.AUTH_OFFLINE:
      return { ...state, isOffline: action.payload };
  }
};

const AuthContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [inpType, setInpType] = useState(false);
  const [typePass, setTypePass] = useState("password");
  const [exist, setExist] = useState(true);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({
      type: ACTIONS.AUTH_OFFLINE,
      state: true,
    });
    setExist(true);
  };

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const logged = JSON.parse(localStorage.getItem("user"));

  const login = async (e) => {
    const { data } = await axios(JSON_API_USERS);
    if (e.name == "" || e.password == "") {
      alert("Fill the fields");
      setExist(true);
      return;
    }
    await data.map((user) => {
      if (e.name == user.name && e.password == user.password) {
        if (!localStorage.getItem("user")) {
          localStorage.setItem("user", JSON.stringify([]));
        }
        e.id = user.id;
        e.isAdmin = user.isAdmin;
        e.cart = user.cart;
        e.inventory = user.inventory;
        e.nickname = user.nickname;
        localStorage.setItem("user", JSON.stringify(e));
        dispatch({
          type: ACTIONS.AUTH_OFFLINE,
          state: false,
        });
        setExist(true);
        setVisible(false);
        setInpType(false);
        history.push("/");
      } else {
        setExist(false);
      }
    });
  };

  const regUser = async (e) => {
    const { data } = await axios(JSON_API_USERS);
    await data.map((user) => {
      if (user.name === e.name) {
        e.name = "";
        alert("Such user exists");
        return;
      }
    });
    if (
      /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/gi.test(e.name) &&
      e.password === e.passwordSec
    ) {
      setExist(true);
      setVisible(false);
      setInpType(false);
      history.push("/login");
      axios.post(JSON_API_USERS, e);
    } else {
      alert("Something went wrong");
      return;
    }
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleTypePass = (e) => {
    if (e === false) {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
  };

  const handleInpType = () => {
    setInpType(!inpType);
    handleTypePass(inpType);
  };

  const value = {
    regUser,
    login,
    logout,
    isOffline: state.isOffline,
    logged,
    exist,
    visible,
    handleVisible,
    handleInpType,
    setVisible,
    setInpType,
    typePass,
    history,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
