import { useModal } from "@/store/modal";
import React, { useState } from "react";
import OrderBy from "./OrderBy";
import SortBy from "./SortBy";
import NewCivilForm from "../Form/NewCivilForm";

const ActionContainer = ({ onChangeFilterManagement }) => {
  const { showModal } = useModal();

  const showCivilForm = () => {
    showModal(<NewCivilForm />);
  };
  return (
    <div className="flex justify-between">
      ActionContainer
      <div className="flex items-center justify-center gap-3">
        <OrderBy onChangeFilterManagement={onChangeFilterManagement} />
        <SortBy onChangeFilterManagement={onChangeFilterManagement} />
        <button onClick={showCivilForm}>SHOW</button>
      </div>
    </div>
  );
};

export default ActionContainer;
