import { useState, useEffect } from "react";
import axios from "axios";
import MailForm from "../components/MailForm";
import {
  FaFacebookSquare,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaAddressCard,
  FaExclamationTriangle,
  FaEnvelope,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import Faqs from "../components/Faq/Faqs";

function Contact() {
  const [single, setSingle] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function getEvents() {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/pages`)
      .then((response) => response.data)
      .then((data) => {
        setSingle(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getEvents();
  }, []);

  if (isLoaded) {
    return (
      <div className="contact-wrap">
        <div className="contact">
          <div className="contact__left">
            <ul className="contact-list">
              {single[1].acf.page_visible === "yes" &&
                single[1].acf.facebook !== "" && (
                  <li>
                    <FaFacebookSquare />
                    <a
                      href={`http://www.${single[1].acf.facebook}`}
                      target="_blank">
                      {single[1].acf.facebook}
                    </a>
                  </li>
                )}

              {single[1].acf.page_visible === "yes" &&
                single[1].acf.instagram !== "" && (
                  <li>
                    <FaInstagram />
                    <a
                      href={`http://www.${single[1].acf.instagram}`}
                      target="_blank">
                      {single[1].acf.instagram}
                    </a>
                  </li>
                )}

              {single[1].acf.page_visible === "yes" &&
                single[1].acf.address !== "" && (
                  <li>
                    <FaMapMarkerAlt />
                    Address: {single[1].acf.address}
                  </li>
                )}

              {single[1].acf.page_visible === "yes" &&
                single[1].acf.phone !== "" && (
                  <li>
                    <FaPhone />
                    Phone: {single[1].acf.phone}
                  </li>
                )}

              {single[1].acf.page_visible === "yes" &&
                single[1].acf.ico !== "" && (
                  <li>
                    <FaAddressCard />
                    ICO: {single[1].acf.ico}
                  </li>
                )}

              {single[1].acf.page_visible === "yes" &&
                single[1].acf.email !== "" && (
                  <li>
                    <FaEnvelope />
                    <a href="mailto:dorticky.od.janicky@seznam.cz">
                      E-mail: {single[1].acf.email}
                    </a>
                  </li>
                )}

              {single[1].acf.page_visible === "yes" &&
                single[1].acf.info_1 !== "" && (
                  <li>
                    <FaExclamationTriangle />
                    {single[1].acf.info_1}
                  </li>
                )}

              {single[1].acf.page_visible === "yes" &&
                single[1].acf.info_2 !== "" && (
                  <li>
                    <FaExclamationTriangle />
                    {single[1].acf.info_2}
                  </li>
                )}
            </ul>
          </div>

          <div className="contact__right">
            <MailForm />
          </div>
        </div>

        <Faqs />

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
}

export default Contact;

