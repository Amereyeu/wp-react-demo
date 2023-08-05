import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function MailForm(props) {
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
        "service_kkkleu23j",
        "template_lllgi4fg5",
        "#contact-form",
        "user_loiW6bMl8l67S4Q5dM5fG"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    toast.success("Zpráva byla odeslána", {
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
      <h2 className="contact__title">Kontakt</h2>

      <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
        <div className="contact__input__wrap">
          <input
            type="text"
            name="name"
            placeholder="Jméno a příjmení"
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
          <div className="validation-error">Toto pole je třeba vyplnit.</div>
        )}
        {errors.name && errors.name.type === "minLength" && (
          <div className="validation-error">Minimální počet znaků je 3.</div>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <div className="validation-error">Maximální počet znaků je 20.</div>
        )}

        <div className="contact__input__wrap">
          <input
            type="email"
            name="email"
            placeholder="Email"
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
          <div className="validation-error">Toto pole je třeba vyplnit.</div>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <div className="validation-error">
            Vložte emailovou adresu ve správném formátu.
          </div>
        )}

        <div className="contact__input__wrap">
          <textarea
            className="border1"
            name="message"
            placeholder="Vaše zpráva"
            onChange={(e) => setText(e.currentTarget.value)}
            {...register("message", { required: true })}
          ></textarea>
          <span className="bb"></span>
        </div>
        {errors.message && errors.message.type === "required" && (
          <div className="validation-error">Toto pole je třeba vyplnit.</div>
        )}

        <div className="contact__button">
          <button className="contact__button__send" type="submit">
            Odeslat
          </button>
        </div>
      </form>
    </>
  );
}

export default MailForm;



