import { useState } from "react";
import SingleFaq from "./SingleFaq";
import data from "../../data/data.json";

function Faqs() {
  const [faqs, setfaqs] = useState(data);

  const toggleFAQ = (index) => {
    setfaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <div className="faqs">
      {faqs.map((faq, i) => (
        <SingleFaq faq={faq} index={i} toggleFAQ={toggleFAQ} key={i} />
      ))}
    </div>
  );
}

export default Faqs;

