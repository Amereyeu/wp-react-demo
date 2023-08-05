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
import News from "./News";

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
      <>
        <div className="contact">
          <div className="contact__left">
            <ul className="contact-list">
              {single[1].acf.page_visible === "yes" &&
                single[1].acf.facebook !== "" && (
                  <li>
                    <FaFacebookSquare />
                    <a
                      href={`http://www.${single[1].acf.facebook}`}
                      target="_blank"
                    >
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
                      target="_blank"
                    >
                      {single[1].acf.instagram}
                    </a>
                  </li>
                )}

              {single[1].acf.page_visible === "yes" &&
                single[1].acf.address !== "" && (
                  <li>
                    <FaMapMarkerAlt />
                    Adresa: {single[1].acf.address}
                  </li>
                )}

              {single[1].acf.page_visible === "yes" &&
                single[1].acf.phone !== "" && (
                  <li>
                    <FaPhone />
                    Telefon: {single[1].acf.phone}
                  </li>
                )}

              {single[1].acf.page_visible === "yes" &&
                single[1].acf.ico !== "" && (
                  <li>
                    <FaAddressCard />
                    IČO: {single[1].acf.ico}
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

          {/*           <div className="contact__right">
            <MailForm />
          </div> */}
        </div>

        <News />

        <iframe
          src="https://frame.mapy.cz/s/kacunazaru"
          width="900"
          height="500"
          frameBorder="0"
        ></iframe>
      </>
    );
  }
}

export default Contact;

