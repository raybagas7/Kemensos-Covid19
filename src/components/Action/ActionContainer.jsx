import { useModal } from "@/store/modal";
import React from "react";

const ActionContainer = () => {
  const { showModal } = useModal();

  const showCivilForm = () => {
    showModal(<div>test modal</div>);
  };
  return (
    <div>
      ActionContainer
      <button onClick={showCivilForm}>SHOW</button>
    </div>
  );
};

export default ActionContainer;
