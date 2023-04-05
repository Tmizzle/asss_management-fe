import React from "react";
import "./Popup.css";


type PopupProps = {
    handleClose: () => void;
    popupMessage: string;
  };
  
  const Popup = ({ handleClose, popupMessage }: PopupProps) => {
    return (
      <div className="popup">
        <div className="popup-content">
          <div className="popup-text">{popupMessage}</div>
          <button className="close-btn" onClick={handleClose}>
            X
          </button>
        </div>
      </div>
    );
  };
  
  export default Popup;