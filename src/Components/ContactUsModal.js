import "../Styles/ContactUsModal.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function ContactUsModal({ show, onClose }) {
    if (!show) return null;

    return (
        <div className="modalOverlay">
            <div className="modalContentContact">
                <div className="modalHeaderContact">
                    <h3 style={{ padding: '10px', fontSize: '20px', paddingLeft: '30px' }}>You may contact us</h3>
                    <button className="modalCloseBtn" onClick={onClose} style={{ color: 'white' }}>
                        &times;
                    </button>
                </div>
                <div style={{ margin: '10px' }}>
                    <h3 style={{ fontWeight: 'bold' }}>For Railway tickets booked through IRCTC</h3>
                    <p>Customer Care Numbers: 14646 / 08044647999 / 08035734999</p>
                    <p>(Language: Hindi, English, Punjabi, Bengali, Assamese, Odia, Marathi, Gujarati, Tamil, Telugu, Kannada and Malayalam )</p>
                    <p>Customers can use enhanced interface for their IRCTC related queries: https://equery.irctc.co.in/</p>
                    <h3 style={{ fontWeight: 'bold' }}>General Information:</h3>
                    <p>I-tickets/e-tickets: https://equery.irctc.co.in</p>
                    <p>For Cancellation of E-tickets: etickets@irctc.co.in</p>
                    <p>For IRCTC iMudra Prepaid Wallet & Card: https://equery.irctc.co.in</p>
                    <h3 style={{ fontWeight: 'bold' }}>For complaint regarding IRCTC Loyalty credit card, kindly contact as below.</h3>
                    <p>LOYALTY CREDIT CARD: IRCTC-SBI</p>
                    <p>CONTACT NUMBER: 0124-39021212 / 18001801295</p>
                    <p>EMAIL/URL: customercare@sbicard.com</p>
                    <p>LOYALTY CREDIT CARD: IRCTC-BOB</p>
                    <p>CONTACT NUMBER: 1800225100 / 18001031006</p>
                    <p>EMAIL/URL: crm@bobfinancial.com</p>
                    <p>LOYALTY CREDIT CARD: IRCTC-HDFC</p>
                    <p>CONTACT NUMBER: 18002026161 / 18602676161</p>
                    <p>EMAIL/URL: https://www.hdfcbank.com/personal/need-help/contact-us</p>
                    <p>LOYALTY CREDIT CARD: IRCTC-RBL</p>
                    <p>CONTACT NUMBER: +91 2262327777 / +91 2271190900</p>
                    <p>EMAIL/URL: cardservices@rblbank.com</p>
                    <p>For other queries related to IRCTC Loyalty Co-branded Program, kindly email at loyaltyprogram@irctc.co.in</p>
                    <p>Registered Office - Corporate Office</p>
                    <p>Indian Railway Catering and Tourism Corporation Ltd.,</p>
                    <p>4th Floor, Tower-D, World Trade Centre,</p>
                    <p>Nauroji Nagar, New Delhi-110029</p>
                </div>
            </div>
        </div>
    )
}
export default ContactUsModal;