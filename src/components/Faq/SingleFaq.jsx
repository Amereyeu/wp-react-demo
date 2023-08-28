import React from "react";

function SingleFaq({ faq, index, toggleFAQ, lg }) {
  return (
    <div
      className={"faq " + (faq.open ? "open" : "")}
      key={index}
      onClick={() => toggleFAQ(index)}>
      <div className="faq__question">{lg === "EN" ? faq.question : faq.translation}</div>
      <div className="faq__answer">{faq.answer}</div>
      <div
        className={"faq__arrow " + (faq.open ? "faq__arrow--top" : "")}></div>
    </div>
  );
}

export default SingleFaq;

