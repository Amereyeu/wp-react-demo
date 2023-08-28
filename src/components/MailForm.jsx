import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function MailForm({ lg }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(e) {
    emailjs
      .sendForm(
        "service_dwg0yqa",
        "template_z2f9oax",
        "#contact-form",
        "1Di9IOAL5wlbreKHz"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    toast.success("Message was sent", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

    reset();
  }

  return (
    <>
      <h2 className="contact__title"> {lg === "EN" ? "Contact" : "Kontakt"}</h2>

      <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
        <div className="contact__input__wrap">
          <input
            type="text"
            name="name"
            placeholder={lg === "EN" ? "Name" : "Jméno"}
            className="border1"
            onChange={(e) => setName(e.currentTarget.value)}
            {...register("name", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          <span className="bb"></span>
        </div>
        {errors.name && errors.name.type === "required" && (
          <div className="validation-error">Cannot be empty</div>
        )}
        {errors.name && errors.name.type === "minLength" && (
          <div className="validation-error">At least 3 characters.</div>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <div className="validation-error">No more then 20 characters.</div>
        )}

        <div className="contact__input__wrap">
          <input
            type="email"
            name="email"
            placeholder={lg === "EN" ? "Email" : "E-mail"}
            className="border1"
            onChange={(e) => setEmail(e.currentTarget.value)}
            {...register("email", {
              required: true,
              pattern:
                /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
            })}
          />
          <span className="bb"></span>
        </div>
        {errors.email && errors.email.type === "required" && (
          <div className="validation-error">Cannot be empty</div>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <div className="validation-error">
            Insert email address in correct form
          </div>
        )}

        <div className="contact__input__wrap">
          <textarea
            className="border1"
            name="message"
            placeholder={lg === "EN" ? "Your message" : "Vaše zpráva"}
            onChange={(e) => setText(e.currentTarget.value)}
            {...register("message", { required: true })}></textarea>
          <span className="bb"></span>
        </div>
        {errors.message && errors.message.type === "required" && (
          <div className="validation-error">Cannot be empty</div>
        )}

        <div className="contact__button">
          <button className="contact__button__send" type="submit">
            {lg === "EN" ? "Send" : "Odeslat"}
          </button>
        </div>
      </form>
    </>
  );
}

export default MailForm;





