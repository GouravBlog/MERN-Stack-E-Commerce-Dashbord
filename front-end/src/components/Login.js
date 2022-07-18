import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const collectData = async (e) => {
    e.preventDefault();
    console.warn(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.warn(result);
    if (result.token) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.token));

      navigate("/");
    } else {
      alert("Please enter connect details");
    }
  };
  return (
    <div className="signup">
      <h2>Login</h2>
      <form action="" onSubmit={collectData}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
        />
        <input
          type="passwor"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
