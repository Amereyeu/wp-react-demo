import {
  FaFacebookSquare,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaAddressCard,
  FaExclamationTriangle,
  FaEnvelope,
} from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_PAGE } from "../../gql/queries";

function ContactInfo({ lg }) {
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

  // console.log("contactInfo:", data);

  return (
    <>
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
                  {data.pages.nodes[0].acfContactInfo.address}
                </li>
              )}

            {data.pages.nodes[0].acfpages.pageVisible === "yes" &&
              data.pages.nodes[0].acfContactInfo.phone !== "" && (
                <li>
                  <FaPhone />
                  {data.pages.nodes[0].acfContactInfo.phone}
                </li>
              )}

            {data.pages.nodes[0].acfpages.pageVisible === "yes" &&
              data.pages.nodes[0].acfContactInfo.ico !== "" && (
                <li>
                  <FaAddressCard />
                  {data.pages.nodes[0].acfContactInfo.ico}
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
    </>
  );
}

export default ContactInfo;

