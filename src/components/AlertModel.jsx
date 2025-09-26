import React from "react";
import "./AlertModel.css";

const AlertModal = ({ message, type = "success", onClose }) => {
  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className={`alert-modal alert-${type}`} onClick={e => e.stopPropagation()}>
        <p>{message}</p>
        <button className="alert-close-btn" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default AlertModal;
