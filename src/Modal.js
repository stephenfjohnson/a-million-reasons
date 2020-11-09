import React, { useContext } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { ModalContext } from "./ModalContext";

const Modal = () => {
  const { modalContent, handleModal, modal } = useContext(ModalContext);
  if (modal) {
    return ReactDOM.createPortal(
      <ModalStyle>
        <div>
          <button className="close" onClick={() => handleModal()}>
            &times;
          </button>
          {modalContent}
        </div>
      </ModalStyle>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;

const ModalStyle = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 2;
  button.close {
    background: transparent;
    color: white;
    border: 1px solid white;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    text-align: center;
  }
`;
