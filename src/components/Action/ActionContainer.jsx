import { useModal } from "@/store/modal";
import React from "react";
import OrderBy from "./OrderBy";
import SortBy from "./SortBy";
import NewCivilForm from "../Form/NewCivilForm";
import { IoPersonAdd } from "react-icons/io5";

const ActionContainer = ({ onChangeFilterManagement }) => {
  const { showModal } = useModal();

  const showCivilForm = () => {
    showModal(<NewCivilForm />);
  };

  return (
    <div className="flex justify-between">
      <div className="flex w-full items-center justify-end gap-3 max-md:flex-col">
        <div className="flex gap-3">
          <OrderBy onChangeFilterManagement={onChangeFilterManagement} />
          <SortBy onChangeFilterManagement={onChangeFilterManagement} />
        </div>
        <button
          className="flex h-full items-center gap-1 rounded-full border-[1px] border-border px-3 text-xs hover:bg-primary hover:text-white max-md:py-1"
          onClick={showCivilForm}
        >
          Tambah Data Baru
          <IoPersonAdd className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ActionContainer;
