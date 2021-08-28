import React from "react";
import { useEffect } from "react";
import InventoryCard from "./InventoryCard";

const Inventory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ minHeight: "80vh", backgroundColor: "#252550" }}>
      <InventoryCard />
    </div>
  );
};

export default Inventory;
