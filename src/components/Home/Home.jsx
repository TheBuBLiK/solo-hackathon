import React, { useEffect } from "react";

import CarouselSlide from "../CarouselSlide/CarouselSlide";
import { Link } from "react-router-dom";
import { useItems } from "../../contexts/ItemContext";
import EditItem from "../EditItem.jsx/EditItem";

import ItemsListPreview from "../ItemsListPreview/ItemsListPreview";

import { Container } from "@material-ui/core";
import { Button } from "bootstrap";
import FreeItems from "../FreeItems/FreeItems";
import ItemsList from "../ItemsList/ItemsList";
import Leftbar from "../Sidebar/Sidebar";

const Home = () => {
  const { modal } = useItems();
  return (
    <div style={{ display: "flex", backgroundColor: "#252550" }}>
      <Leftbar />

      <Container style={{ width: "100%" }}>
        <ItemsList />
      </Container>
    </div>
  );
};

export default Home;
