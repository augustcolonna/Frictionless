import React from "react";
import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, signUp } = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password);
  };
  return <div>{error && <p>{error}</p>}</div>;
}
//put error at bottom of form
export default Signup;
