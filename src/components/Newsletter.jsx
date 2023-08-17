import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import emailjs from "emailjs-com";

function Newsletter() {
  const [email, setEmail] = useState("");
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
        "#newsletter-form",
        "1Di9IOAL5wlbreKHz"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    toast.success("You just subscribed to our newsletter", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

    console.log("email:", email);

    reset();
  }

  return (
    <div className="news">
      <h2 className="news__title">STAY IN TOUCH</h2>
      <p className="news__text">
        Inventore quia dolores consequatur aliquam est debitis vitae ducimus.
        Voluptatum maxime tenetur officiis cum est doloribus. Sapiente odio quia
        tempora ipsa non sed.
      </p>
      <form
        className="news__form"
        id="newsletter-form"
        onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          type="email"
          className="news__form__input"
          placeholder="Email"
          onChange={(e) => setEmail(e.currentTarget.value)}
          {...register("email", {
            required: true,
            pattern: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <div className="validation-error">Email cannot be empty</div>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <div className="validation-error">
            Insert email address in correct form
          </div>
        )}
        <button type="submit" className="news__form__button">
          Subscribe
        </button>
      </form>{" "}
      <ToastContainer />
    </div>
  );
}

export default Newsletter;
