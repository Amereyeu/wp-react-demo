import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Newsletter() {
  const { register, handleSubmit, reset, errors } = useForm();
  const [email, setEmail] = useState("");

  function onSubmit(e) {
    toast.success("Email sent", {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

    // console.log("email:", email);
    
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

      <form className="news__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          name="email"
          type="email"
          className="news__form__input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          // ref={register({
          //   required: true,
          //   pattern: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
          // })}
        />
        {/* {errors.email && errors.email.type === "required" && (
          <div className="validation-error">Email is required</div>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <div className="validation-error">Enter valid email</div>
        )} */}

        <button type="submit" className="news__form__button">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
