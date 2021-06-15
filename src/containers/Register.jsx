import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "firebase/auth";
import 'firebase/firestore'
import { useFirebaseApp } from "reactfire";
import firebaseDb from "firebase/app";

import "@styleContainer/Register.scss";
import facebookIcon from "@static/facebook.svg";
import twitterIcon from "@static/twitter.svg";
import googleIcon from "@static/google.svg";
import socialMediaAuth from "../../auth/auth";

const Register = () => {
  const firebase = useFirebaseApp();

  const [form, setForm] = useState({
    email: "",
    password: "",
    names: "",
  });

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      await firebase.firestore().collection("users").doc().set(form);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const siginSocialMediaFacebook = async () => {
    const facebookProvider = new firebaseDb.auth.FacebookAuthProvider();
    history.push("/home");
    try {
      const res = await socialMediaAuth(facebookProvider);
      console.log(res);
     
    } catch (error) {
      console.error(error);
    }
  };

  const siginSocialMediaTwitter = async () => {
    const twitterProvider = new firebaseDb.auth.TwitterAuthProvider();
    
    try {
      const res = await socialMediaAuth(twitterProvider);
      history.push('/home')
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const siginSocialMediaGoogle = async () => {
    const googleProvider = new firebaseDb.auth.GoogleAuthProvider();
    
    try {
      const res = await socialMediaAuth(googleProvider);
      history.push('/home')
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="register">
      <div className="register-form" >
        <h1>Registrar cuenta</h1>

        <div className="register-icons">
          <div>
            <img src={facebookIcon} alt="" onClick={siginSocialMediaFacebook}/>
          </div>
          <div>
            <img src={twitterIcon} alt="" onClick={siginSocialMediaTwitter}/>
          </div>
          <div>
            <img src={googleIcon} alt="" onClick={siginSocialMediaGoogle}/>
          </div>
        </div>

        <span>o usa tu email para registrarte</span>

        <div className="register-inputs">
          <div>
            <input
              type="text"
              name="names"
              placeholder="Nombre"
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo"
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="button" onClick={submit}>Crear cuenta</button>

        <div className="register-navigate">
          <Link to="/">Ingresar</Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
