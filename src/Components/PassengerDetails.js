import { useLocation } from 'react-router-dom';
import '../Styles/PassengerDetails.css'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { set } from 'mongoose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import AgentOtpModal from './AgentOtpModal';
import ContactUsModal from './ContactUsModal';
import axios from "axios";
import { Link } from 'react-router-dom';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube, faTelegram, faPinterest, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown, faPaperPlane, faLocationDot, faExchangeAlt, faCalendarDays, faSuitcase, faDove, faUser, } from '@fortawesome/free-solid-svg-icons';
import { FaChevronRight } from 'react-icons/fa';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import React, { forwardRef, useEffect, useRef } from "react";

function GridDropdowns() {
  const gridData = [

    ["Salient Features",
      "Ticket Cancellation Rules",
      "Foreign Tourist T&C",
      "Group Booking T&C",
      "Travel Insurance Claim Process"],
    ["Register",
      "Book E-ticket (PDF) (VIDEO)",
      "Book tatkal ticket",
      "Book Concession Tickets for Person With Disability",
      "Cancel E-ticket",
      "International User Registration Guide",
      "Change Boarding Point",
      "Link Your Aadhaar",
      "File TDR"],
    ["About"],
    ["Login Manual - from old", "site to new site",
      "Operating Manual for new", "e-ticketing website",
      "Operating Manual for Agent", "Interface Application"],
    ["More info",
      "FAQs",
      "Terms & Conditions",
      "Travel Insurance T&C",
      "FTR T&C",
      "Scheme for issue of waitlisted E-tickets",
      "Protect against fraudulent emails",
      "General Guideline for SUVIDHA trains",
      "Current booking Guidelines",
      "Forgo Senior Citizen Concession-FAQ",
      "Trains at a Glance",
      "Guidelines for Boarding Station change",
      "Guideline for PASS Booking"],

    ["IRCTC Rail Connect (Android)",
      "IRCTC Rail Connect (iOS)",
      "IRCTC Order Food (Android)",
      "IRCTC Order Food (IOS)",
      "IRCTC Tourism App",
      "IRCTC Air App (Android)",
      "IRCTC Air App (IOS)",
      "IRCTC iMudra (Android)"
    ],
    ["IRCTC SBI Loyalty Program", "IRCTC BOB Loyalty Program", "IRCTC HDFC Loyalty Program", "IRCTC RBL Loyalty Program"],
    ["IRCTC Android App - IRCTC Rail Connect",
      "ClearTrip",
      "Airtel",
      "Amazon India - Shop & Pay",
      "Confirmtkt",
      "EaseMyTrip Flight, Hotel, Train",
      "Google Pay",
      "Goibibo",
      "MakeMyTrip",
      "Ixigo Trains",
      "Ixigo Flights",
      "PayTM",
      "JustDial",
      "redRail",
      "redBus",
      "Railofy",
      "Railyatri",
      "Trainman",
      "SBI YONO",
      "Yatra",
      "udChalo",
      "Kotak",
      "ICICI",
      "HDFC PayZapp",
      "Tripozo"
    ],
    ["Bank Transaction Charges",
      "Women Sr. Citizen Concession",
      "VIKALP Scheme",
      "Travel Insurance (Incl. of GST)",
      "Browser Settings"],
    ["IRCTC Marketing Statistics",
      "Banner-Advertisement",
      "Advertisement Terms & Conditions"],
    ["RCTC-iPAY (PDF) (VIDEO)",
      "AutoPay"],
    ["Agents & Principal Service Providers", "Policies for Reserved e-Ticketing", "Payment Integration Policies for Reserved e-Ticketing"],
    ["IRCTC Authorized Service Providers",
      "Digital Certificate Generation Process",
      "Blacklist Agent",
      "Find NgeT Agents",
      "Rules and Regulations for the Agents"],
    ["Ticket Cancellation & Refund Rules",
      "Gazette: Cancellation of Ticket and Refund Rules 2015 Refund Rule of Suvidha"],
    ["Jago yatri jago",
      "Jansankhya Sthirata Kosh",
      "Maharaja's Express"],
    ["Services of Ask Disha ChatBot",
      "Features of Ask Disha ChatBot"],
    ["Reservation Enquiries",
      "PNR Enquiry",
      "Train Enquiry",
      "Train/Fare Accommodation",
      "Train Between Important Stations",
      "Railway Enquiry-139"],
    ["Facilities for Person With Disability Users",
      "Facilities for Visually Impaired Users",
      "User Guide: Person With Disability Booking"],
    ["User Guide",
      "Terms & Conditions"],
    ["Awards & Achievements"],
  ];
  const titles = [
    "IRCTC Trains",
    "How To",
    "IRCTC eWallet",
    "For Newly Migrated Agents",
    "General Information",
    "IRCTC Official App",
    "IRCTC Co-branded Card Benefits",
    "Mobile Zone",
    "Important Information",
    "Advertise with us",
    "IRCTC-iPAY Payment Gateway",
    "Policies",
    "Agents",
    "Refund Rules",
    "IRCTC Zone",
    "Ask Disha ChatBot",
    "Enquiries",
    "Person With Disability Facilities",
    "DMRC Ticket Booking at IRCTC",
    "About us"
  ];

  const columns = [[], [], [], []];
  gridData.forEach((item, index) => {
    columns[index % 4].push({ title: titles[index], items: item });
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      padding: '20px'
    }}>
      {columns.map((colItems, colIndex) => (
        <div key={colIndex} style={{ flex: '1' }}>
          {colItems.map((dropdown, index) => (
            <Dropdown key={index} title={dropdown.title} items={dropdown.items} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Dropdown({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div style={{ padding: '10px' }}>
      <button
        onClick={toggleDropdown}
        className='dropdownElements'
        style={{ width: '100%' }}
      >
        {title}
        <FontAwesomeIcon icon={faCaretDown} style={{ color: '#ffffff' }} />

      </button>

      <div className={`dropdownContent ${isOpen ? "show" : ""}`}>
        {items.map((item, i) => (
          <a key={i}>
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
function NavItemWithDropdown({ title, dropdownItems }) {
  const [isOpen, setOpen] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 768);
  const [openSubIndex, setOpenSubIndex] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen(prev => !prev);

  const toggleSubmenu = (index) => {
    setOpenSubIndex(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < 768);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setOpenSubIndex(null);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="nav-link dropdown-toggle-btn"
        style={{
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left'
        }}
      >
        {title}
        <span className="dropdown-icon" style={{ marginLeft: '5px' }}>
          <FontAwesomeIcon icon={faCaretDown} size="sm" />
        </span>
      </button>

      {isOpen && (
        isSmallDevice ? (
          <ul
            className={`dropdownContent ${isOpen ? 'show' : ''}`}
            style={{
              margin: 0,
              padding: '10px 0',
              listStyle: 'none',
              backgroundColor: 'white'
            }}
          >
            {dropdownItems.map((item, index) => (
              <li
                key={index}
                style={{
                  padding: '1px 5px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{item.label}</span>
                  {item.subItems && (
                    <FaChevronRight size={10} onClick={() => toggleSubmenu(index)} />
                  )}
                </div>
                {openSubIndex === index && item.subItems && (
                  <ul style={{ paddingLeft: '15px', marginTop: '5px' }}>
                    {item.subItems.map((sub, subIndex) => (
                      <li key={subIndex} style={{ padding: '3px 0' }}>{sub}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              zIndex: 1000,
              minWidth: '200px',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderBottom: '6px solid orange',
              }}
              className='d-none d-md-block'
            ></div>

            <ul
              className={`dropdownContent ${isOpen ? 'show' : ''}`}
              style={{ margin: 0, padding: '10px 0', listStyle: 'none' }}
            >
              {dropdownItems.map((item, index) => (
                <li
                  key={index}
                  style={{
                    padding: '5px 15px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f2f2f2')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                  <span>{item.label}</span>
                  {item.subItems && (
                    <FaChevronRight size={10} onClick={() => toggleSubmenu(index)} />
                  )}
                  {openSubIndex === index && item.subItems && (
                    <ul style={{
                      position: 'absolute',
                      top: `${index * 36}px`,
                      left: '100%',
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      margin: 0,
                      padding: '5px',
                      listStyle: 'none',
                      minWidth: '150px',
                    }}>
                      {item.subItems.map((sub, subIndex) => (
                        <li key={subIndex} style={{ padding: '5px 10px' }}>{sub}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}
const PassengerDetails = () => {

  function DateInFormate(date) {
    const dateParts = date?.split('/');
    const jsDate = dateParts ? new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`) : null;

    const formattedDate = jsDate
      ? jsDate.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
      })
      : '';
    return formattedDate;
  }

  const location = useLocation();
  const [passengers, setPassengers] = useState([
    { name: '', age: '', gender: '', mobile: '' }
  ]);
  const [showOtherPreferences, setShowOtherPreferences] = useState(true);
  const [contactMobile, setContactMobile] = useState("");
  const [currentPage, setCurrentPage] = useState("PassengerDetails");
  const [pageColor2, setPageColor2] = useState('');
  const [pageColor3, setPageColor3] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAgentLoginModal, setShowAgentLoginModal] = useState(false);
  const [showAgentOtpModal, setShowAgentOtpModal] = useState(false);
  const [showContactUsModal, setShowContactUsModal] = useState(false);
  const [dynamicTime, setDynamicTime] = useState(getFormattedTime());
  const openModal = () => setShowLoginModal(true);
  const closeModal = () => setShowLoginModal(false);

  const openAgentModal = () => setShowAgentLoginModal(true);
  const closeAgentModal = () => setShowAgentLoginModal(false);

  const openAgentOtpModal = () => setShowAgentOtpModal(true);
  const closeAgentOtpModal = () => setShowAgentOtpModal(false);

  const openContactUsModal = () => setShowContactUsModal(true);
  const closeContactUsModal = () => setShowContactUsModal(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (currentPage === "ReviewDetails") {
      fetchCaptcha();
    }
  }, [currentPage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/check-login", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.loggedIn) {
            setUser(data.user);

          }
        });
    }
  }, []);
  const state = location.state;


  if (!state) {
    return <p>No train data found. Please go back and select a train.</p>;
  }

  const { train, berth } = state;
  console.log("TrainDetails :", train);
  console.log("BerthDetails :", berth);
  const { trainName, trainNumber, fromStation, toStation, departureTime, arrivalTime, arrivalDate, departureDate, berths, from, to } = train;
  const DepatureformattedDate = DateInFormate(departureDate);
  const ArrivalformattedDate = DateInFormate(arrivalDate);
  const closePassengerDetailsContainer = (index) => {
    setPassengers(prev =>
      prev.filter((_, i) => i !== index)
    );
  }
  function getFormattedTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  const openPassengerDetailsContainer = () => {
    setPassengers(prev => [...prev, { name: '', age: '', gender: '', mobile: '' }]);
  }

  const onOtherPreferences = () => {
    setShowOtherPreferences(prev => {
      const newVal = !prev;

      return newVal;
    });
  };


  const handlePassengerChange = (index, e) => {
    const updated = [...passengers];
    updated[index][e.target.name] = e.target.value;
    setPassengers(updated);
  }

  const fetchCaptcha = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/captcha");
      setCaptchaImage(res.data.captchaImage);
      setCaptchaToken(res.data.captchaToken);
    } catch (err) {
      console.error("Error fetching captcha", err);
    }
  };
  const refreshCaptcha = () => {
    fetchCaptcha();
    setCaptchaInput('');
  };


  const handleSubmitPassengerDetails = async (e) => {
    e.preventDefault()

    let newErrors = passengers.map((p) => {
      let err = {};
      if (!p.name.trim()) err.name = "Name is required";
      if (!p.age.trim()) err.age = "Age is required";
      else if (isNaN(p.age) || p.age <= 0) err.age = "Enter valid age";
      if (!p.gender || p.gender === "Gender") err.gender = "Gender is required";
      return err;
    });

    setErrors(newErrors);


    const hasError = newErrors.some(
      (err) => Object.keys(err).length > 0
    );

    if (hasError) return;


    if (!contactMobile.trim()) {
      alert("Contact number is required");
      return;
    }
    if (currentPage == "PassengerDetails") {
      setCurrentPage("ReviewDetails");
      setPageColor2('Orange');
    }

    setPassengers(prev => prev.map(p => ({ ...p, mobile: contactMobile })));
  }

  const handleSubmit = async () => {
    fetchCaptcha();
    if (!captchaInput || captchaInput.trim() === "") {
      alert("Enter Captcha");
      return;
    }
    const response = await fetch("http://localhost:5000/api/verify-captcha", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ captchaInput, captchaToken }),
    });
    const data = await response.json();


    if (!data.success) {
      alert("Captcha is invalid");
      return;
    }
    setCurrentPage("Payment");
    setPageColor3('Orange');

  }

  const handleBackButton = () => {
    if (currentPage == "Payment") {
      setCurrentPage("ReviewDetails");
      setPageColor3('');
    }
    else if (currentPage == "ReviewDetails") {
      setCurrentPage('PassengerDetails');
      setPageColor2('');
    }
    else {
      navigate(-1);
    }
  }


  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleString('en-US', { month: 'short' }).toLowerCase();
  const year = now.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const handleBookButton = async () => {
    console.log("Pay Button Clicked")
    const trainNumber = (train.trainNumber).toString();
    const berthType = berth.type;

    const bookingPassengers = passengers.map(p => ({
      name: p.name,
      age: p.age,
      gender: p.gender,
      mobile: contactMobile,
      berthType: berthType
    }));

    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/book-seat/${trainNumber}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ berthType, departureDate, passengers: bookingPassengers })
    });
    const data = await res.json();
    if (res.ok) {
      alert("Tickets booked successfully!");
      console.log(data.bookedPassengers);
    } else {
      alert(data.message);
    }
  };

  const handleLogout = () => {
    navigate(-1);
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };
  const PassengerItem = (props) => {
    const { index } = props;


    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottom: "solid 1px #ccc",
          marginBottom: "10px",
          paddingBottom: "10px",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              placeholder="name"
              type="text"
              style={{ height: "35px", width: "150px" }}
              name="name"
              value={passengers[index].name}
              onChange={(e) => handlePassengerChange(index, e)}
            />
            {errors[index]?.name && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors[index].name}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              placeholder="age"
              type="text"
              style={{ height: "35px", width: "60px" }}
              name="age"
              value={passengers[index].age}
              onChange={(e) => handlePassengerChange(index, e)}
            />
            {errors[index]?.age && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors[index].age}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <select
              style={{ height: "35px", width: "160px" }}
              name="gender"
              value={passengers[index].gender}
              onChange={(e) => handlePassengerChange(index, e)}
            >
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Transgender</option>
            </select>
            {errors[index]?.gender && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors[index].gender}
              </span>
            )}
          </div>

          <select style={{ height: "35px", width: "200px" }}>
            <option>India</option>
            <option>Russia</option>
            <option>America</option>
          </select>

          <select style={{ height: "35px", width: "210px" }}>
            <option>Lower</option>
            <option>Upper</option>
            <option>Middle</option>
            <option>SideUpper</option>
            <option>SideLower</option>
          </select>

          <select style={{ height: "35px", width: "205px" }}>
            <option>Catering Service Option*</option>
            <option>Veg</option>
            <option>Non veg</option>
            <option>Jain meal</option>
            <option>Veg (Diabetic)</option>
            <option>Non veg (Diabetic)</option>
            <option>No Food</option>
          </select>
        </div>

        <button
          onClick={() => closePassengerDetailsContainer(index)}
          style={{
            height: "25px",
            width: "25px",
            marginLeft: "10px",
            textAlign: "center",
            fontWeight: "bold",
            color: "grey",
            borderWidth: "0px",
          }}
        >
          X
        </button>
      </div>
    );

  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-white fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler navButton"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
            <span>IRCTC</span>
          </button>
          <div className="d-flex ms-auto">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="me-2 d-block d-md-none"
            >
              <FontAwesomeIcon icon={faBell} style={{ color: "#ffffff" }} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="d-block d-md-none"
            >
              <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />
            </a>
          </div>
          <img
            src="https://5.imimg.com/data5/SELLER/Default/2021/2/GI/JR/US/4184318/irctc-agentship-provider-500x500.png"
            className="IndianRailway d-none d-md-block"
            alt="IRCTC"
          />
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >


            <div className="offcanvas-body">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-wrap w-100 sections">

                <li className="nav-item me-3">



                </li>
                <li className="nav-item me-2 d-flex align-items-center">
                  <button className='d-none d-md-block'
                    style={{ backgroundColor: 'navy', color: 'white', fontWeight: 'bold', borderWidth: '0px' }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <span className="nav-link d-none d-md-block fw-bold text-primary">
                    Welcome {user?.fullName}({user?.username})
                  </span>

                </li>
                <li className="nav-item me-3">
                  <a className="nav-link d-none d-md-block" href="#" onClick={(e) => {
                    e.preventDefault();
                    openContactUsModal();
                  }}>
                    CONTACT US
                  </a>
                </li>
                <li className="nav-item me-2">
                  <Link to="/helpSupport" className="nav-link d-none d-md-block" >
                    HELP & SUPPORT
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <a className="nav-link d-none d-md-block" href="#">
                    DAILY DEALS
                  </a>
                </li>
                <li className="nav-item me-2">

                  <Link to="/alert" className="nav-link d-none d-md-block" >
                    ALERTS
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <a className="nav-link me-0 d-none d-md-block" href="#">
                    {formattedDate}[{dynamicTime}]
                  </a>
                </li>
                <li className="nav-item me-3 d-none d-md-block">
                  <button className="sizeButtons">
                    A<sup>-</sup>
                  </button>
                  <button className="sizeButtons">A</button>
                  <button className="sizeButtons">
                    A<sup>+</sup>
                  </button>
                </li>
                <li className="nav-item me-3 mt-1">
                  <a className="nav-link d-none d-md-block" href="#">
                    हिंदी
                  </a>
                </li>
                <li className="d-block d-md-none" style={{ marginTop: 0 }}>
                  <div
                    className="loginContainer d-block d-md-none"
                    style={{ marginTop: 0 }}
                  >
                    <div className="nav-item login" style={{ marginTop: 0 }}>
                      <button
                        style={{ backgroundColor: 'navy', color: 'white', fontWeight: 'bold', borderWidth: '0px' }}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                      <span className="nav-link d-none d-md-block fw-bold text-primary">
                        Welcome {user?.fullName}({user?.username})
                      </span>
                    </div>
                    <div className="nav-item date" style={{ marginTop: 0 }}>
                      <a
                        className="nav-link me-0"
                        href="#"
                        style={{ marginTop: 0 }}
                      >
                        {formattedDate}[{dynamicTime}]
                      </a>
                    </div>
                  </div>
                </li>
                <div className="SecondContainer navbar-collapse-scroll">
                  <Link to="/" className="nav-link d-none d-md-block" >
                    <FontAwesomeIcon
                      icon={faHome}
                      style={{
                        color: "#808080",
                        verticalAlign: "bottom",
                        marginLeft: "60px",
                      }}

                    />
                  </Link>

                  <li className="nav-item irctcExclusive borderBottom">

                    <NavItemWithDropdown
                      title="IRCTC EXCLUSIVE"
                      dropdownItems={[
                        {
                          label: (

                            <a
                              href="https://contents.irctc.co.in/en/irctc_ipay_english.pdf"
                              target="_blank"
                              rel="noopener noreferrer"

                              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>
                              <img
                                src="data:image/png;base64,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" style={{ width: '25px', height: '30px' }}
                              />
                              IRCTC-iPAY
                            </a>
                          ),
                        },
                        {
                          label: (
                            <a
                              href="https://contents.irctc.co.in/en/irctc_ipay_english.pdf"
                              target="_blank"
                              rel="noopener noreferrer"

                              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>
                              <img style={{ width: '25px', height: '30px' }} src='data:image/png;base64,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'
                              /> SHOPPING
                            </a>
                          ),
                        },
                        {
                          label: (
                            <a
                              href="https://contents.irctc.co.in/en/irctc_ipay_english.pdf"
                              target="_blank"
                              rel="noopener noreferrer"

                              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}>
                              <img style={{ width: '25px', height: '30px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7Q00YUCW3ClLwiWCKIQXYVHiKue6zy2aNw&s"
                              /> GIFT CARD
                            </a>
                          ),
                        },
                      ]}
                    />


                  </li>
                  <hr className="borderBottom d-md-none mt-2 mb-0 ms-3 w-80" />
                  <li className="nav-item borderBottom">
                    <NavItemWithDropdown
                      title="TRAINS"
                      dropdownItems={[
                        { label: "Book Tickets" },
                        { label: "Foreign Tourist Booking" },
                        { label: "Connecting Journey Booking" },
                        { label: "IRCTC Trains", subItems: ["Veg", "Non-Veg"] },
                        { label: "Cancel Ticket", subItems: ["Veg", "Non-Veg"] },
                        { label: "PNR Qurey" },
                        { label: "Train Schedule" },
                        { label: "Track your train" },
                        { lable: "FTR Train/Coach Booking" },
                        { label: "Dogs/Cats Booking" }
                      ]

                      }
                    />
                  </li>

                  <li className="nav-item borderBottom">
                    <NavItemWithDropdown
                      title="LOYALTY"
                      dropdownItems={["Book Tickets", "Train Status"]}
                    />
                  </li>

                  <li className="nav-item irctcWallet borderBottom">
                    <NavItemWithDropdown
                      title="IRCTC eWallet"
                      dropdownItems={["Book Tickets", "Train Status"]}
                    />
                  </li>

                  <li className="nav-item borderBottom">
                    <a className="nav-link" href="#">
                      BUSES
                    </a>
                  </li>
                  <li className="nav-item borderBottom">
                    <a className="nav-link" href="#">
                      FLIGHTS
                    </a>
                  </li>
                  <li className="nav-item borderBottom">
                    <a className="nav-link" href="#">
                      HOTELS
                    </a>
                  </li>

                  <li className="nav-item borderBottom">
                    <NavItemWithDropdown
                      title="HOLIDAYS"
                      dropdownItems={["Book Tickets", "Train Status"]}
                    />
                  </li>

                  <li className="nav-item borderBottom">
                    <NavItemWithDropdown
                      title="MEALS"
                      dropdownItems={["Book Tickets", "Train Status"]}
                    />
                  </li>

                  <li className="nav-item borderBottom">
                    <NavItemWithDropdown
                      title="PROMOTIONS"
                      dropdownItems={["Book Tickets", "Train Status"]}
                    />
                  </li>

                  <li className="nav-item borderBottom">
                    <NavItemWithDropdown
                      title="MORE"
                      dropdownItems={["Book Tickets", "Train Status"]}
                    />
                  </li>

                  <li className="nav-item me-2 borderBottom">
                    <a className="nav-link d-block d-md-none" href="#" onClick={(e) => {
                      e.preventDefault();
                      openAgentModal();
                    }}>
                      AGENT LOGIN
                    </a>
                  </li>
                  <li className="nav-item me-3 borderBottom">
                    <a className="nav-link d-block d-md-none" href="#" onClick={(e) => {
                      e.preventDefault();
                      openContactUsModal();
                    }}>
                      CONTACT US
                    </a>
                  </li>
                  <li className="nav-item me-2 borderBottom">
                    <a className="nav-link d-block d-md-none" href="#">
                      DAILY DEALS
                    </a>
                  </li>
                  <li className="nav-item me-3 mt-1 borderBottom">
                    <a className="nav-link d-block d-md-none" href="#">
                      हिंदी
                    </a>
                  </li>
                </div>
              </ul>
              <img
                src="https://images.seeklogo.com/logo-png/18/2/irctc-logo-png_seeklogo-184098.png"
                className="Logo d-none d-md-block"
                alt="IRCTC Logo"
              />
            </div>
          </div>
        </div>
      </nav>
      <AgentOtpModal show={showAgentOtpModal} onClose={closeAgentOtpModal} />
      <ContactUsModal show={showContactUsModal} onClose={closeContactUsModal} />
      <div className='PassengerMain'>
        <div className="d-none d-md-flex" style={{ display: 'flex', flexDirection: 'row', paddingLeft: '20%', marginTop: '20px', marginBottom: '10px' }}>
          <div className='PageNumberDetails' style={{ backgroundColor: 'orange' }}> 1</div>
          <p style={{ marginTop: '5px' }}>______________________________________</p>
          <div className='PageNumberDetails' style={{ backgroundColor: pageColor2 }}> 2</div>
          <p style={{ marginTop: '5px' }}>______________________________________</p>
          <div className='PageNumberDetails' style={{ backgroundColor: pageColor3 }}>3</div>

        </div>
        <div className="d-none d-md-flex" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '18%', marginRight: '18%' }}>
          <p>Passenger Details</p>
          <p>Review Journey</p>
          <p>Payment</p>
        </div>
        {currentPage === "PassengerDetails" && <div className='MainPassengerDetailsContainer'>
          <div className='PassengerDetailsContainer'>
            <div style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#ccc', marginBottom: '10px' }}>
              <div className='TrainName'> <h5 style={{ fontWeight: 'bold' }}>{trainName}({trainNumber})</h5></div>
              <div>  <h6 style={{ paddingLeft: '10px', marginTop: '20px', marginBottom: '20px' }}>
                <span style={{ fontWeight: 'bold', paddingRight: '10px' }}>{departureTime}</span>|<span style={{ paddingLeft: '10px' }}>{fromStation}</span><span style={{ marginLeft: '12%', marginRight: '12%' }}>
                  ----------</span>
                <span style={{ fontWeight: 'bold', paddingRight: '10px' }}>{arrivalTime}</span>|
                <span style={{ paddingLeft: '10px' }}>{toStation}</span></h6></div>
              <div style={{ marginLeft: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: '33%' }}>
                <p>{DepatureformattedDate}</p>
                <p>{ArrivalformattedDate}</p>
              </div>
              <h5 style={{ marginLeft: '30%', fontWeight: 'bold' }}>{berth.type}</h5>
              <h6 style={{ paddingLeft: '10px' }}>Please check <span style={{ color: 'blue' }}>NTES website</span> or <span style={{ color: 'blue' }}>NTES app</span> for actual time before boarding</h6>
            </div>
            <form onSubmit={handleSubmitPassengerDetails}>
              <div>
                <div style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#ccc', marginBottom: '10px', padding: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h5>IRCTC Co-branded Card Benefits</h5>
                    <input type='radio' style={{ marginBottom: '8px', marginLeft: '7%', marginRight: '1%' }} name='Card' />
                    <label>Earn Loyality Points</label>
                    <input type='radio' style={{ marginBottom: '8px', marginLeft: '7%', marginRight: '1%' }} name='Card' />
                    <label>Pay WIth Loyality Points</label>
                    <input type='radio' style={{ marginBottom: '8px', marginLeft: '7%', marginRight: '1%' }} name='Card' />
                    <label>Skip</label>
                  </div>
                  <div style={{ marginLeft: '15px' }}>
                    <p>( Pay Less, Earn More: 1% PG Waiver + upto 10% Reward Points )</p>
                  </div>
                </div>

                <div style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#ccc', marginBottom: '10px' }}>
                  <div style={{ backgroundColor: 'pink', fontSize: '14px', paddingTop: '15px', paddingBottom: '2px', fontWeight: 'bold', borderLeft: 'solid 10px Orange', marginBottom: '10px' }}>
                    <ul>

                      <li>Note:Please submit full name of the passengers instead of initials</li>
                      <li>Note: The ID card will be required during journey</li>
                    </ul>
                  </div>

                  <h4 style={{ fontWeight: 'bold', margin: '10px' }}>Passenger Details</h4>
                  <div style={{ margin: '10px' }}>

                    {passengers.map((p, index) => (
                      <PassengerItem key={index} index={index} />
                    ))}
                  </div>
                  <button onClick={openPassengerDetailsContainer} type='button' style={{ color: 'navy', borderWidth: '0px', backgroundColor: 'white', fontWeight: 'bold', marginTop: '20px' }}>+Add Passender/Add infant with berth</button>
                  <button style={{ color: 'navy', borderWidth: '0px', backgroundColor: 'white', fontWeight: 'bold', marginLeft: '40%', marginTop: '20px' }}>+Add infant without berth</button>
                  <p style={{ marginLeft: '6%', marginTop: '10px' }}>*Children under 5 years of age shall be carried free and no purchase of any ticket is required. (If no separate berth is opted.)</p>
                </div>
              </div>
              <div style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#ccc', padding: '10px', marginBottom: '10px' }}>
                <h4 style={{ fontWeight: 'bold' }}>Contact Details</h4>

                <p style={{ fontWeight: 'bold' }}>(Ticket details will be sent to your email and your registered mobile number)</p>

                <div className='MobileContainer'>
                  <p style={{ width: '18%', marginLeft: '7%', marginTop: '6px' }}>91</p><input type="text" style={{ borderWidth: '0px', width: '82%', paddingLeft: '10%' }} name='mobile' value={contactMobile} onChange={(e) => setContactMobile(e.target.value)} />
                </div>
              </div>
              <div style={{ backgroundColor: '#e6e8eb', borderWidth: '1px', borderStyle: 'solid', borderColor: '#ccc', paddingTop: '15px', paddingBottom: '15px', marginBottom: '10px', paddingLeft: '3%' }}>
                <div className='GstContainer'>
                  <p style={{ width: '50%', fontWeight: 'bold', marginTop: '8px', marginLeft: '0%' }}>GST Details(Optional)</p><input type='text' placeholder="GST Identification Number(GSTIN)" style={{ width: '60%' }} />
                </div>
              </div>
              <div>
                <div style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#ccc', padding: '10px', marginBottom: '10px', backgroundColor: '#e6e8eb' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <h4 style={{ fontWeight: 'bold' }}>Other Preferences</h4>
                    <button onClick={onOtherPreferences} type='button' style={{ height: '25px', width: '25px', borderWidth: '0px' }}>
                      <span style={{ display: 'inline-block', transform: showOtherPreferences ? 'rotate(0deg)' : 'rotate(180deg)', fontSize: '20px' }}  > ^  </span></button>
                  </div>
                  {showOtherPreferences &&
                    <div>
                      <label style={{ marginRight: '30%', marginBottom: '20px', fontSize: '18px' }}><input type='checkbox' style={{ marginRight: '2px' }} />Consider for auto upgradation</label>
                      <label style={{ fontSize: '18px', marginBottom: '20px' }}><input type='checkbox' style={{ marginRight: '2px' }} />Book only if confirm berths are alloted</label>
                      <select style={{ width: '50%', height: '40px', marginRight: '30%', marginBottom: '10px' }}>
                        <option>Reservation Choice</option>
                        <option>Book,only if one lower berth is alloted</option>
                      </select>
                      <input placeholder='Prefered Coach number' style={{ width: '50%', height: '40px', marginBottom: '10px' }} />
                      <p><span style={{ fontWeight: 'bold', fontSize: '20px' }}>Travel Insurance (Incl. of GST)</span>Do you want to take Travel Insurance (₹0.45/person)?</p>
                      <label style={{ marginRight: '20%' }}><input type='radio' name='insurance' /> Yes, and I accept the terms & conditions</label>
                      <label><input type='radio' name='insurance' /> No, I don't want travel insurance </label>
                    </div>
                  }
                </div>

              </div>
              <div style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#ccc', padding: '10px', marginBottom: '40px' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Payment Mode</h4>
                <label style={{ marginRight: '20%', fontWeight: 'bold' }}><input type="radio" />Pay through Credit & Debit Cards / Net Banking / Wallets / EMI / Rewards and Others</label>
                <label style={{ marginRight: '70%', fontSize: '15px', marginLeft: '20px', marginBottom: '20px' }}>Convenience Fee: ₹30/- + GST</label>
                <label style={{ marginRight: '70%', fontWeight: 'bold' }}><input type="radio" />Pay through BHIM/UPI</label>
                <label style={{ fontSize: '15px', marginLeft: '20px' }}>Convenience Fee: ₹20/- + GST</label>
              </div>
              <div>
                <button style={{ width: '60px', height: '40px', marginRight: '20px', borderWidth: '1px', borderColor: 'grey' }} type='button' onClick={handleBackButton}>Back</button>
                <button style={{ width: '110px', height: '40px', borderWidth: '0px', backgroundColor: 'darkorange', borderRadius: '10px' }} type='Submit'>Continue</button>
              </div>
            </form>
          </div>
          <div className='FareContainer d-none d-md-block'>
            <div style={{ backgroundColor: '#e6e8eb', height: '50px', textAlign: 'center' }}><p style={{ fontSize: '20px', fontWeight: 'bold', paddingTop: '10px' }}>Fare Summary</p></div>
            <div style={{ height: '50px' }}><p style={{ fontSize: '17px', textAlign: 'center', paddingTop: '8px' }}>Ticket Fare <span style={{ fontWeight: 'bold', marginLeft: '40%' }}>₹ {berth.price}</span></p></div>
            <div style={{ backgroundColor: 'navy', color: 'white', height: '50px', textAlign: 'center', paddingTop: '8px' }} ><p style={{ fontSize: '17px' }}>Ticket Fare <span style={{ fontWeight: 'bold', marginLeft: '40%' }}>₹ {berth.price}</span></p></div>
          </div>
        </div>
        }
        {currentPage === "ReviewDetails" &&
          <div className='MainPassengerDetailsContainer'>
            <div className='PassengerDetailsContainer'>
              <div style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#ccc', marginBottom: '10px' }}>
                <div className='TrainName'> <h5 style={{ fontWeight: 'bold' }}>{trainName}({trainNumber})</h5></div>
                <div>
                  <h6 style={{ paddingLeft: '10px', marginTop: '20px', marginBottom: '20px' }}>
                    <span style={{ fontWeight: 'bold', paddingRight: '10px' }}>{departureTime}</span>|<span style={{ paddingLeft: '10px' }}>{fromStation}</span><span style={{ marginLeft: '12%', marginRight: '12%' }}>
                      ----------</span>
                    <span style={{ fontWeight: 'bold', paddingRight: '10px' }}>{arrivalTime}</span>|
                    <span style={{ paddingLeft: '10px' }}>{toStation}</span><span style={{ marginLeft: '10%', color: 'green', fontWeight: 'bold' }}>AVAILABLE - {berth.available}</span> </h6></div>
                <div style={{ marginLeft: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: '35%' }}>
                  <p>{DepatureformattedDate}</p>
                  <p>{ArrivalformattedDate}</p>
                </div>
                <h6 style={{ paddingLeft: '10px' }}>Please check <span style={{ color: 'blue' }}>NTES website</span> or <span style={{ color: 'blue' }}>NTES app</span> for actual time before boarding</h6>

              </div>

              <div>
                <div style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#ccc', marginBottom: '10px' }}>
                  <div className='TrainName'> <h5 style={{ fontWeight: 'bold' }}>Passenger Details</h5></div>
                  {passengers.map((eachpassenger, index) =>
                  (
                    <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '10px' }}>
                      <h5 style={{ marginRight: '20px' }}>{index + 1}</h5>
                      <h5 style={{ fontWeight: 'bold', marginRight: '20px' }}>{eachpassenger.name}</h5>
                      <p style={{ marginRight: '10px' }}>{eachpassenger.age}yrs<span style={{ marginLeft: '5px', marginRight: '5px' }}>|</span></p>
                      <p>{eachpassenger.gender}</p>

                    </div>
                  )
                  )}
                  <p>Your ticket will be sent to your email or your mobile {contactMobile}</p>
                </div>
              </div>
              <div style={{ width: '35%', alignItems: 'center', marginLeft: '40%' }}>
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
              </div>
              <div>
                <button style={{ width: '60px', height: '40px', marginRight: '20px', borderWidth: '1px', borderColor: 'grey' }} onClick={handleBackButton}>Back</button>
                <button style={{ width: '110px', height: '40px', borderWidth: '0px', backgroundColor: 'darkorange', borderRadius: '10px' }} onClick={handleSubmit}>Continue</button>
              </div>
            </div>
            <div className='FareContainer'>
              <div style={{ backgroundColor: '#e6e8eb', height: '50px', textAlign: 'center' }}><p style={{ fontSize: '20px', fontWeight: 'bold', paddingTop: '10px' }}>Fare Summary</p></div>
              <div style={{ height: '50px' }}><p style={{ fontSize: '17px', textAlign: 'center', paddingTop: '8px' }}>Ticket Fare <span style={{ fontWeight: 'bold', marginLeft: '40%' }}>₹ {berth.price}</span></p></div>
              <div style={{ backgroundColor: 'navy', color: 'white', height: '50px', textAlign: 'center', paddingTop: '8px' }} ><p style={{ fontSize: '17px' }}>Total Fare <span style={{ fontWeight: 'bold', marginLeft: '40%' }}>₹ {passengers.length * berth.price}</span></p></div>
            </div>

          </div>
        }
        {currentPage === "Payment" &&
          <div>
            <div style={{ backgroundColor: 'papayawhip', fontSize: '14px', paddingTop: '15px', paddingBottom: '2px', fontWeight: 'bold', borderLeft: 'solid 10px Orange', marginBottom: '10px' }}>
              <ul>
                <li>If you have any Visa/Master Debit card not listed below, any of the Visa/Master credit card Payment Gateways ( ICICI PG, HDFC PG, AXIS PG, CITI PG) can be used for ticket booking (If enabled by card issuer). Click Here to pay through Credit Card Payment Gateways.</li>
                <li>All RuPay Debit Card/Credit card holders can pay through 'RuPay-Card KOTAK PG' RuPay-Card KOTAK PG</li>
                <li>All international 'Debit/Credit card' holders can pay through 'International Cards (Powered by ATOM)' present under ' present under' International Cards (Powered by ATOM)</li>
                <li>Accrual is allowed only if payment is done through applicable multiple payment option using IRCTC Co-branded Credit Card.</li>
              </ul>
            </div>
            <div className='MainPassengerDetailsContainer'>
              <div className='PassengerDetailsContainer'>
                <h1>Payment Methods</h1>
                <div>
                  <p></p>
                </div>
                <div>
                  <button style={{ width: '60px', height: '40px', marginRight: '20px', borderWidth: '1px', borderColor: 'grey' }} onClick={handleBackButton}>Back</button>
                  <button style={{ width: '110px', height: '40px', borderWidth: '0px', backgroundColor: 'darkorange', borderRadius: '10px' }} onClick={handleBookButton}>Pay & Book</button>
                </div>
              </div>
              <div className='FareContainerPayment'>
                <div style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#ccc', marginBottom: '10px' }}>
                  <div style={{ backgroundColor: 'navy', color: 'white', fontWeight: 'bold', padding: '10px', textAlign: 'center', fontSize: '20px' }} > Journey Summary</div>
                  <div>
                    <h6 style={{ fontWeight: 'bold', paddingLeft: '10px', marginTop: '20px' }}>{trainName}({trainNumber})</h6>
                    <p style={{ marginLeft: '70%' }}>{DepatureformattedDate}</p>
                    <h6 style={{ paddingLeft: '10px' }}>
                      <span style={{ paddingLeft: '10px' }}>{fromStation}</span><span style={{ marginLeft: '5%', marginRight: '5%' }}>
                        -----</span>
                      <span style={{ paddingLeft: '10px' }}>{toStation}</span></h6></div>
                  <div style={{ marginLeft: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: '25%' }}><p> {from}<span style={{ fontWeight: 'bold', paddingRight: '10px' }}>{departureTime}</span></p>
                    <p> {to}<span style={{ fontWeight: 'bold', paddingRight: '10px' }}>{arrivalTime}</span></p></div>


                </div>
                <div style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#ccc', marginBottom: '10px' }}>
                  <div className='TrainName'> <h5 style={{ fontWeight: 'bold' }}>Passenger Details</h5></div>
                  {passengers.map((eachpassenger, index) =>
                  (
                    <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '10px' }}>
                      <h5 style={{ marginRight: '20px' }}>{index + 1}</h5>
                      <h5 style={{ fontWeight: 'bold', marginRight: '20px' }}>{eachpassenger.name}</h5>
                      <p style={{ marginRight: '10px' }}>{eachpassenger.age}yrs<span style={{ marginLeft: '5px', marginRight: '5px' }}>|</span></p>
                      <p>{eachpassenger.gender}</p>

                    </div>
                  )
                  )}
                  <div style={{ marginLeft: '10px' }}>
                    <p>Email:******@gmail.com</p>
                    <p>Mobile:{contactMobile}</p>
                  </div>
                </div>
                <div style={{ backgroundColor: '#e6e8eb', height: '50px', textAlign: 'center' }}><p style={{ fontSize: '20px', fontWeight: 'bold', paddingTop: '10px' }}>Fare Summary</p></div>
                <div style={{ height: '50px' }}><p style={{ fontSize: '17px', textAlign: 'center', paddingTop: '8px' }}>Ticket Fare <span style={{ fontWeight: 'bold', marginLeft: '40%' }}>₹ {berth.price}</span></p></div>
                <div style={{ height: '50px' }}><p style={{ fontSize: '17px', textAlign: 'center', paddingTop: '8px' }}>Convenience Fee <span style={{ fontWeight: 'bold', marginLeft: '30%' }}>₹ 35.00</span></p></div>
                <div style={{ height: '50px' }}><p style={{ fontSize: '17px', textAlign: 'center', paddingTop: '8px' }}>Travel Insurance <span style={{ fontWeight: 'bold', marginLeft: '30%' }}>₹ 1.00</span></p></div>
                <div style={{ backgroundColor: 'navy', color: 'white', height: '50px', textAlign: 'center', paddingTop: '8px' }} ><p style={{ fontSize: '17px' }}>Total Fare <span style={{ fontWeight: 'bold', marginLeft: '40%' }}>₹ {passengers.length * berth.price + 36}</span></p></div>
              </div>
            </div>
          </div>}
      </div>
      <div className='HeaderContainer d-none d-md-flex align-items-center'>
        <p style={{ paddingTop: '15px' }}>Get Connected with us on social networks</p>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ backgroundColor: "#3b5998" }}>
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ backgroundColor: "#25d366" }}>
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ backgroundColor: "#ff0000" }}>
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ backgroundColor: "#002244" }}>
          <FontAwesomeIcon icon={faInstagram} />
        </a>

        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ backgroundColor: "#0077b5" }}>
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ backgroundColor: "#0088cc" }}>
          <FontAwesomeIcon icon={faTelegram} />
        </a>

        <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ backgroundColor: "#bd081c" }}>
          <FontAwesomeIcon icon={faPinterest} />
        </a>
        <a href="https://www.irctc.co.in" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ backgroundColor: "#003366" }}>
          <span style={{ fontWeight: "bold", fontSize: "25px", textTransform: "lowercase" }}>t</span>
        </a>
        <a href="https://www.wix.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ backgroundColor: "#ffcd00" }}>
          <FontAwesomeIcon icon={faDove} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter" style={{ backgroundColor: "#1da1f2" }}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>

      </div>
      <div>
        <div className='dropdownHelpContainer d-none d-md-flex flex-row'>
          <div className='dropdownContainer'>
            <GridDropdowns />
          </div>
          <div className='HelpContainer'>
            <a>Help & Support</a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PassengerDetails;

