import "../Styles/HelpSupport.css";
import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
const HelpSupport = () => {
  const [captchaInput, setCaptchaInput] = useState('');
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
      fetchCaptcha();
    }
  , []);
  const refreshCaptcha = () => {
    fetchCaptcha();
    setCaptchaInput('');
  };
  return (
    <div className="MainHelpContainer">
      <div className="SubmitContainer">
        <h1 style={{ color: 'white', fontWeight: 'bold', paddingLeft: '30px' }}>Welcome To</h1>
        <h1 style={{ color: 'white', fontWeight: 'bold', paddingLeft: '30px' }}>eIRCTC-Query</h1>
        <div className="CredentialsContainer">
          <h2 style={{ color: 'darkorange', textAlign: 'center', paddingTop: '10px', fontWeight: 'bold' }}>Login</h2>
          <form>
            <input
              type="text"
              id="Email"
              placeholder="Enter your email"
              className="form-control mb-3 InputContainer"
              required
            />
            <div className="text-center mb-3">or</div>
            <input type="text"
              id="mobileNumber"
              className="form-control mb-3 InputContainer"
              style={{ borderColor: 'white', borderWidth: '1px', backgroundColor: 'transparent', color: 'white', width: '200px !important' }}

              placeholder="Enter mobile number"
              required />

            <div className="captchaContainerHelp mb-3" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             {captchaImage && <img src={captchaImage} alt="captcha" />}
              <FontAwesomeIcon
                icon={faSyncAlt}
                onClick={refreshCaptcha}
                style={{ cursor: 'pointer' }}
                title="Refresh captcha"
                color="blue"
              />
            </div>
            <input
              type="text"
              placeholder="Enter Captcha"
              className="form-control mb-3 InputContainer"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
            <div className="formButtons">
              <button type="submit" className="btn btn-primary w-100 mb-3" style={{ backgroundColor: 'darkorange', borderWidth: '0px' }}>Submit</button>
            </div>
          </form>
          <p>
            For swifter resolution of your query you may call our 24-hour Customer Care : 14646 / 080-35734999 / 080-44647999.
          </p>
        </div>
      </div>
    </div>

  )
}
export default HelpSupport;