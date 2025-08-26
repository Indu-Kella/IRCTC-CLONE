import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../Styles/HomePage.css';
import 'font-awesome/css/font-awesome.min.css';
import '../Styles/RegisterPage.css';
import LoginModal from './LoginModal';
import AgentLoginModal from './AgentLoginModal';
import AgentOtpModal from './AgentOtpModal';
import ContactUsModal from './ContactUsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube, faTelegram, faPinterest, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown, faCircleXmark, faDove, faUser, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from "react";
import { faBell } from '@fortawesome/free-regular-svg-icons';
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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


const QuestionsData = [
  {
    question: "What is the IRCTC Ticketing Website?",
    answer: "IRCTC (Indian Railway Catering and Tourism Corporation) is the official platform for booking train tickets in India. It also offers services like tourism packages, catering, and more.",
  },
  {
    question: "Why do I need to register on IRCTC?",
    answer: "You need to register to book tickets, manage your bookings, and access other services offered by IRCTC.",
  },
  {
    question: "How can I register on IRCTC?",
    answer: "Visit the IRCTC website and click on the 'Register' link. Fill in the required details and submit the form to create your account.",
  },
  {
    question: "Are there any charges for registering on IRCTC?",
    answer: "No, registration on IRCTC is free of cost.",
  },
  {
    question: "What information do I need to provide for registration?",
    answer: "You need to provide details like username, password, email, mobile number, and address for registration.",
  },
  {
    question: "How do I activate my IRCTC account after registration?",
    answer: "You will receive an activation link on your registered email. Click on it to activate your account.",
  },
  {
    question: "How do I activate my IRCTC account after registration?",
    answer: "You will receive an activation link on your registered email. Click on it to activate your account.",
  },
  {
    question: "How do I activate my IRCTC account after registration?",
    answer: "You will receive an activation link on your registered email. Click on it to activate your account.",
  },
  {
    question: "How do I activate my IRCTC account after registration?",
    answer: "You will receive an activation link on your registered email. Click on it to activate your account.",
  }
];

const QuestionsContainer = () => {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleFAQ = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter(i => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <div className='Questions'>
      {QuestionsData.map((item, index) => (
        <div key={index} style={{ borderBottom: '1px solid #ccc' }}>
          <div
            style={{
              cursor: 'pointer',
              padding: '10px',
              backgroundColor: '#d1bca9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            onClick={() => toggleFAQ(index)}
          >
            <span>{item.question}</span>
            <span>{openIndices.includes(index) ? '-' : '+'}</span>
          </div>
          {openIndices.includes(index) && (
            <div style={{ padding: '10px', backgroundColor: 'white' }}>
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

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



const RegisterComponent = () => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleString('en-US', { month: 'short' }).toLowerCase();
  const year = now.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAgentLoginModal, setShowAgentLoginModal] = useState(false);
  const [showAgentOtpModal, setShowAgentOtpModal] = useState(false);
  const [showContactUsModal, setShowContactUsModal] = useState(false);

  const openAgentModal = () => setShowAgentLoginModal(true);
  const closeAgentModal = () => setShowAgentLoginModal(false);

  const openAgentOtpModal = () => setShowAgentOtpModal(true);
  const closeAgentOtpModal = () => setShowAgentOtpModal(false);

  const openContactUsModal = () => setShowContactUsModal(true);
  const closeContactUsModal = () => setShowContactUsModal(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const openModal = () => setShowLoginModal(true);
  const closeModal = () => setShowLoginModal(false);
  const handleAgentLoginClose = () => {
    closeAgentModal();
    openAgentOtpModal();
  };

  const refreshCaptcha = () => {
    fetchCaptcha();
    setCaptchaInput('');
  };

  const fetchCaptcha = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/captcha");
      setCaptchaImage(res.data.captchaImage);
      setCaptchaToken(res.data.captchaToken);
    } catch (err) {
      console.error("Error fetching captcha", err);
    }
  };
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
    captcha: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (!value) {
      setErrors({
        ...errors,
        [name]: `${name} is required`
      });
    }
  };

  useEffect(() => {

    fetchCaptcha();

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = `${key} is required`;
      }
    });

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, captchaToken })
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            refreshCaptcha();
            if (data.message === "Username already exists") {
              setErrors({ username: "Username already exists" });
            } else if (data.error && data.error.includes("Captcha")) {
              setErrors({ captcha: "Captcha validation failed" });
            } else if (data.message) {
              setErrors({ general: data.message });
            }
            return;
          }
          alert("User registered successfully!");
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong");
        });
    }
  };


  return (
    <div className='RegisterMainContainer'>
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

                <li className="nav-item me-2" style={{ marginLeft: '120px' }}>
                  <a className="nav-link d-none d-md-block" href="#" onClick={(e) => {
                    e.preventDefault();
                    openAgentModal();
                  }}>
                    AGENT LOGIN
                  </a>
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
                    {formattedDate}[{formattedTime}]
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
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          openModal();
                        }}
                        style={{ marginTop: 0 }}
                      >
                        LOGIN
                      </a>
                    </div>
                    <div className="nav-item date" style={{ marginTop: 0 }}>
                      <a
                        className="nav-link me-0"
                        href="#"
                        style={{ marginTop: 0 }}
                      >
                        {formattedDate}[{formattedTime}]
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
                      dropdownItems={["Book Tickets", "Train Status"]}
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
                      } />  </li>
                  <li className="nav-item borderBottom">
                    <NavItemWithDropdown
                      title="LOYALTY"
                      dropdownItems={[
                        { label: "About IRCTC Loyalty program" },

                        {
                          label: "IRCTC SBI Credit Card", subItems: ["About IRCTC SBI Credit Card",
                            "IRCTC SBI Platinum Card RUPAY e-apply"]
                        },
                        {
                          label: "IRCTC BOB Credit Card", subItems: ["About IRCTC BOB Credit Card",
                            "IRCTC BOB RUPAY Credit Card e-Apply"]
                        },
                        {
                          label: "IRCTC HDFC Credit Card", subItems: ["About IRCTC HDFC Credit Card",
                            "IRCTC HDFC RUPAY Credit Card e-Apply"]
                        },
                        {
                          label: "IRCTC RBL Credit Card", subItems: ["About IRCTC RBL Credit Card",
                            "Apply for IRCTC RBL Bank Credit Card"]
                        },
                        { label: "Add Loyalty Account}" }
                      ]}
                    />
                  </li>

                  <li className="nav-item irctcWallet borderBottom">
                    <NavItemWithDropdown
                      title="IRCTC eWallet"
                      dropdownItems={[{ label: "About IRCTC eWallet" },
                      { label: "IRCTC eWallet User Guide" }]}
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
                      dropdownItems={[
                        {
                          label: "Tourist Trains", subItems: ["Bharat Gaurav",
                            "Maharaja's Express",
                            "Golden Chariot"]
                        },
                        {
                          label: "Tour Packages",
                          subItems: ["Domestic Packages",
                            "International Packages"]
                        },
                        {
                          label: "Stays",
                          subItems: ["Retiring Room",
                            "Lounge"]
                        }
                      ]}
                    />
                  </li>

                  <li className="nav-item borderBottom">
                    <NavItemWithDropdown
                      title="MEALS"
                      dropdownItems={[
                        { label: "Book Food – E-Pantry" },
                        { label: "Order Food - E-Catering" },
                        { label: "Cooked Food Menu" }
                      ]}
                    />
                  </li>

                  <li className="nav-item borderBottom">
                    <NavItemWithDropdown
                      title="PROMOTIONS"
                      dropdownItems={[
                        { label: "Advertise with us", subItems: ["Banner-Advertisement", "Push Notification"] },
                        {
                          label: "IRCTC Rail Connect App",
                          subItems: ["Android Mobile App",
                            "iOS Mobile App"]
                        },
                        { label: "IRCTC Tourism App" },
                        { label: "IRCTC Air App" },
                        { label: "National Rail Museum" },
                        { label: "UTS TICKET APP" },
                        {
                          label: "IRCTC Co-Branded Cards",
                          subItems: ["IRCTC SBI Credit Card", "IRCTC BOB Credit Card",
                            "IRCTC HDFC Credit Card",
                            "IRCTC RBL Credit Card"]
                        },
                        { label: "Trains At A Glance" },
                        { label: "National Voter's Service Portal" },
                        { label: "Rail Drishti" },
                        { label: "Indian Railways Magazines" },
                        { label: "Railways Freight Business Portal" }
                      ]}
                    />
                  </li>

                  <li className="nav-item borderBottom">
                    <NavItemWithDropdown
                      title="MORE"
                      dropdownItems={[
                        { label: "ChatBot as a Service (CaaS)" },
                        { label: "Link Your Aadhaar" },
                        { label: "Counter Ticket Cancellation" },
                        { label: "Counter Ticket Boarding Point Change" },
                        { label: "FORGOT ACCOUNT DETAILS?" },
                        {
                          label: "AT STATIONS", subItems: ["WI-Fi Railway Stations",
                            "Battery Operated Cars",
                            "E-wheelchair",
                            "Retiring Room"]
                        }
                      ]}
                    />
                  </li>

                  <li className="nav-item me-2 borderBottom">
                    <a className="nav-link d-block d-md-none" href="#">
                      AGENT LOGIN
                    </a>
                  </li>
                  <li className="nav-item me-3 borderBottom">
                    <a className="nav-link d-block d-md-none" href="#">
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
      <LoginModal show={showLoginModal} onClose={closeModal} />
      <AgentLoginModal show={showAgentLoginModal} onClose={handleAgentLoginClose} />
      <AgentOtpModal show={showAgentOtpModal} onClose={closeAgentOtpModal} />
      <ContactUsModal show={showContactUsModal} onClose={closeContactUsModal} />
      <div className='container-fluid d-flex flex-row'>
        <div className='RegisterContainer'>
          <div className='d-flex flex-row justify-content-between'>
            <h5 style={{ fontWeight: 'bold' }}>Create your IRCTC account</h5>
            <a
              className="nav-link active d-none d-md-block" style={{ color: "darkorange", textDecoration: "underline", fontSize: '15px', fontWeight: 'bold' }}
              aria-current="page"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openModal();
              }}
            >
              SIGN IN
            </a>
          </div>
          <div className='CreateAccountDetailsContainer'>
            <ol className='ListStyling'>
              <li><p>Garbage / Junk values in profile may lead to deactivation of IRCTC account.</p></li>
              <li><p>Opening Advance Reservation Period(ARP) ticket and Opening Tatkal ticket booking for unauthenticated users is allowed only after 4 days from date of User Registration (excluding the day of registration ). User may authenticate their user profile with Aadhaar to book Opening Advance Reservation Period(ARP) ticket and Opening Tatkal ticket.</p></li>
            </ol>

          </div>
          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='username'
              />
              {errors.username && <div className="textDanger d-flex flex-row"> <FontAwesomeIcon icon={faCircleXmark} size="sm" style={{ color: 'red', margin: '5px' }} /><p>{errors.username}</p></div>}
            </div>
            <div className="mb-3">

              <input
                type="text"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='full name'
              />
              {errors.fullName && <div className="textDanger d-flex flex-row"> <FontAwesomeIcon icon={faCircleXmark} size="sm" style={{ color: 'red', margin: '5px' }} /><p>{errors.fullName}</p></div>}
            </div>
            <div className="mb-3">

              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='password'
              />
              {errors.password && <div className="textDanger d-flex flex-row"> <FontAwesomeIcon icon={faCircleXmark} size="sm" style={{ color: 'red', margin: '5px' }} /><p>{errors.password}</p></div>}
            </div>
            <div className="mb-3">

              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='confirm password'
              />
              {errors.confirmPassword && <div className="textDanger d-flex flex-row"> <FontAwesomeIcon icon={faCircleXmark} size="sm" style={{ color: 'red', margin: '5px' }} /><p>{errors.confirmPassword}</p></div>}
            </div>
            <div className="mb-3">

              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Email'
              />
              {errors.email && <div className="textDanger d-flex flex-row"> <FontAwesomeIcon icon={faCircleXmark} size="sm" style={{ color: 'red', margin: '5px' }} /><p>{errors.email}</p></div>}
            </div>

            <div className="mb-3">

              <input
                type="tel"
                name="phoneNumber"
                className="form-control"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Phone number'
              />
              {errors.mobile && <div className="textDanger d-flex flex-row"> <FontAwesomeIcon icon={faCircleXmark} size="sm" style={{ color: 'red', margin: '5px' }} /><p>{errors.mobile}</p></div>}
            </div>
            <div style={{ width: '65%', marginBottom: '80px' }}>
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
                name="captcha"
                placeholder="Enter Captcha"
                className="form-control mb-3"
                value={formData.captcha}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="RegisterBtn">Register</button>
          </form>

        </div>
        <div className='QuestionContainer d-none d-md-block'>
          <div className='ps-1 pe-1'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDvaarGpCEm0H0RYSNwbtO3LoLndCvdeNSqg&s" />
          </div>
          <div style={{ backgroundColor: '#f9ebe3' }}>
            <h3 className='mt-2'>Help & FAQ</h3>
            <p style={{ fontSize: '14px' }}>Have Questions About Registering on the IRCTC Ticketing Website?</p>
            <p style={{ fontSize: '14px' }}>Here, you’ll find answers to some frequently asked questions (FAQs) to help guide you through the registration process.</p>


            <QuestionsContainer />
          </div>
        </div>
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
export default RegisterComponent;



