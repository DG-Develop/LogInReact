import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "firebase/auth";
import { useFirebaseApp } from "reactfire";
import firebaseDb from "firebase/app";

import "@styleContainer/LogIn.scss";
import facebookIcon from "@static/facebook.svg";
import twitterIcon from "@static/twitter.svg";
import googleIcon from "@static/google.svg";
import socialMediaAuth from "../../auth/auth";

const LogIn = () => {
  const firebase = useFirebaseApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //https://platziblog-31c7e.firebaseapp.com/__/auth/handler
  //https://platziblog-31c7e.firebaseapp.com/__/auth/handler

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const siginSocialMediaFacebook = async () => {
    const facebookProvider = new firebaseDb.auth.FacebookAuthProvider();
    try {
      const res = await socialMediaAuth(facebookProvider);
      console.log(res);
      history.push('/home')
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

  return (
    <section className="login">
      <div className="login-form">
        <h1>Ingresar</h1>

        <div className="login-icons">
          <div>
            <img src={facebookIcon} alt="" onClick={siginSocialMediaFacebook} />
          </div>
          <div>
            <img src={twitterIcon} alt="" onClick={siginSocialMediaTwitter}/>
          </div>
          <div>
            <img src={googleIcon} alt="" onClick={siginSocialMediaGoogle}/>
          </div>
        </div>

        <span>o usa tu cuenta</span>

        <div className="login-inputs">
          <div>
            <input
              type="email"
              placeholder="Correo"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="button" onClick={submit}>
          Ingresar
        </button>
        <Link to="/signup">
          <div className="login-navigate">Crear una cuenta</div>
        </Link>
      </div>
    </section>
  );
};

export default LogIn;
