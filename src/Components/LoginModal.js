import "../Styles/LoginModal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
const images = [
  "https://images.pexels.com/photos/4870581/pexels-photo-4870581.jpeg",
  "https://globeindia.in/wp-content/uploads/2016/06/The-Top-10-Things-to-Do-in-Bali-1.png"
]
function LoginModal({ show, onClose, setUser, onLoginSuccess }) {
  const [captchaInput, setCaptchaInput] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [randomImage, setRandomImage] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  const fetchCaptcha = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/captcha");
      setCaptchaImage(res.data.captchaImage);
      setCaptchaToken(res.data.captchaToken);
    } catch (err) {
      console.error("Error fetching captcha", err);
    }
  };
  useEffect(() => {
    if (show) {
      const randomIndex = Math.floor(Math.random() * images.length);
      setRandomImage(images[randomIndex]);
      fetchCaptcha();
    }
  }, [show]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5000/api/login',
        { username, password, captchaInput, captchaToken },
        { withCredentials: true }
      );

      console.log("Login response:", res.data);
      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      onLoginSuccess?.(res.data.user);
      window.dispatchEvent(new Event("loginSuccess"));
      onClose();

    } catch (err) {
      console.log("Axios error:", err);
      console.log("Response data:", err.response?.data?.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const refreshCaptcha = () => {
    fetchCaptcha();
    setCaptchaInput('');
  };
  if (!show) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="modalCloseBtn" onClick={onClose}>
          &times;
        </button>
        <div className="d-flex flex-row ">
          <div className="LoginContainer">
            <h3 className="LoginHeading">LOGIN</h3>

            <input type="text" placeholder="Username" className="form-control mb-2 LoginUsername" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className="form-control mb-1 LoginPassword" onChange={(e) => setPassword(e.target.value)} />

            <a href="#" className="ForgetLink">FORGET ACCOUNT DETAILS?</a>
            <img className="WaterImage" src="https://thumbs.dreamstime.com/b/water-harvesting-storage-iotbased-conservation-also-includes-systems-storing-rainwater-providing-farmers-320503304.jpg" />
            <div className="captcha-container mb-3" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {captchaImage && <img src={captchaImage} alt="captcha" />}
              <FontAwesomeIcon
                icon={faSyncAlt}
                onClick={refreshCaptcha}
                style={{ cursor: 'pointer' }}
                title="Refresh captcha"
                color="white"
              />
            </div>

            <input
              type="text"
              placeholder="Enter Captcha"
              className="form-control mb-3 EnterCaptcha"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
            <input
              type="checkbox"
              name="login"
              className="form-check-input checkboxInput"
              id="login"
            />
            <label className="form-check-label loginLabel" htmlFor="login">
              Login & Booking With OTP
            </label>

            <button className="SignInBtn w-100 mb-2" onClick={handleLogin}>SIGN IN</button>
            <div className="d-flex flex-row">
              <button className="RegisterBtn me-1"><Link to="/register" className="nav-link d-none d-md-block" >
                REGISTER
              </Link></button>

              <button className="RegisterBtn w-100">AGENT LOGIN</button>
            </div>

          </div>
          <div className="AddImageContainer d-none d-md-block">
            <img src={randomImage} className="AddImage" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;

