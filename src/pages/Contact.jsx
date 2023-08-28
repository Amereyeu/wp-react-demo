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
import { useQuery } from "@apollo/client";
import { GET_CONTACT_PAGE } from "../gql/queries";

function Contact({ lg }) {
  const { loading, error, data } = useQuery(GET_CONTACT_PAGE, {
    variables: {
      language: lg,
    },
  });

  if (loading) {
    return (
      <div className="posts__placeholder">
        <div className="circle"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-wrap">
        <div className="posts__placeholder">
          <div>
            <p>Error loading page!</p>
          </div>
        </div>
      </div>
    );
  }

  const pageFound = Boolean(data?.pages?.nodes.length);

  if (!pageFound) {
    return (
      <div className="post-wrap">
        <div className="posts__placeholder">
          <div>
            <p>Page not found!</p>
          </div>
        </div>
      </div>
    );
  }

  console.log("contact:", data);

  return (
    <div className="contact-wrap">
      <div className="contact">
        {data.pages.nodes[0].acfpages.pageVisible === "yes" && (
          <div className="contact__left">
            <ul className="contact-list">
              {data.pages.nodes[0].acfpages.pageVisible === "yes" &&
                data.pages.nodes[0].acfContactInfo.facebook !== "" && (
                  <li>
                    <FaFacebookSquare />
                    <a
                      href={`http://www.${data.pages.nodes[0].acfContactInfo.facebook}`}
                      target="_blank">
                      {data.pages.nodes[0].acfContactInfo.facebook}
                    </a>
                  </li>
                )}

              {data.pages.nodes[0].acfpages.pageVisible === "yes" &&
                data.pages.nodes[0].acfContactInfo.instagram !== "" && (
                  <li>
                    <FaInstagram />
                    <a
                      href={`http://www.${data.pages.nodes[0].acfContactInfo.instagram}`}
                      target="_blank">
                      {data.pages.nodes[0].acfContactInfo.instagram}
                    </a>
                  </li>
                )}

              {data.pages.nodes[0].acfpages.pageVisible === "yes" &&
                data.pages.nodes[0].acfContactInfo.address !== "" && (
                  <li>
                    <FaMapMarkerAlt />
                    Address: {data.pages.nodes[0].acfContactInfo.address}
                  </li>
                )}

              {data.pages.nodes[0].acfpages.pageVisible === "yes" &&
                data.pages.nodes[0].acfContactInfo.phone !== "" && (
                  <li>
                    <FaPhone />
                    Address: {data.pages.nodes[0].acfContactInfo.phone}
                  </li>
                )}

              {data.pages.nodes[0].acfpages.pageVisible === "yes" &&
                data.pages.nodes[0].acfContactInfo.ico !== "" && (
                  <li>
                    <FaAddressCard />
                    Address: {data.pages.nodes[0].acfContactInfo.ico}
                  </li>
                )}

              {data.pages.nodes[0].acfpages.pageVisible === "yes" &&
                data.pages.nodes[0].acfContactInfo.email !== "" && (
                  <li>
                    <FaEnvelope />
                    <a
                      href={`mailto:${data.pages.nodes[0].acfContactInfo.email}`}
                      target="_blank">
                      {data.pages.nodes[0].acfContactInfo.email}
                    </a>
                  </li>
                )}

              {data.pages.nodes[0].acfpages.pageVisible === "yes" &&
                data.pages.nodes[0].acfContactInfo.info1 !== "" && (
                  <li>
                    <FaExclamationTriangle />
                    {data.pages.nodes[0].acfContactInfo.info1}
                  </li>
                )}

              {data.pages.nodes[0].acfpages.pageVisible === "yes" &&
                data.pages.nodes[0].acfContactInfo.info2 !== "" && (
                  <li>
                    <FaExclamationTriangle />
                    {data.pages.nodes[0].acfContactInfo.info2}
                  </li>
                )}
            </ul>
          </div>
        )}

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

export default Contact;

