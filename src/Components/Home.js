import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../Styles/HomePage.css';
import 'font-awesome/css/font-awesome.min.css';
import LoginModal from './LoginModal';
import AgentLoginModal from './AgentLoginModal';
import AgentOtpModal from './AgentOtpModal';
import ContactUsModal from './ContactUsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube, faTelegram, faPinterest, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown, faPaperPlane, faLocationDot, faExchangeAlt, faCalendarDays, faSuitcase, faDove, faUser, } from '@fortawesome/free-solid-svg-icons';
import { faPlane, faBedPulse, faArrowTrendUp, faBowlFood, faBus, faUmbrellaBeach, faTrainSubway, faMountainSun, faTrainTram, faMountain, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState, forwardRef, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaCreditCard, FaShoppingBag, FaGift } from 'react-icons/fa';

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



const HolidayList = [
  {
    id: 1,
    image: "https://www.irctc.co.in/nget/assets/images/exterior.jpg",
    Description: "Redefining Royalty, Luxury and Comfort, Maharajas' express takes you on a sojourn to the era of bygone stately splendour of princely states. Sylvan furnishings, elegant ambience and modern amenities are amalgamated for an “Experience Unsurpassed”. It has been a winner of “World’s Leading Luxury train” by World Travel Awards consecutively for last six years.",
    title: "Maharajas' Express"
  },
  {
    id: 2,
    image: "https://www.irctc.co.in/nget/assets/images/Thailand.jpg",
    Description: "Best deals in International Holiday packages, handpicked by IRCTC, for Thailand, Dubai, Sri Lanka, Hong Kong, China, Macau, Bhutan, Nepal, U.K., Europe, USA, Australia etc. The packages are inclusive of sightseeing, meals, visa charges and overseas medical insurance to give you a hassle-free and memorable experience",
    title: "International Packages"
  },
  {
    id: 3,
    image: "https://www.irctc.co.in/nget/assets/images/Kashmir.jpg",
    Description: "Be it the spiritual devotee seeking blessings of Tirupati, Shirdi or Mata Vaishno Devi or the leisure traveller wanting to relish the Blue mountains of North East, Sand-dunes of Rajasthan, Hamlets of Ladakh, Wonders of Himalayas, Serene lakes or Picturesque Islands, IRCTC has it all. Discover India through IRCTC!",
    title: "Domestic Air Packages"
  },
  {
    id: 4,
    image: "https://www.irctc.co.in/nget/assets/images/Bharat_Gaurav.jpg",
    Description: "IRCTC operates Bharat Gaurav Tourist Train having AC III-Tier accommodation on train specially designed to promote domestic tourism in India. This train runs on various theme based circuits covering pilgrimage and heritage destinations in its itinerary on a 5 days to 20 days trip and showcase India’s rich cultural heritage",
    title: "Bharat Gaurav Tourist Train"
  },
  {
    id: 5,
    image: "https://www.irctc.co.in/nget/assets/images/Manali.jpg",
    Description: "IRCTC offers Exclusive Rail tour packages with confirmed train tickets, sight-seeing and meals for enchanting Nilgiri Mountains, Darjeeling, Kullu Manali, Kashmir, Gangtok or divine tours of Mata Vaishno Devi, Rameswaram, Madurai, Shirdi, Tirupati etc. Holiday packages/ Land packages to these destinations are also available",
    title: "Rail Tour Packages"
  }
]

const HolidayItem = (props) => {
  const { HolidayDetails } = props;
  const { image, Description, title } = HolidayDetails;
  return (
    <div className='HolidayContainer'>
      <img src={image} />
      <h1 style={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold', marginTop: "2px" }}>{title}</h1>
      <p style={{ margin: '10px' }}>{Description}</p>
      <button style={{ margin: '10px', borderWidth: '0px', backgroundColor: "white", color: 'black' }}>ReadMore<FontAwesomeIcon icon={faArrowRight} /></button>
    </div>

  )
}
const OptionsList = [
  {
    id: 1,
    buttonicon: faPlane,
    title: 'FLIGHTS'
  },
  {
    id: 2,
    buttonicon: faBedPulse,
    title: 'FLIGHTS'
  },
  {
    id: 3,
    buttonicon: faArrowTrendUp,
    title: 'FLIGHTS'
  },
  {
    id: 4,
    buttonicon: faBowlFood,
    title: 'FLIGHTS'
  },
  {
    id: 5,
    buttonicon: faBus,
    title: 'FLIGHTS'
  },
  {
    id: 6,
    buttonicon: faUmbrellaBeach,
    title: 'FLIGHTS'
  },
  {
    id: 7,
    buttonicon: faTrainSubway,
    title: 'FLIGHTS'
  },
  {
    id: 8,
    buttonicon: faMountainSun,
    title: 'FLIGHTS'
  },
  {
    id: 9,
    buttonicon: faTrainTram,
    title: 'FLIGHTS'
  },
  {
    id: 10,
    buttonicon: faMountain,
    title: 'FLIGHTS'
  }

]

const OptionButton = ({ buttonicon, title }) => {


  return (
    <div className='d-flex flex-column OptionButtonContainer'>
      <button className='ButtonStyle'><FontAwesomeIcon icon={buttonicon} style={{ color: '808080', width: '50px', height: '50px' }} /></button>
      <p>{title}</p>
    </div>
  )
}


function PickAdate({ startDate, setStartDate }) {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 63);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="input-group FromContainerElements">
      <span className="input-group-text no-border-bg">
        <FontAwesomeIcon icon={faCalendarDays} className="CalIcon" style={{ color: '#000080' }} />
      </span>
      <input
        type="text"
        className="form-control no-border-bg"
        onClick={onClick}
        value={value}
        readOnly
        ref={ref}
      />
    </div>
  ));

  return (

    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="dd-MM-yyyy"
      minDate={new Date()}
      maxDate={maxDate}
      customInput={<CustomInput />}
    />
  )
}

function Checkboxes() {
  const options = ["Person with Disability Criteria", "Flexible with Date", "Train with Available Berth", "Railiway Pass Concession"];
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className='checkbox-container ms-5'>
      {options.map((option, index) => (
        <div className="form-check me-3" key={index}>
          <input
            type="checkbox"
            name={option}
            checked={checkedItems[option] || false}
            onChange={handleChange}
            className="form-check-input checkboxInput"
            id={option}
          />
          <label className="form-check-label" htmlFor={option}>
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}

const HomeComponent = () => {


  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleString('en-US', { month: 'short' }).toLowerCase();
  const year = now.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  const [user, setUser] = useState(null);


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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };
  const [dynamicTime, setDynamicTime] = useState(getFormattedTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setDynamicTime(getFormattedTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getFormattedTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAgentLoginModal, setShowAgentLoginModal] = useState(false);
  const [showAgentOtpModal, setShowAgentOtpModal] = useState(false);
  const [showContactUsModal, setShowContactUsModal] = useState(false);
  const openModal = () => setShowLoginModal(true);
  const closeModal = () => setShowLoginModal(false);

  const openAgentModal = () => setShowAgentLoginModal(true);
  const closeAgentModal = () => setShowAgentLoginModal(false);

  const openAgentOtpModal = () => setShowAgentOtpModal(true);
  const closeAgentOtpModal = () => setShowAgentOtpModal(false);

  const openContactUsModal = () => setShowContactUsModal(true);
  const closeContactUsModal = () => setShowContactUsModal(false);

  const handleAgentLoginClose = () => {
    closeAgentModal();
    openAgentOtpModal();
  };

  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');

  const [fromSuggestions, setFromSuggestions] = useState({ journeys: [], stations: [] });
  const [toSuggestions, setToSuggestions] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const handleSearch = () => {
    const formattedDate = `${String(startDate.getDate()).padStart(2, '0')}/${String(startDate.getMonth() + 1).padStart(2, '0')}/${startDate.getFullYear()}`;
    console.log("start date ::::" + startDate.toLocaleDateString());
    navigate(`/trains?fromStation=${encodeURIComponent(fromInput)}&toStation=${encodeURIComponent(toInput)}&departureDate=${encodeURIComponent(formattedDate)}`);
  };
  useEffect(() => {
    if (fromInput) {
      fetch(`http://localhost:5000/api/suggestions/from?q=${fromInput}`)
        .then(res => res.json())
        .then(data => setFromSuggestions(data));
    } else {
      setFromSuggestions({ journeys: [], stations: [] });
    }
  }, [fromInput]);

  useEffect(() => {
    if (toInput) {
      fetch(`http://localhost:5000/api/suggestions/to?q=${toInput}`)
        .then(res => res.json())
        .then(data => setToSuggestions(data));
    } else {
      setToSuggestions([]);
    }
  }, [toInput]);


  return (
    <div class='MainContainer'>
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
                {!user ? (<><li className="nav-item me-1 login">
                  <a
                    className="nav-link active d-none d-md-block"
                    aria-current="page"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openModal();
                    }}
                  >
                    LOGIN
                  </a>
                </li>
                  <li className="nav-item me-3">

                    <Link to="/register" className="nav-link d-none d-md-block" >
                      REGISTER
                    </Link>

                  </li>
                  <li className="nav-item me-2">
                    <a className="nav-link d-none d-md-block" href="#" onClick={(e) => {
                      e.preventDefault();
                      openAgentModal();
                    }}>
                      AGENT LOGIN
                    </a>
                  </li></>) : (<li className="nav-item me-2 d-flex align-items-center ">
                    <button className='d-none d-md-block'
                      style={{ backgroundColor: 'navy', color: 'white', fontWeight: 'bold', borderWidth: '0px' }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                    <span className="nav-link d-none d-md-block fw-bold text-primary">
                      Welcome {user.fullName}({user.username})
                    </span>

                  </li>)}
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
                    {!user ? (<div className="nav-item login" style={{ marginTop: 0 }}>
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
                    </div>) : (
                      <div className='d-block d-md-none'>
                        <button
                          style={{ backgroundColor: 'navy', color: 'white', fontWeight: 'bold', borderWidth: '0px' }}
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                        <span className="nav-link  fw-bold text-primary">
                          Welcome {user.fullName}({user.username})
                        </span>
                      </div>
                    )}
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
      <LoginModal show={showLoginModal} onClose={closeModal} setUser={setUser} />
      <AgentLoginModal show={showAgentLoginModal} onClose={handleAgentLoginClose} />
      <AgentOtpModal show={showAgentOtpModal} onClose={closeAgentOtpModal} />
      <ContactUsModal show={showContactUsModal} onClose={closeContactUsModal} />
      <div className='MainContainer d-flex flex-column'>
        <div className='d-flex flex-row flex-wrap'>
          <div className='HomeContainer'>

            <div className='PNRButtonsContainer d-flex flex-row'>
              <button className='PNRheading'>
                <FontAwesomeIcon icon={faClipboardCheck} style={{ color: "#ffffff", fontSize: '20px', marginLeft: "15px", marginRight: "50px" }} />
                PNR STATUS
              </button>

              <button className='PNRheading'>
                <FontAwesomeIcon icon={faClipboardList} style={{ color: "#ffffff", fontSize: '20px', marginLeft: "15px", marginRight: "30px" }} />
                CHARTS / VACANCY
              </button>
            </div>

            <h1 className='bookTicketHeading d-none d-md-block'>BOOK TICKET</h1>

            <div className='InputsContainer d-flex flex-row me-4 ms-5'>
              <div className='d-flex flex-column FromContainer'>
                <div className="position-relative">
                  <FontAwesomeIcon icon={faPaperPlane} className="input-icon1" style={{ color: '#000080' }} />
                  <input
                    type='search'
                    className='FromContainerElements ps-5 mb-0'
                    placeholder='From'
                    value={fromInput}
                    onChange={(e) => setFromInput(e.target.value)}
                  />
                  {fromSuggestions?.journeys?.length > 0 && (
                    <ul className="suggestion-popup">
                      <li className="header">----- Journeys -----</li>

                      {[...new Map(
                        fromSuggestions.journeys.map(j => [`${j.from}-${j.to}`, j])
                      ).values()].map((j, idx) => (
                        <li key={`journey-${idx}`} onClick={() => {
                          setFromInput(j.fromStation)
                          setFromSuggestions(false);
                          setToInput(j.toStation);
                        }}>
                          {j.fromStation} - {j.from} ➡ {j.toStation} - {j.to}
                        </li>
                      ))}

                    </ul>
                  )}
                  <FontAwesomeIcon
                    icon={faExchangeAlt}
                    style={{ transform: 'rotate(90deg)', height: '18px', margin: '5px', color: "#000080", backgroundColor: "#D5FFFF", padding: '2px' }}
                    className='d-block d-md-none input-icon3'
                  />

                </div>

                <FontAwesomeIcon
                  icon={faExchangeAlt}
                  style={{ transform: 'rotate(90deg)', height: '15px', margin: '5px' }}
                  className='d-none d-md-block'
                />

                <div className="position-relative">
                  <FontAwesomeIcon icon={faLocationDot} className="input-icon2" style={{ color: '#000080' }} />
                  <input
                    type='search'
                    className='FromContainerElements ps-5'
                    placeholder='To'
                    value={toInput}
                    onChange={(e) => setToInput(e.target.value)}
                  />
                  {toSuggestions && toSuggestions.length > 0 && (
                    <ul className="suggestion-popup">
                      {toSuggestions.map((station, idx) => (
                        <li key={idx} onClick={() => {
                          setToInput(station);
                          setToSuggestions([]);
                        }}>
                          {station}
                        </li>
                      ))}
                    </ul>
                  )}


                </div>

                <a className="nav-link FromContainerElements DropDownborder d-none d-md-block" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faMicrosoft} className="me-2" style={{ color: '#000080' }} />
                  GENERAL
                  <FontAwesomeIcon icon={faCaretDown} className="Iconstyle" style={{ color: '#000080' }} />
                </a>

                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">LADIES</a></li>
                  <li><a className="dropdown-item" href="#">LOWER BERTH/SR. CITIZEN</a></li>
                  <li><a className="dropdown-item" href="#">PERSON WITH DISABILITY</a></li>
                  <li><a className="dropdown-item" href="#">DUTY PASS</a></li>
                </ul>
              </div>

              <div className='d-flex flex-column CalContainer'>
                <p className='DateParagraph'>DD/MM/YYYY*</p>
                <PickAdate startDate={startDate} setStartDate={setStartDate} />

                <a className="nav-link FromContainerElements DropDownborder" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faSuitcase} className="me-2" />
                  All Classes
                  <FontAwesomeIcon icon={faCaretDown} className="Iconstyle2" />
                </a>

                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Anubhuti Class (EA)</a></li>
                  <li><a className="dropdown-item" href="#">AC First Class (1A)</a></li>
                  <li><a className="dropdown-item" href="#">Vistadome AC (EV)</a></li>
                  <li><a className="dropdown-item" href="#">Exec. Chair Car (EC)</a></li>
                  <li><a className="dropdown-item" href="#">AC 2 Tier (2A)</a></li>
                  <li><a className="dropdown-item" href="#">First Class (FC)</a></li>
                  <li><a className="dropdown-item" href="#">AC 3 Tier (3A)</a></li>
                  <li><a className="dropdown-item" href="#">AC 3 Economy (3E)</a></li>
                  <li><a className="dropdown-item" href="#">Vistadome Chair Car (VC)</a></li>
                  <li><a className="dropdown-item" href="#">AC Chair Car (CC)</a></li>
                  <li><a className="dropdown-item" href="#">Sleeper (SL)</a></li>
                  <li><a className="dropdown-item" href="#">Vistadome Non AC (VS)</a></li>
                  <li><a className="dropdown-item" href="#">Second Sitting (2S)</a></li>
                </ul>

                <a className="nav-link FromContainerElements DropDownborder d-block d-md-none" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FontAwesomeIcon icon={faMicrosoft} className="me-2" style={{ color: '#000080' }} />
                  GENERAL
                  <FontAwesomeIcon icon={faCaretDown} className="Iconstyle" style={{ color: '#000080' }} />
                </a>
              </div>
            </div>

            <div className='checkbox-container'>
              <Checkboxes />
            </div>

            <div className='ButtonContainer ms-5 m-3'>
              <button className='SearchButton' onClick={handleSearch}>Search</button>
              <button className='SearchButton2'>Easy booking on AskDiksha</button>
            </div>

          </div>

          <div className='HomeHeading d-none d-md-block'>
            <h1 className='IndianRailwayHeading'>INDIAN RAILWAYS</h1>
            <p>Safety | Security | Punctuality</p>
          </div>
        </div>


        <div className='ContactContainer'>
          <p className='Para'>Customers can use enhanced for their IRCTC related queries!!</p>
          <a href="https://equery.irctc.co.in/" className='Para'>https://equery.irctc.co.in</a>
          <p className='Para'>Customer Care Numbers : 14646/08044647999 /08035734999</p>
          <p className='Para'>BEWARE OF FRAUDSTERS: ALways download official IRCTC Rail Connect App from the Google</p>
          <p className='Para'>Play Store or Apple App Store only.</p>
        </div>
      </div>
      <div className='OptionContainer d-none d-md-block'>
        <h1>Have you not Found the right one?</h1>
        <h1>Find a service suitable for you here</h1>
        <div className='OptionsGrid'>

          {
            OptionsList.map((currentButton) => (<OptionButton
              key={currentButton.id}
              buttonicon={currentButton.buttonicon}
              title={currentButton.title} />))
          }

        </div>
      </div>
      <div className='AdhaarContainer d-none d-md-block'>
        <h2 className='aadharheading'>IRCTC Aadhaar Alert!</h2>
        <p className='aadharaPara'>Starting July 1,2025, only Aadhaar authenticated users can book Tatkal Train Tickets</p>
        <p className='aadharaPara'>Authenticate now via<span>"My Account""Authenticate User"</span> </p>
        <p className='aadharaPara'>IRCTC Website and Mobile App.</p>
      </div>
      <div className='HolidayMainContainer d-none d-md-block'>
        <h1>HOLIDAYS</h1>
        <div className='HolidayGrid'>
          {
            HolidayList.map((currentHoliday) => (<HolidayItem
              key={currentHoliday.id}
              HolidayDetails={currentHoliday}
            />))
          }
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

export default HomeComponent;