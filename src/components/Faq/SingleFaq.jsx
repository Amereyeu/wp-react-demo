import React from "react";

function SingleFaq({ faq, index, toggleFAQ }) {
  return (
    <div
      className={"faq " + (faq.open ? "open" : "")}
      key={index}
      onClick={() => toggleFAQ(index)}>
      <div className="faq__question">{faq.question}</div>
      <div className="faq__answer">{faq.answer}</div>
      <div
        className={"faq__arrow " + (faq.open ? "faq__arrow--top" : "")}></div>
    </div>
  );
}

export default SingleFaq;

