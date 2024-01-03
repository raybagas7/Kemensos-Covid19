import { useModal } from "@/store/modal";
import React from "react";
import OrderBy from "./OrderBy";
import SortBy from "./SortBy";

const ActionContainer = () => {
  const { showModal } = useModal();

  const showCivilForm = () => {
    showModal(<div>test modal</div>);
  };
  return (
    <div className="flex justify-between">
      ActionContainer
      <div className="flex items-center justify-center gap-3">
        <OrderBy />
        <SortBy />
        <button onClick={showCivilForm}>SHOW</button>
      </div>
    </div>
  );
};

export default ActionContainer;
