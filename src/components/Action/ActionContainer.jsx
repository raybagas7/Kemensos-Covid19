import { useModal } from "@/store/modal";
import React from "react";
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
      <div className="flex w-full items-center justify-end gap-3 px-28 max-md:flex-col max-md:px-0">
        <div className="flex gap-3">
          <OrderBy onChangeFilterManagement={onChangeFilterManagement} />
          <SortBy onChangeFilterManagement={onChangeFilterManagement} />
        </div>
        <button onClick={showCivilForm}>SHOW</button>
      </div>
    </div>
  );
};

export default ActionContainer;
