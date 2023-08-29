import MailForm from "../components/MailForm";
import { ToastContainer } from "react-toastify";
import Faqs from "../components/Faq/Faqs";
import ContactInfo from "../components/Contact/ContactInfo";

function Contact({ lg }) {
  return (
    <div className="contact-wrap">
      <div className="contact">
        <ContactInfo lg={lg} />

        <div className="contact__right">
          <MailForm lg={lg} />
        </div>
      </div>

      <Faqs lg={lg} />

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.0360492948!2d-74.3093268295952!3d40.69753996681877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2zTmV3IFlvcmssIFNwb2plbsOpIHN0w6F0eSBhbWVyaWNrw6k!5e0!3m2!1scs!2scz!4v1691251797191!5m2!1scs!2scz"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>

      <ToastContainer />
    </div>
  );
}

export default Contact;

