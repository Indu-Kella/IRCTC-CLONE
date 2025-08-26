import "../Styles/AgentOtpModal.css";

function AgentOtpModal({ show, onClose }) {
    if (!show) return null;
    return (
        <div className="modalOverlay">
            <div className="modalContentOtp">
                <button className="modalCloseBtnOtp" onClick={onClose}>
                    &times;
                </button>
                <h1>Agent Login with Otp</h1>
                <h1>DC LOGIN</h1>
            </div>
        </div>
    )
}

export default AgentOtpModal;