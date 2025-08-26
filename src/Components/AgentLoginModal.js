import React from "react";
import "../Styles/AgentLoginModal.css";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import AgentOtpModal from "./AgentOtpModal";

function AgentLoginModal({ show, onClose }) {
  const [ShowAgentOtpLogin, setShowLoginModal] = useState(false);

  const closeModal = () => setShowLoginModal(false);
  if (!show) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContentAgent">
        <div>
          <div style={{ backgroundColor: 'navy', height: '40px', color: 'white' }}>
            <h3 style={{ padding: '10px' }}>Confirmation</h3>
          </div>
          <div style={{ marginLeft: '30px', borderBottom: ' solid 1px #ccc', padding: '20px', fontSize: '14px' }}>
            <p style={{ margin: '0px' }}>1.That I will not use IRCTC personal User ID to book tickets for my Customer.</p>
            <p style={{ margin: '0px' }}>2.That I will not overcharge the customer over and above the IRCTC Prescribed ticket fare.</p>
            <p style={{ margin: '0px' }}>3.That I will not alter the contents of ERS.</p>
            <p style={{ margin: '0px' }}>4.That I will abide by all the IRCTC Rules and Regulations and the Guidelines laid down for ticket booking/cancellations/refunds etc, by IRCTC/Ministry of Railways from time to time</p>
          </div>
          <button className="AgreeBtn" onClick={onClose}><FontAwesomeIcon icon={faCheck} />I Agree</button>
        </div>
        <AgentOtpModal show={ShowAgentOtpLogin} onClose={closeModal} />
      </div>
    </div>

  );
}

export default AgentLoginModal;

